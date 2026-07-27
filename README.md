# VerifiedSlots — iGaming compliance review platform

Live at **[verifiedslots.com](https://verifiedslots.com)** — an independent compliance-audit
directory for online casino operators across three regulatory jurisdictions: UKGC (UK),
MGA (Malta), and KSA (Netherlands). Reviews focus on licensing compliance, payout mechanics,
and playthrough mathematics rather than marketing copy, with responsible-gambling resources
(helplines, self-exclusion) surfaced site-wide.

Operated by CogCore LLC. Supported by disclosed affiliate relationships — all outbound
operator links carry `rel="nofollow sponsored"`.

## Stack

- **Frontend/SSR:** Next.js 16 (App Router), Tailwind CSS 4, Motion
- **Hosting:** Firebase App Hosting (Cloud Run, europe-west4)
- **Data:** Firestore + build-time static data generation (`scripts/build-data.ts` runs before
  every dev/build/lint)
- **Email:** Resend (newsletter)
- **AI:** Google Gemini (`@google/genai`) for the content pipeline below

## Content pipeline

Reviews and audits are AI-assisted but never published blind — every generator has code-level
backstops (for example, `generate-audit.ts` strips any internal link the model fabricates
rather than letting a dead link reach production):

| Script | What it does |
|---|---|
| `src/scripts/fetch-casino.ts` | Fetches an operator's site (ScrapingAnt, axios fallback) and drafts a structured review |
| `scripts/generate-audit.ts` | Generates compliance audits; `--topic` mode for non-operator journalistic pieces |
| `scripts/generate-review.ts` | Review generation from operator metrics |
| `src/scripts/generate-newsletter.ts` | Drafts the newsletter, sent via Resend |
| `scripts/affiliate-outreach.ts` | Affiliate-partnership outreach automation (dry-run by default) |
| `scripts/seed-firestore.ts` | Seeds casino data into Firestore |

## Run locally

```bash
npm install
npm run dev        # runs build-data.ts, then next dev on :3000
npm run lint       # build-data + tsc --noEmit
npm run build      # production build
```

Environment: set `GEMINI_API_KEY` (content pipeline) and optionally `SCRAPINGANT_API_KEY`,
`RESEND_API_KEY` in `.env.local`. The site itself renders from committed/seeded data without
any keys.

## License

Proprietary — © CogCore LLC. All rights reserved.
