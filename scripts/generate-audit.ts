import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { createLogger } from "@/src/utils/logging";
import type { Audit, AuditCategory } from "@/src/types/audit";

const log = createLogger("generate-audit");

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
        }
    },
    required: [
        "title",
        "author",
        "readTime",
        "category",
        "complianceScore",
        "sections"
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

async function run() {
    let rawData = DEFAULT_RAW_DATA;
    let isSearchMode = false;
    let searchFacts = "";
    const inputArg = process.argv[2];

    if (inputArg) {
        const fullPath = path.resolve(process.cwd(), inputArg);
        if (fs.existsSync(fullPath)) {
            rawData = fs.readFileSync(fullPath, "utf-8");
            log.info(`Loaded raw data from file: ${inputArg}`);
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

    const prompt = `
You are a Lead iGaming Solvency Analyst and Senior Editorial Writer for a high-end financial compliance publication (e.g., Financial Times or Bloomberg Compliance Desk). 

Your task is to analyze the operator data provided below and compile it into a structured, journalistic-style 'Compliance Audit Report' that evaluates the operator's regulatory posture, financial solvency, and licensing liabilities.

### Editorial Tone & Style Rules:
1. **Objective and Analytical**: Avoid marketing copy, buzzwords, or enthusiastic affiliate language ("best casino", "incredible bonuses"). Write with critical distance, focusing on structural safety, wagering math, and legal liabilities.
2. **Financial Terminology**: Use terms like "capital segregation," "solvency ratios," "playthrough rollover liabilities," "anti-money laundering (AML) controls," and "regulatory compliance."
3. **Structured HTML Formatting**: Write the body of the sections using standard HTML elements for typography (use <strong> for key concepts, <em> for emphasis, and absolute local anchor links \`/licenses/...\` or \`/responsible-gambling\` for internal links).

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

        const newAudit: Audit = {
            id: nextId,
            slug,
            title: report.title,
            summary,
            author: report.author,
            authorRole: "Lead iGaming Solvency Analyst",
            readTime: report.readTime,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            category: normalizeCategory(report.category),
            complianceScore: report.complianceScore,
            // AI-generated content hasn't had human editorial review yet —
            // unlike the hand-curated entries already in this file, this
            // shouldn't claim "Editorial Approved" until someone checks it.
            status: "Pending Review",
            affiliateLink: "",
            sections: report.sections,
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
