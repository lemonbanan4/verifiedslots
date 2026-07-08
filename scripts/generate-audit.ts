import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!apiKey) {
    console.error("❌ ERROR: GEMINI_API_KEY is not defined in your environment variables.");
    console.error("Please add GEMINI_API_KEY to your .env.local file.");
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
                console.warn(`⚠️ Model busy or unavailable (503/429). Retrying in ${delay}ms (Attempt ${attempt}/${maxRetries})...`);
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
            description: "The auditing focus category (e.g., 'Licensing & Account Segregation', 'Playthrough Mathematics')."
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
            console.log(`📖 Loaded raw data from file: ${inputArg}`);
        } else {
            isSearchMode = true;
            console.log(`🔍 Input "${inputArg}" is not a local file. Enabling Google Search Grounding to research operator details...`);
            const searchPrompt = `Please search Google and research up-to-date compliance metrics, licensing jurisdictions (MGA, KSA, UKGC, Curacao, etc.), capital solvency/segregation policies, playthrough/wagering requirements, withdrawal processing speeds, and responsible gaming links/CRUKS integrations for the iGaming operator: "${inputArg}". Compile a comprehensive list of factual statements.`;

            try {
                console.log("📡 Querying Google Search via Gemini Grounding...");
                const searchResponse = await generateWithRetry(searchPrompt, {
                    tools: [{ googleSearch: {} }]
                });
                searchFacts = searchResponse.text || "";
                console.log("✅ Factual details gathered from Google Search.");
            } catch (err) {
                console.error("❌ Failed to query Google Search Grounding:", err);
                process.exit(1);
            }
        }
    } else {
        console.log("ℹ️ No input file provided. Using default demo data (SlotVibe Casino).");
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

    console.log("🤖 Querying Gemini API for structured audit report...");

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
        console.log("✅ Audit successfully generated by AI!");
        console.log(`📋 Title: "${report.title}"`);
        console.log(`📊 Score: ${report.complianceScore}/100`);

        // 1. Save raw generated JSON
        const rawOutPath = path.resolve(process.cwd(), "src/content/audit-generated.json");
        fs.writeFileSync(rawOutPath, JSON.stringify(report, null, 2), "utf-8");
        console.log(`💾 Saved raw schema output to: ${rawOutPath}`);

        // 2. Map & Append to insights.json
        const insightsPath = path.resolve(process.cwd(), "src/content/insights.json");
        let insights: any[] = [];
        if (fs.existsSync(insightsPath)) {
            insights = JSON.parse(fs.readFileSync(insightsPath, "utf-8"));
        }

        const slug = report.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        // Generate brief summary from the first section
        const summary = report.sections[0]?.body
            .replace(/<[^>]*>/g, "") // Strip HTML tags
            .slice(0, 160) + "...";

        // Map headings & bodies to the type-based schema of insights.json
        const mappedSections: any[] = [];
        report.sections.forEach((sec) => {
            // Add Heading
            mappedSections.push({
                type: "h4",
                icon: "Shield",
                iconColor: "text-emerald-400",
                content: sec.heading
            });
            // Add Body paragraphs
            mappedSections.push({
                type: "p",
                content: sec.body
            });
        });

        const newInsight = {
            slug,
            title: report.title,
            category: report.category,
            readTime: report.readTime,
            author: report.author,
            authorRole: "iGaming Solvency Analyst",
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            summary,
            icon: "Shield",
            iconColor: report.complianceScore >= 75 ? "text-emerald-400" : "text-amber-500",
            sections: mappedSections
        };

        insights.unshift(newInsight); // Add to the beginning of the list
        fs.writeFileSync(insightsPath, JSON.stringify(insights, null, 2), "utf-8");
        console.log(`💾 Successfully mapped and prepended audit to: ${insightsPath}`);

    } catch (error) {
        console.error("❌ Failed to generate or save audit:", error);
        process.exit(1);
    }
}

run();
