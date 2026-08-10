import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createLogger } from '@/src/utils/logging';
import { REGULATOR_KEYS } from '@/src/data/regulators';

// Load environment variables
dotenv.config();

const log = createLogger('fetch-casino');

const SCRAPINGANT_API_KEY = process.env.SCRAPINGANT_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch HTML content from the target URL.
 * Falls back to direct axios request if ScrapingAnt API key is not configured.
 */
async function fetchHtml(url: string): Promise<string> {
    if (!SCRAPINGANT_API_KEY) {
        log.warn('SCRAPINGANT_API_KEY not found in env. Falling back to direct axios fetch...');
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        return response.data;
    }

    log.info(`Scraping via ScrapingAnt: ${url}`);
    const scrapingAntUrl = `https://api.scrapingant.com/v2/general?url=${encodeURIComponent(url)}&x-api-key=${SCRAPINGANT_API_KEY}&browser=true&stealth=true&proxy_type=residential`;
    try {
        const response = await axios.get(scrapingAntUrl);
        return response.data;
    } catch (error: any) {
        if (error.response?.data) {
            log.error('ScrapingAnt error response details', { data: error.response.data });
        }
        throw error;
    }
}

/**
 * Use Gemini AI to parse raw HTML and extract structured Casino review data matching the schema.
 */
