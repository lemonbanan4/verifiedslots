import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { createLogger } from "@/src/utils/logging";
import type { Audit, AuditCategory, AuditStatus } from "@/src/types/audit";

const log = createLogger("generate-audit");

// These are the only internal routes that actually exist on the site.
// The model is instructed to stick to them, but LLM prompt compliance isn't
// guaranteed — this is a code-level backstop that strips any <a> tag with a
// missing href or a fabricated internal path (unwrapping it to plain text)
// rather than letting a dead link reach production. External links (https://...)
// are left untouched.
const VALID_INTERNAL_LINKS = new Set(["/licenses/ksa", "/licenses/mga", "/licenses/ukgc", "/responsible-gambling"]);

function sanitizeInternalLinks(html: string): string {
    return html.replace(/<a\b([^>]*)>(.*?)<\/a>/gis, (match, attrs, innerText) => {
        const hrefMatch = attrs.match(/href\s*=\s*"([^"]*)"/i);
        if (!hrefMatch) {
            log.warn("Stripped an <a> tag with no href attribute from AI-generated content", { snippet: match.slice(0, 80) });
            return innerText;
        }
        const href = hrefMatch[1];
        if (href.startsWith("/") && !VALID_INTERNAL_LINKS.has(href)) {
            log.warn(`Stripped a fabricated internal link (${href}) from AI-generated content`);
            return innerText;
        }
        return match;
    });
}

const VALID_CATEGORIES: AuditCategory[] = [
    "Math & RNG Auditing",
    "Strategy & Solvency",
    "Regulatory Compliance & Risk Management",
    "Regulatory Oversight & Wagering Liability",
];

