import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateNewsletter() {
    const reviewsDir = path.join(process.cwd(), 'src/content/reviews');
    const files = fs.readdirSync(reviewsDir);

    // Read all JSON files and combine their summaries
    const casinoData = files.map(file => {
        return JSON.parse(fs.readFileSync(path.join(reviewsDir, file), 'utf-8'));
    });

    const prompt = `
        You are a Lead iGaming Compliance Auditor.
        Draft a monthly 'Compliance Audit Report' newsletter.
        
        Data source:
        ${JSON.stringify(casinoData)}
        
        Tone: Clinical, objective, and expert-led. Avoid promotional buzzwords.
        
        Content Instructions:
        1. Select the casino with the lowest 'Effective Wagering Multiplier'. Explain the math behind why this offer is the most transparent this month.
        2. Regulatory Insight: Include a short section on current compliance trends in the target region of the selected casino (e.g. Netherlands / KSA, Malta / MGA, UK / UKGC).
        3. Links: Every casino mention must link to its corresponding internal audit/review page on our site (format: [Name](file:///Users/lemon/antigravity/iGaming-Affiliate-Review/src/app/reviews/[slug]/page.tsx) or /reviews/[slug]), NOT the casino directly.
        4. Disclaimer: Append this exact footer: 'This audit is for informational purposes. Terms and conditions are subject to change. Please verify the current wagering requirements directly on the operator's site before registering.'
        5. Output the response in professional email Markdown format.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    console.log(response.text);
}

generateNewsletter();