async function parseCasinoHtmlWithGemini(homeHtml: string, termsHtml: string, name: string, domain: string): Promise<any> {
    if (!GEMINI_API_KEY) {
        throw new Error('❌ GEMINI_API_KEY is required to parse scraped HTML into review JSON. Please check your .env file.');
    }

    log.info('Parsing HTML content using Gemini AI...');
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const prompt = `
You are an expert iGaming review parser and compliance auditor.
Given the HTML source of a casino's homepage and (optionally) their terms and conditions page, extract all details and construct a JSON object matching the exact schema below.
If specific data points (like bonus wagering or payment methods) are not visible on these specific pages, infer them from the context or mark them as 'Not explicitly stated on homepage, please verify' instead of leaving them empty.

For the "localizedBonuses" object, map any region-specific bonuses that you find in the HTML (e.g., if scraping a Dutch page, map the offer to "nl"; if a UK page, to "uk"). For other listed regions, generate realistic and typical localized welcome bonus offers and wagering requirements that this brand offers in those countries, using local currencies (EUR for NL/GER/FIN/FRA/BEL/ITA/ESP, GBP for UK, CAD for CAN, BRL for BRA, SEK for SWE, NOK for NOR, DKK for DEN, and USD/EUR for global).

Target Casino Name: "${name}"
Target Domain: "${domain}"

Here is the exact JSON schema structure required:
{
  "id": "${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "name": "${name}",
  "slug": "${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "domain": "${domain}",
  "bonus": "e.g. 100% up to €100",
  "wagering": "e.g. 35x",
  "welcomeBonus": "e.g. 100% up to €100",
  "isKsaLicensed": true or false,
  "isLicensedInNL": true or false,
  "licenseNumber": "License number string or empty if unlicensed",
  "licenseType": ${REGULATOR_KEYS.map((k) => `"${k}"`).join(" | ")} (primary license, e.g. ${REGULATOR_KEYS[1] || REGULATOR_KEYS[0]}),
  "licenseTypes": [${REGULATOR_KEYS.map((k) => `"${k}"`).join(", ")}] (array containing all license jurisdictions actually held by this operator, e.g. ["${REGULATOR_KEYS[0]}", "${REGULATOR_KEYS[1] || REGULATOR_KEYS[0]}"]),
  "restrictedCountries": ["NL"] or [] (if KSA, restrictedCountries must NOT contain "NL". If mga/ukgc, it must contain "NL"),
  "rating": number (e.g. 8.5),
  "author": "iGaming Compliance Specialist",
  "datePublished": "2026-06-30",
  "lastModified": "2026-06-30",
  "lastUpdated": "2026-06-30",
  "logoColor": "from-emerald-800 to-teal-900" (generate standard dark gradient Tailwind class),
  "gameLibraryCount": "e.g. 2,000+ Titles",
  "summaryText": "Brief 2-3 sentence introductory summary",
  "editorialVerdict": "A 100-word deep-dive analysis explaining why a player should or should not trust this operator based on their payout speed and compliance history.",
  "warningText": "Short regulatory/compliance warning banner text",
  "affiliateUrl": "https://track.affiliate-link.com/casino-bonus",
  "pros": ["Pro 1", "Pro 2", "Pro 3"],
  "cons": ["Con 1"],
  "securityTitle": "Security section title",
  "securitySummary": "Detailed safety description",
  "securityWarning": "A warning or positive highlight about security",
  "securityPoints": [
    {
      "title": "Point Title",
      "description": "Point Description",
      "iconName": "shield" | "zap" | "alert",
      "status": "success" | "warning" | "danger"
    }
  ],
  "bonusMatchOffer": "e.g. 100% up to €100",
  "bonusWagering": "e.g. 35x",
  "bonusMinDeposit": "e.g. €20",
  "bonusValidity": "e.g. 30 Days",
  "bonusMaxBet": "e.g. €5",
  "bonusTermsVerdict": "Short summary verdict on the bonus terms fairness",
  "bonusTermsDetails": [
    {
      "title": "Term Detail Title",
      "description": "Term Detail Description"
    }
  ],
  "gameContributions": [
  {
    "category": "Slots",
    "contribution": "100%"
  },
  {
    "category": "Live Casino",
    "contribution": "10%"
  },
  {
    "category": "Table Games",
    "contribution": "5%"
  }
],
  "gameSummary": "Summary of game categories and selection",
  "gameCategories": [
    {
      "title": "Video Slots",
      "description": "Description of slots selection",
      "notable": "Notable slot games list",
      "iconName": "slots" | "dice" | "live"
    }
  ],
  "paymentSummary": "Payment methods overview",
  "paymentMethods": [
    {
      "name": "iDEAL" | "Visa" | "Mastercard" | "Trustly",
      "type": "e.g. Bank Transfer" | "Credit Card" | "E-Wallet",
      "depositTime": "e.g. Instant",
      "withdrawalTime": "e.g. 1-3 Business Days",
      "fees": "e.g. None"
    }
  ],
  "rgSummary": "Responsible gambling resources summary",
  "rgTools": [
    {
      "title": "Session Limits",
      "description": "Description of the session limit tool",
      "status": "success" | "warning" | "error" | "supported",
      "iconName": "clock" | "euro" | "ban" | "shield-ban"
    }
  ],
  "comparisonTitle": "Comparison section title",
  "comparisonRows": [
    {
      "feature": "License & Safety",
      "thisCasino": "Regulated - High Safety",
      "regulatedStandard": "KSA Standard Requirement",
      "status": "success" | "warning" | "danger" | "neutral"
    }
  ],
  "faqs": [
    {
      "question": "FAQ Question 1?",
      "answer": "FAQ Answer 1"
    }
  ],
  "license": "License number string or empty if unlicensed",
  "localizedBonuses": {
    "global": { "offer": "100% up to €500", "wagering": "35x" },
    "nl": { "offer": "Bet €10, Get €50", "wagering": "1x" },
    "uk": { "offer": "100% up to £100 + 50 Free Spins", "wagering": "40x" },
    "swe": { "offer": "100% up to 3000 SEK", "wagering": "30x" },
    "nor": { "offer": "100% up to 5000 NOK", "wagering": "25x" },
    "fin": { "offer": "100% up to 200€", "wagering": "35x" },
    "den": { "offer": "100% up to 1000 DKK", "wagering": "10x" },
    "ger": { "offer": "100% up to 1000 EUR", "wagering": "30x" },
    "fra": { "offer": "100% up to 100€", "wagering": "35x" },
    "bel": { "offer": "100% up to 500€", "wagering": "40x" },
    "ita": { "offer": "100% up to 1000€", "wagering": "35x" },
    "esp": { "offer": "100% up to 1000€", "wagering": "35x" },
    "bra": { "offer": "100% up to 1000 R$", "wagering": "35x" },
    "can": { "offer": "100% up to 1000 CAD", "wagering": "35x" },
  },
}

Homepage HTML Content:
${homeHtml.substring(0, 150000)}

Terms and Conditions HTML Content:
${termsHtml ? termsHtml.substring(0, 150000) : "No terms and conditions page available."}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
    });

    const text = response.text;
    if (!text) {
        throw new Error('❌ Gemini returned empty content');
    }

    return JSON.parse(text);
}

function mergeData(existing: any, newData: any) {
    // This keeps the old data and only updates fields that have new info
    return { ...existing, ...newData };
}


/**
 * Main execution function
 */
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        log.error('Usage: npx tsx src/scripts/fetch-casino.ts <url> <name> <domain>');
        process.exit(1);
    }

    const [url, name, domain] = args;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // 1. DEFINE PATH FIRST
    const outputDir = path.join(process.cwd(), 'src/content/reviews');
    const filePath = path.join(outputDir, `${slug}.json`);

    // 2. FETCH DATA FIRST (Since 'data' needs to exist for the merge)
    let data;
    try {
        log.info(`Fetching homepage: ${url}`);
        const htmlHome = await fetchHtml(url);

        await sleep(2000); // Wait 2 seconds before the next request to free up the concurrency slot

        const termsUrl = url.replace(/\/$/, "") + "/terms-and-conditions/";
        log.info(`Fetching terms page: ${termsUrl}`);
        let htmlTerms = "";
        try {
            htmlTerms = await fetchHtml(termsUrl);
        } catch (termsError: any) {
            log.warn('Failed to fetch terms page. Proceeding with homepage only.', { error: termsError });
        }

        data = await parseCasinoHtmlWithGemini(htmlHome, htmlTerms, name, domain);

        // Secondary SEARCH LOGIC
        if (!data.isKsaLicensed || !data.licenseNumber || !data.licenseType) {
            try {
                log.info('Waiting 2 seconds before secondary search to reduce rate-limiting...');
                await sleep(2000);
                const secondarySearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${name} ${domain} license`)}`;
                const secondaryHtml = await fetchHtml(secondarySearchUrl);
                const secondaryData = await parseCasinoHtmlWithGemini(secondaryHtml, "", name, domain);
                data = { ...data, ...secondaryData };
            } catch (searchError: any) {
                log.warn('Secondary license search failed (likely blocked by Google). Proceeding with primary scraped data.', { error: searchError });
            }
        }
    } catch (error: any) {
        log.warn('Primary scraping failed. Falling back to Google Search Grounding...', { error });
        try {
            if (!GEMINI_API_KEY) {
                throw new Error('GEMINI_API_KEY is required for fallback research. Please check your .env file.');
            }
            const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
            log.info('Querying Google Search Grounding to research operator data...');
            const searchPrompt = `Please search Google and research compliance metrics, licensing status (MGA, KSA, Curaçao), welcome bonuses, game library sizes, restricted countries, and safety information for the operator: "${name}" (${domain}).`;
            const searchResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: searchPrompt,
                config: {
                    tools: [{ googleSearch: {} }]
                }
            });
            const researchFacts = searchResponse.text || "";
            
            log.info('Parsing research facts into structured review JSON...');
            data = await parseCasinoHtmlWithGemini(researchFacts, "", name, domain);
        } catch (fallbackError: any) {
            log.error('Fallback research also failed', { error: fallbackError });
            process.exit(1);
        }
    }

    // 3. NOW READ EXISTING DATA
    let existingData = {};
    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            existingData = JSON.parse(fileContent);
        }
    } catch (e: any) {
        log.error("Error reading existing data", { error: e });
    }

    // 4. MERGE AND SAVE
    const finalData = mergeData(existingData, data);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), 'utf-8');
    log.info(`Successfully saved data to: ${filePath}`);
}

main();