// The model is instructed to return one of VALID_CATEGORIES verbatim, but
// LLM output isn't guaranteed — fall back to keyword matching rather than
// let an invalid category value silently break the UI's category-based
// icon/color lookups (which only have entries for these four strings).
function normalizeCategory(raw: string): AuditCategory {
    if ((VALID_CATEGORIES as string[]).includes(raw)) {
        return raw as AuditCategory;
    }
    const lower = raw.toLowerCase();
    if (lower.includes("rng") || lower.includes("math")) return "Math & RNG Auditing";
    if (lower.includes("strategy") || lower.includes("bankroll") || lower.includes("variance")) return "Strategy & Solvency";
    if (lower.includes("wagering") || lower.includes("payout") || lower.includes("liability")) return "Regulatory Oversight & Wagering Liability";
    return "Regulatory Compliance & Risk Management";
}

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!apiKey) {
    log.error("GEMINI_API_KEY is not defined in your environment variables. Please add GEMINI_API_KEY to your .env.local file.");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function generateWithRetry(contents: string, config: any, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents,
                config,
            });
        } catch (error: any) {
            attempt++;
            const status = error?.status || error?.statusCode;
            const message = error?.message || "";
            if (status === 503 || status === 429 || message.includes("503") || message.includes("429") || message.includes("high demand") || message.includes("UNAVAILABLE")) {
                const delay = Math.pow(2, attempt) * 1000;
                log.warn(`Model busy or unavailable (503/429). Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
    throw new Error(`Failed after ${maxRetries} retries due to model unavailability.`);
}

export interface ComplianceAuditReport {
    title: string;
    author: string;
    readTime: string;
    category: string;
    complianceScore: number;
    sections: Array<{
        heading: string;
        body: string;
    }>;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
}

const SCHEMA = {
    type: "OBJECT",
    properties: {
        title: {
            type: "STRING",
            description: "A compelling, objective headline in the style of a financial compliance audit (e.g., 'Regulatory Solvency Audit: Jack's Casino Compliance Assessment')."
        },
        author: {
            type: "STRING",
            description: "Name of the lead compliance analyst or editor."
        },
        readTime: {
            type: "STRING",
            description: "Estimated time to read (e.g., '5 min read')."
        },
        category: {
            type: "STRING",
            description: "Must be exactly one of these four strings (no others are valid): \"Math & RNG Auditing\", \"Strategy & Solvency\", \"Regulatory Compliance & Risk Management\", \"Regulatory Oversight & Wagering Liability\"."
        },
        complianceScore: {
            type: "INTEGER",
            description: "An index score from 1 to 100 representing the operator's regulatory solvency and compliance rating."
        },
        sections: {
            type: "ARRAY",
            description: "The core auditing chapters of the report.",
            items: {
                type: "OBJECT",
                properties: {
                    heading: {
                        type: "STRING",
                        "description": "Objective, formal section title (e.g., '1. Capital Segregation and Player Solvency')."
                    },
                    body: {
                        "type": "STRING",
                        "description": "The detailed journalistic analysis, written with high-end financial compliance publication prose. Supports raw HTML tags like <strong>, <em>, and <a> for links."
                    }
                },
                required: ["heading", "body"]
            }
        },
        metaTitle: {
            type: "STRING",
            description: "SEO meta title, hard limit 60 characters."
        },
        metaDescription: {
            type: "STRING",
            description: "SEO meta description, hard limit 160 characters."
        },
        keywords: {
            type: "ARRAY",
            description: "3-6 target SEO keywords/phrases for this article.",
            items: { type: "STRING" }
        }
    },
    required: [
        "title",
        "author",
        "readTime",
        "category",
        "complianceScore",
        "sections",
        "metaTitle",
        "metaDescription",
        "keywords"
    ]
};

// Default raw data to use if no file path is provided
const DEFAULT_RAW_DATA = `
Casino Name: SlotVibe Casino
License Status: Curaçao eGaming License #1668/JAZ (Sub-licensed)
Asset Segregation: Player funds are co-mingled in the operating account. No escrow account.
Withdrawal Limits: €2,000 per week. Processing times take 48-72 hours.
Wagering / Playthrough: 45x wagering on bonus + deposit (effective 90x playthrough).
Responsible Gaming Controls: No self-exclusion linkage (outside NL CRUKS). Local tools are limited to manual email requests.
`;

const LINK_RULES = `Every <a> tag MUST have an href attribute, and that href MUST be exactly one of these four paths — no others exist on this site, and inventing any other path (e.g. a made-up "/licenses/some-topic" or "/licenses/operator-name") produces a broken link:
   - \`/licenses/ksa\`
   - \`/licenses/mga\`
   - \`/licenses/ukgc\`
   - \`/responsible-gambling\`
   If none of these four are a natural fit for a given sentence, do not include a link at all — plain text is always safer than a fabricated URL.`;

async function run() {
    const args = process.argv.slice(2);
    const isTopicMode = args.includes("--topic");
    const imageFlagIndex = args.indexOf("--image");
    const rawImageArg = imageFlagIndex !== -1 ? args[imageFlagIndex + 1] : undefined;
    // Normalize to a public/-relative URL path regardless of whether the
    // caller passed "public/foo.png", "./public/foo.png", or "/foo.png".
    const coverImage = rawImageArg
        ? "/" + rawImageArg.replace(/^\.?\/?/, "").replace(/^public\//, "")
        : undefined;
    if (rawImageArg) {
        const imageFullPath = path.resolve(process.cwd(), "public", coverImage!.slice(1));
        if (!fs.existsSync(imageFullPath)) {
            log.error(`--image path does not exist in public/: ${coverImage} (resolved to ${imageFullPath})`);
            process.exit(1);
        }
    }
    const inputArg = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--image");

    let rawData = DEFAULT_RAW_DATA;
    let isSearchMode = false;
    let searchFacts = "";

    if (inputArg) {
        const fullPath = path.resolve(process.cwd(), inputArg);
        if (fs.existsSync(fullPath)) {
            rawData = fs.readFileSync(fullPath, "utf-8");
            log.info(`Loaded raw data from file: ${inputArg}`);
        } else if (isTopicMode) {
            log.error(`--topic mode requires an existing input file; "${inputArg}" was not found.`);
            process.exit(1);
        } else {
            isSearchMode = true;
            log.info(`Input "${inputArg}" is not a local file. Enabling Google Search Grounding to research operator details...`);
            const searchPrompt = `Please search Google and research up-to-date compliance metrics, licensing jurisdictions (MGA, KSA, UKGC, Curacao, etc.), capital solvency/segregation policies, playthrough/wagering requirements, withdrawal processing speeds, and responsible gaming links/CRUKS integrations for the iGaming operator: "${inputArg}". Compile a comprehensive list of factual statements.`;

            try {
                log.info("Querying Google Search via Gemini Grounding...");
                const searchResponse = await generateWithRetry(searchPrompt, {
                    tools: [{ googleSearch: {} }]
                });
                searchFacts = searchResponse.text || "";
                log.info("Factual details gathered from Google Search.");
            } catch (err) {
                log.error("Failed to query Google Search Grounding", { error: err });
                process.exit(1);
            }
        }
    } else {
        log.info("No input file provided. Using default demo data (SlotVibe Casino).");
    }

    // Operator audits analyze one named brand's compliance posture. Topic
    // pieces (--topic) are industry-wide op-eds/newsletters not tied to any
    // single operator — same editorial tone and link rules, but the section
    // structure is thematic rather than "Licensing & Legal Jurisdictions for
    // Operator X", and complianceScore reflects overall industry maturity on
    // the topic rather than one operator's specific rating.
    const prompt = isTopicMode ? `
You are a Lead iGaming Compliance Analyst and Senior Editorial Writer for a high-end financial compliance publication (e.g., Financial Times or Bloomberg Compliance Desk).

Your task is to expand the raw notes/draft below into a structured, journalistic-style industry op-ed or newsletter piece. This is NOT about one specific operator — it's an industry-wide analytical piece on the topic given. Do not invent a specific named operator to audit; keep the analysis at the industry/regulatory level, citing general patterns rather than fabricated specific companies.

### Editorial Tone & Style Rules:
1. **Objective and Analytical**: Avoid marketing copy or hype. Write with critical distance and journalistic authority, in the voice of an independent compliance desk — not promotional copy for VerifiedSlots itself.
2. **Financial/Regulatory Terminology**: Use precise terms like "capital segregation," "solvency ratios," "playthrough rollover liabilities," "anti-money laundering (AML) controls," and "regulatory compliance" where relevant to the topic.
3. **Structured HTML Formatting**: Use <strong> for key concepts and <em> for emphasis. ${LINK_RULES}

### Output JSON Constraints:
- **complianceScore**: Rate the industry's current overall maturity/rigor on this specific topic out of 100 (this is a thematic maturity score, not one operator's rating).
- **sections**: Structure logically around the actual argument/structure of the source notes provided (e.g. mirror its own headings/points as section headings), typically 4-6 sections.

---
### SOURCE NOTES / DRAFT FOR THIS PIECE:
${rawData}
` : `
You are a Lead iGaming Solvency Analyst and Senior Editorial Writer for a high-end financial compliance publication (e.g., Financial Times or Bloomberg Compliance Desk).

Your task is to analyze the operator data provided below and compile it into a structured, journalistic-style 'Compliance Audit Report' that evaluates the operator's regulatory posture, financial solvency, and licensing liabilities.

### Editorial Tone & Style Rules:
1. **Objective and Analytical**: Avoid marketing copy, buzzwords, or enthusiastic affiliate language ("best casino", "incredible bonuses"). Write with critical distance, focusing on structural safety, wagering math, and legal liabilities.
2. **Financial Terminology**: Use terms like "capital segregation," "solvency ratios," "playthrough rollover liabilities," "anti-money laundering (AML) controls," and "regulatory compliance."
3. **Structured HTML Formatting**: Write the body of the sections using standard HTML elements for typography (use <strong> for key concepts, <em> for emphasis). ${LINK_RULES}

### Output JSON Constraints:
Assemble the output strictly adhering to the requested JSON schema.
- **complianceScore**: Rate the operator out of 100 based on licensing strength (KSA/MGA = high score, offshore Curaçao = lower score), playthrough fairness (30x-35x = standard, >40x = high-risk), and payment processing safety.
- **sections**: Group the report into logical chapters, such as:
  - 1. Licensing & Legal Jurisdictions
  - 2. Solvency Risks & Asset Segregation
  - 3. Playthrough Mathematics & Wagering Friction

---
### OPERATOR DATA FOR AUDIT:
${isSearchMode ? searchFacts : rawData}
`;

    log.info("Querying Gemini API for structured audit report...");

    try {
        const response = await generateWithRetry(prompt, {
            responseMimeType: "application/json",
            responseSchema: SCHEMA as any,
        });

        const text = response.text;
        if (!text) {
            throw new Error("Received empty response from Gemini API.");
        }

        const report: ComplianceAuditReport = JSON.parse(text);
        log.info("Audit successfully generated by AI!", { title: report.title, complianceScore: report.complianceScore });

        // 1. Save raw generated JSON (debug artifact, not read by the app)
        const rawOutPath = path.resolve(process.cwd(), "src/content/audit-generated.json");
        fs.writeFileSync(rawOutPath, JSON.stringify(report, null, 2), "utf-8");
        log.info(`Saved raw schema output to: ${rawOutPath}`);

        // 2. Map & append to audits.json — the actual data source behind
        // /audits, /audits/insights/[slug], and the homepage insights widget.
        const auditsPath = path.resolve(process.cwd(), "src/data/audits.json");
        let audits: Audit[] = [];
        if (fs.existsSync(auditsPath)) {
            audits = JSON.parse(fs.readFileSync(auditsPath, "utf-8"));
        }

        const slug = report.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        // Generate brief summary from the first section
        const summary = report.sections[0]?.body
            .replace(/<[^>]*>/g, "") // Strip HTML tags
            .slice(0, 160) + "...";

        const nextId = audits.length > 0 ? Math.max(...audits.map((a) => a.id)) + 1 : 1;

        // Check if input is a JSON file and extract partner details
        let affiliateLink = "";
        let isPartner = false;
        let auditStatus: AuditStatus = "Pending Review";
        if (inputArg && inputArg.endsWith(".json")) {
            try {
                const parsedJson = JSON.parse(rawData);
                affiliateLink = parsedJson.affiliateUrl || parsedJson.affiliateLink || "";
                isPartner = parsedJson.isPartner || false;
                if (isPartner) {
                    auditStatus = "Editorial Approved";
                }
            } catch (err) {
                // Ignore parsing errors
            }
        }

        const newAudit: Audit = {
            id: nextId,
            slug,
            title: report.title,
            summary,
            author: report.author,
            authorRole: isTopicMode ? "Lead iGaming Compliance Analyst" : "Lead iGaming Solvency Analyst",
            readTime: report.readTime,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            category: normalizeCategory(report.category),
            complianceScore: report.complianceScore,
            status: auditStatus,
            affiliateLink,
            isPartner,
            sections: report.sections.map((s) => ({ ...s, body: sanitizeInternalLinks(s.body) })),
            metaTitle: report.metaTitle?.slice(0, 60),
            metaDescription: report.metaDescription?.slice(0, 160),
            keywords: report.keywords,
            ...(coverImage ? { coverImage } : {}),
        };

        audits.unshift(newAudit); // Add to the beginning of the list
        fs.writeFileSync(auditsPath, JSON.stringify(audits, null, 2), "utf-8");
        log.info(`Successfully mapped and prepended audit to: ${auditsPath}`);

    } catch (error) {
        log.error("Failed to generate or save audit", { error });
        process.exit(1);
    }
}

run();
