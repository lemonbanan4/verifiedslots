/**
 * Affiliate/partner outreach automation.
 *
 * Reads prospective-partner contacts from a JSON file (default:
 * affiliate-contacts.json at the repo root), renders a personalized
 * outreach email per contact using the same pitch as /partnership, and
 * sends it via Resend.
 *
 * SAFETY: this script is dry-run by default. It only sends real email when
 * BOTH of the following are true:
 *   1. You pass --send on the command line
 *   2. RESEND_API_KEY is set in your environment
 * Otherwise it prints exactly what it would send and makes no network call.
 *
 * Usage:
 *   npx tsx scripts/affiliate-outreach.ts                # dry run, default contact list
 *   npx tsx scripts/affiliate-outreach.ts contacts.json   # dry run, custom contact list
 *   npx tsx scripts/affiliate-outreach.ts --send          # actually send (needs RESEND_API_KEY)
 *
 * Setup for real sending:
 *   1. Create a free account at https://resend.com
 *   2. Verify a sending domain (or use their onboarding@resend.dev for testing)
 *   3. Create an API key, add it to .env.local as RESEND_API_KEY=re_xxx
 *   4. Set FROM_EMAIL in .env.local to an address on your verified domain
 */

import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { createLogger } from "@/src/utils/logging";

const log = createLogger("affiliate-outreach");

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

interface Contact {
  company: string;
  contactName: string;
  email: string;
  context: string;
  contactedAt: string | null;
}

const FROM_EMAIL = process.env.FROM_EMAIL || "partnerships@verifiedslots.com";
const REPLY_TO = process.env.REPLY_TO_EMAIL || "partnerships@verifiedslots.com";
const SEND_DELAY_MS = 600; // stay well under typical free-tier rate limits

function renderEmail(contact: Contact): { subject: string; html: string; text: string } {
  const subject = `Independent compliance audit for ${contact.company}`;

  const text = `Hi ${contact.contactName},

Bonuses are commoditized — nearly any operator can match a deposit offer. Trust is not, and it compounds directly into player lifetime value.

VerifiedSlots partners with operators who are ready to be independently audited, not just advertised. For affiliate managers and compliance officers, that means qualified traffic, fewer disputes, and a public compliance record your regulators can actually check.

Why operators partner with us:
- Higher Player LTV — verified operators see longer retention curves than unaudited competitors.
- Fewer Disputes & Chargebacks — transparent, audited wagering terms mean fewer misled players.
- Qualified, High-Intent Traffic — our audited-only directory sends players who've already read the compliance report.
- Regulatory Goodwill — public alignment with an independent auditor strengthens your standing with regulators like the KSA, MGA, and UKGC.

${contact.context ? `Noted for ${contact.company}: ${contact.context}\n\n` : ""}Every audit is built from three pillars: RNG & game math verification, licensing/jurisdiction cross-checks against the public KSA/MGA/UKGC registries, and real-money solvency & payout testing.

If you're open to a scoping conversation, reply to this email or visit https://verifiedslots.com/partnership.

— The VerifiedSlots Compliance Desk`;

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px;">
  <p>Hi ${contact.contactName},</p>
  <p>Bonuses are commoditized — nearly any operator can match a deposit offer. Trust is not, and it compounds directly into player lifetime value.</p>
  <p>VerifiedSlots partners with operators who are ready to be independently audited, not just advertised. For affiliate managers and compliance officers, that means qualified traffic, fewer disputes, and a public compliance record your regulators can actually check.</p>
  <p><strong>Why operators partner with us:</strong></p>
  <ul>
    <li><strong>Higher Player LTV</strong> — verified operators see longer retention curves than unaudited competitors.</li>
    <li><strong>Fewer Disputes &amp; Chargebacks</strong> — transparent, audited wagering terms mean fewer misled players.</li>
    <li><strong>Qualified, High-Intent Traffic</strong> — our audited-only directory sends players who've already read the compliance report.</li>
    <li><strong>Regulatory Goodwill</strong> — public alignment with an independent auditor strengthens your standing with regulators like the KSA, MGA, and UKGC.</li>
  </ul>
  ${contact.context ? `<p><em>Noted for ${contact.company}: ${contact.context}</em></p>` : ""}
  <p>Every audit is built from three pillars: RNG &amp; game math verification, licensing/jurisdiction cross-checks against the public KSA/MGA/UKGC registries, and real-money solvency &amp; payout testing.</p>
  <p>If you're open to a scoping conversation, reply to this email or visit <a href="https://verifiedslots.com/partnership">verifiedslots.com/partnership</a>.</p>
  <p>— The VerifiedSlots Compliance Desk</p>
</body>
</html>`;

  return { subject, html, text };
}

async function run() {
  const args = process.argv.slice(2);
  const shouldSend = args.includes("--send");
  const inputArg = args.find((a) => !a.startsWith("--"));

  const contactsPath = path.resolve(process.cwd(), inputArg || "affiliate-contacts.json");
  if (!fs.existsSync(contactsPath)) {
    log.error(`Contact list not found at: ${contactsPath}`);
    process.exit(1);
  }

  const contacts: Contact[] = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const pending = contacts.filter((c) => !c.contactedAt);

  if (pending.length === 0) {
    log.info("No pending contacts to reach out to (all already have a contactedAt date, or the list is empty).");
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const willActuallySend = shouldSend && !!apiKey;

  if (shouldSend && !apiKey) {
    log.error("--send was passed but RESEND_API_KEY is not set in your environment. Falling back to dry run.");
  }

  log.info(willActuallySend ? "LIVE MODE: emails will actually be sent." : "DRY RUN: no emails will be sent.", {
    pendingCount: pending.length,
  });

  let resendClient: any = null;
  if (willActuallySend) {
    const { Resend } = await import("resend");
    resendClient = new Resend(apiKey);
  }

  for (const contact of pending) {
    const { subject, html, text } = renderEmail(contact);

    if (!willActuallySend) {
      log.info(`[DRY RUN] Would send to ${contact.email}`, { company: contact.company, subject });
      console.log("--- Email body preview ---");
      console.log(text);
      console.log("--------------------------");
      continue;
    }

    try {
      await resendClient.emails.send({
        from: FROM_EMAIL,
        to: contact.email,
        replyTo: REPLY_TO,
        subject,
        html,
        text,
      });
      contact.contactedAt = new Date().toISOString();
      log.info(`Sent outreach email to ${contact.email}`, { company: contact.company });
    } catch (error) {
      log.error(`Failed to send to ${contact.email}`, { error });
    }

    await new Promise((resolve) => setTimeout(resolve, SEND_DELAY_MS));
  }

  if (willActuallySend) {
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
    log.info(`Updated contactedAt timestamps in: ${contactsPath}`);
  }
}

run();
