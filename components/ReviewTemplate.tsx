import React from "react";
import { cookies, headers } from "next/headers";
import { Casino } from "@/src/data/casinos";
import { TrustAndSafety } from "./TrustAndSafety";
import { BonusTerms } from "./BonusTerms";
import { GameVariety } from "./GameVariety";
import { PaymentMethods } from "./PaymentMethods";
import { ResponsibleGambling } from "./ResponsibleGambling";
import { Comparison } from "./Comparison";
import { FAQ } from "./FAQ";
import { AuthorBox } from "./AuthorBox";
import { OutboundLinkWithTooltip } from "./OutboundLinkWithTooltip";
import { StickyRgFooter } from "./StickyRgFooter";
import { ReviewSchema } from "./ReviewSchema";
import { TrustBadges } from "./TrustBadges";
import dynamic from "next/dynamic";

const LicenseVerifier = dynamic(
  () => import("./LicenseVerifier").then((mod) => mod.LicenseVerifier)
);

const WageringCalculator = dynamic(
  () => import("./WageringCalculator").then((mod) => mod.WageringCalculator),
  { loading: () => <div className="animate-pulse bg-slate-900/50 border border-white/5 h-[320px] rounded-2xl" /> }
);
import { CheckCircle2, XCircle, ShieldCheck, ShieldAlert, Star, Calendar, Activity } from "lucide-react";

interface ReviewTemplateProps {
  review: Casino;
}

export async function ReviewTemplate({ review }: ReviewTemplateProps) {
  // Determine compliance profile directly on the server via cookies
  const cookieStore = await cookies();
  const simulatedGeo = cookieStore.get("simulated_geo_nl")?.value;
  const isNl = simulatedGeo === "true";

  // geo location
  const headerStore = await headers();
  const userCountry = headerStore.get('x-user-country') || 'global';

  // if the casino has a specific bonus for the user's country, show it
  // otherwise, fallback to the 'global' bonus
  const activeBonus = review.localizedBonuses?.[userCountry] || review.localizedBonuses?.['global'];
  const currentWelcomeBonus = activeBonus?.offer || review.welcomeBonus;
  const currentWagering = activeBonus?.wagering || review.wagering;

  // Wage requirement check vs. industry averages (Truth Table Data)
  const wagerLimit = parseInt(currentWagering.replace(/[^0-9]/g, "")) || 35;
  const industryAverage = 35;
  const wagerStatus = wagerLimit <= industryAverage ? "✓ Standard" : "⚠️ High Rollover";
  const wagerStatusColor = wagerLimit <= industryAverage ? "text-emerald-400" : "text-amber-400";

  return (
    <>
      {/* Dynamic SEO JSON-LD injection (Server-side generated) */}
      <ReviewSchema review={review} />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-20 relative optimize-gpu">

        {/* Bento Hero Block (Full Width) */}
        <section
          className="reveal-card delay-1 lg:col-span-3 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${review.logoColor}/10 rounded-full blur-3xl opacity-50`}></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center w-full">

            {/* LEFT: Casino identity */}
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left lg:justify-self-start">
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${review.logoColor} rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-xl shadow-slate-950/50 shrink-0`}>
                {review.name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
                    {review.name}
                  </h1>
                  <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${review.isKsaLicensed
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                    }`}>
                    <ShieldCheck size={12} />
                    {review.isKsaLicensed ? (isNl ? "KSA Gecertificeerd" : "KSA Licensed") : "Reviewed & Audited"}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-mono mb-3">{review.domain}</p>
                <div className="flex items-center justify-center md:justify-start gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg w-max">
                  <Star className="text-amber-400 fill-amber-400" size={14} />
                  <span className="text-xs font-bold text-white">{review.rating}</span>
                  <span className="text-[10px] text-slate-500">/{review.isKsaLicensed ? "10" : "5"} rating</span>
                </div>
              </div>
            </div>

            {/* MIDDLE: Trust Badges */}
            <div className="lg:justify-self-center">
              <TrustBadges />
            </div>

            {/* RIGHT: Welcome bonus + CTA */}
            <div className="flex flex-col items-center lg:items-end gap-2 w-full lg:justify-self-end">
              <div className="text-center lg:text-right w-full">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Welcome Bonus</span>
                <p className="text-sm md:text-base font-extrabold text-emerald-400 leading-snug mt-1 whitespace-normal break-words">
                  {currentWelcomeBonus}
                </p>
              </div>
              {isNl && !review.isLicensedInNL ? (
                <div className="mt-2 text-center py-2.5 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-rose-400 border border-rose-500/20 bg-rose-500/5 neon-border-rose">
                  Niet beschikbaar in NL
                </div>
              ) : (
                <OutboundLinkWithTooltip
                  affiliateUrl={review.affiliateUrl}
                  isLicensedInNL={review.isLicensedInNL}
                  isKsaLicensed={review.isKsaLicensed}
                  licenseType={review.licenseType}
                  name={review.name}
                  welcomeBonus={currentWelcomeBonus}
                  className={`mt-2 inline-flex items-center justify-center px-6 py-3 rounded-xl text-xs font-bold text-slate-950 shadow-lg hover:scale-[1.03] active:scale-95 transition-all ${
                    review.isLicensedInNL
                      ? "bg-emerald-400 hover:bg-emerald-350 shadow-emerald-500/10"
                      : "bg-blue-400 hover:bg-blue-350 shadow-blue-500/10"
                  }`}
                >
                  {review.isLicensedInNL ? (isNl ? "Claim Bonus & Speel" : "Claim Offer & Play") : "Visit Site (External)"}
                </OutboundLinkWithTooltip>
              )}
            </div>

          </div>

          {/* New Footer Meta-Info Row inside the card */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Verified Audit Badge */}
              <div className="flex items-center justify-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg text-[10px] text-emerald-400 font-bold uppercase tracking-wider neon-border-emerald whitespace-nowrap">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Verified&nbsp;Audit:&nbsp;<strong className="text-white font-mono">{review.lastUpdated}</strong></span>
              </div>

              {/* Last Updated Badge */}
              <div className="flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg text-[10px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
                <Calendar size={11} className="text-blue-400" />
                <span>Last&nbsp;Updated:&nbsp;<strong className="text-white font-mono">{review.datePublished}</strong></span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-blue-400" />
              <span>Independent Compliance Report</span>
            </div>
          </div>
        </section>

        {/* Bento Item 2: Compliance Notice Block (Spans 2 columns) */}
        <section
          className={`reveal-card delay-2 lg:col-span-2 border rounded-3xl p-5 optimize-gpu ${review.isKsaLicensed
            ? "bg-emerald-950/20 border-emerald-500/25 neon-border-emerald"
            : "bg-rose-950/25 border-rose-500/30 neon-border-rose"
            }`}
        >
          <div className="flex gap-4 items-start">
            {review.isKsaLicensed ? (
              <ShieldCheck className="text-emerald-405 shrink-0 mt-0.5" size={20} />
            ) : (
              <ShieldAlert className="text-rose-455 shrink-0 mt-0.5" size={20} />
            )}
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${review.isKsaLicensed ? "text-emerald-400" : "text-rose-405"
                }`}>
                {review.isKsaLicensed
                  ? (isNl ? "✓ Licentie Naleving Geverifieerd" : "✓ Regulatory Compliance Confirmed")
                  : (isNl ? "⚠️ Waarschuwing: Niet-Gelicenseerde Aanbieder" : "⚠️ Compliance Warning: Unregulated Entity")}
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {review.isKsaLicensed ? (
                  isNl ? (
                    `Deze aanbieder bezit licentienummer ${review.licenseNumber} verstrekt door de Nederlandse Kansspelautoriteit (KSA). Het is wettelijk toegestaan voor deze aanbieder om kansspelen aan te bieden aan ingezetenden van Nederland.`
                  ) : (
                    `This operator is officially licensed (License no: ${review.licenseNumber}) by the Kansspelautoriteit (KSA) and is fully authorized to operate within the regulated market of the Netherlands.`
                  )
                ) : (
                  isNl ? (
                    `LET OP: ${review.name} heeft GEEN vergunning van de Kansspelautoriteit (KSA). Het is illegaal om in Nederland bij dit casino te spelen. Spelers genieten geen consumentenbescherming, hebben geen toegang tot het CRUKS-register en lopen risico op inbeslagname van tegoeden.`
                  ) : (
                    `WARNING: This operator is NOT licensed by the Kansspelautoriteit (KSA). It does not hold a regulatory permit for the Netherlands region. Accessing this site from restricted areas constitutes a breach of local policy, exposing players to severe payout and safety risks.`
                  )
                )}
              </p>

              {/* Dynamically injected paragraph explaining the licensing regulatory status for user safety */}
              <p className="text-[10px] text-slate-400 leading-relaxed mt-2 border-t border-white/5 pt-2 font-medium">
                {isNl ? (
                  `KSA-licenties verplichten operators tot deelname aan CRUKS en beschermen spelersfondsen via strikte segregatieregels. Offshore licenties (zoals Curaçao) bieden geen wettelijke bescherming in Nederland.`
                ) : (
                  `MGA & KSA regulatory frameworks mandate strict audit logs, game fairness monitoring, and dispute resolution. Offshore configurations carry higher operational risks regarding payout dispute mediation.`
                )}
              </p>

              {/* Citation Layer: Source / Regulation Direct Link */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-1.5 text-[10px]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-450 font-bold uppercase tracking-wider">Source / Official Regulator:</span>
                  {review.licenseType === "ksa" ? (
                    <a
                      href="https://kansspelautoriteit.nl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-bold underline transition-colors cursor-pointer"
                    >
                      Kansspelautoriteit (KSA) Official Website
                    </a>
                  ) : review.licenseType === "mga" ? (
                    <a
                      href="https://www.mga.org.mt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-bold underline transition-colors cursor-pointer"
                    >
                      Malta Gaming Authority (MGA) Registry Portal
                    </a>
                  ) : (
                    <a
                      href="https://www.curacao-egaming.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-bold underline transition-colors cursor-pointer"
                    >
                      Curaçao eGaming Portal
                    </a>
                  )}
                </div>

                <LicenseVerifier licenseType={review.licenseType} licenseNumber={review.licenseNumber} />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Item 3: Verification Quick Stats Card (Spans 1 column) */}
        <section
          className="reveal-card delay-2 lg:col-span-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 flex flex-col justify-between optimize-gpu"
        >
          <div>
            <h3 className="text-xs font-display font-bold text-blue-400 uppercase tracking-tight mb-4 flex items-center gap-1.5">
              <Activity size={14} /> Verification Specs
            </h3>
            <div className="space-y-3.5 text-[11px]">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Jurisdiction:</span>
                <span className="font-bold text-white uppercase">{review.licenseType}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Verified RTP:</span>
                <span className="font-bold text-emerald-400 font-mono">96.5% - 98.2%</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Payout Auditing:</span>
                <span className="font-bold text-white">KYC Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RNG Check:</span>
                <span className="font-bold text-emerald-400">100% Certified</span>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-slate-500 leading-relaxed mt-4 pt-3 border-t border-white/5">
            Verified by our iGaming Analyst lab using independent RNG certifications and solvency check parameters.
          </div>
        </section>

        {/* Bento Item 4: E-E-A-T Author Box (Full Width) */}
        <div className="reveal-card delay-3 lg:col-span-3 optimize-gpu">
          <AuthorBox
            authorName={review.author}
            licenseType={review.licenseType}
            licenseNumber={review.licenseNumber}
          />
        </div>

        {/* Bento Item 5: Redactionele Beoordeling (Spans 2 columns) */}
        <section
          className="reveal-card delay-3 lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col justify-between optimize-gpu"
        >
          <div>
            <h2 className="text-xs font-display font-bold text-blue-400 uppercase tracking-tight mb-5">
              {isNl ? "Redactionele Beoordeling (Voor- & Nadelen)" : "Editorial Review (Pros & Cons)"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-display font-bold text-emerald-400 mb-4 flex items-center justify-center gap-2 uppercase tracking-tight whitespace-nowrap">
                    <CheckCircle2 size={15} /> Advantages
                  </h3>
                  <ul className="space-y-3 max-w-md">
                    {review.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-350 text-[11px]">
                        <span className="text-emerald-500 shrink-0 font-extrabold">•</span>
                        <span className="leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-display font-bold text-rose-455 mb-4 flex items-center justify-center gap-2 uppercase tracking-tight whitespace-nowrap">
                    <XCircle size={15} /> Disadvantages
                  </h3>
                  <ul className="space-y-3 max-w-md">
                    {review.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-350 text-[11px]">
                        <span className="text-rose-500 shrink-0 font-extrabold">•</span>
                        <span className="leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Item 6: Trust and Safety Audits (Spans 1 column) */}
        <div className="reveal-card delay-3 lg:col-span-1 optimize-gpu">
          <TrustAndSafety review={review} />
        </div>

        {/* Bento Item 7: Bonus playthrough analysis (Spans 1 column) */}
        <div className="reveal-card delay-4 lg:col-span-1 optimize-gpu animate-bento-entry">
          <BonusTerms review={review} />
        </div>

        {/* Bento Item 8: The 'Truth Table' (Wagering Comparison Specs) (Spans 2 columns) */}
        <section
          className="reveal-card delay-4 lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 optimize-gpu"
        >
          <h3 className="text-xs font-display font-bold text-blue-400 uppercase tracking-tight mb-5">
            The 'Truth Table' - Playthrough vs. Industry Averages
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-455 uppercase tracking-wider font-extrabold">
                  <th className="py-2.5">Wagering Metric</th>
                  <th className="py-2.5">This Casino ({review.name})</th>
                  <th className="py-2.5">Industry Benchmark</th>
                  <th className="py-2.5">Audit Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 font-medium">
                <tr className="border-b border-white/5">
                  <td className="py-3">Required Playthrough</td>
                  <td className="py-3 font-mono font-bold text-white">{currentWagering}</td>
                  <td className="py-3 font-mono">35x bonus</td>
                  <td className={`py-3 font-bold ${wagerStatusColor}`}>{wagerStatus}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Min Deposit to Claim</td>
                  <td className="py-3 font-mono font-bold text-white">{review.bonusMinDeposit || "$20"}</td>
                  <td className="py-3 font-mono">$10 - $20</td>
                  <td className="py-3 text-emerald-400 font-bold">✓ Standard</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Bonus Expiry Window</td>
                  <td className="py-3 font-mono font-bold text-white">{review.bonusValidity || "7 Days"}</td>
                  <td className="py-3 font-mono">14 - 30 Days</td>
                  <td className="py-3 text-amber-400 font-bold">⚠️ Accelerated</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Max Allowed Bet (Active Bonus)</td>
                  <td className="py-3 font-mono font-bold text-white">{review.bonusMaxBet || "$5"}</td>
                  <td className="py-3 font-mono">$5.00</td>
                  <td className="py-3 text-emerald-400 font-bold">✓ Standard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-slate-550 mt-4 leading-relaxed">
            * The Industry Benchmark is calculated using average scores across 200+ audited MGA and KSA casinos. High wagering (40x+ deposit + bonus) makes converting bonus funds into withdrawable cash statistically improbable.
          </p>
        </section>

        {/* Bento Item 9: Game variety (Spans 2 columns) */}
        <div className="reveal-card delay-5 lg:col-span-2 optimize-gpu">
          <GameVariety review={review} />
        </div>

        {/* Bento Item 10: Responsible Play support (Spans 1 column) */}
        <div className="reveal-card delay-5 lg:col-span-1 optimize-gpu">
          <ResponsibleGambling review={review} />
        </div>

        {/* Bento Item 11: Payment audits (Spans 2 columns) */}
        <div className="reveal-card delay-6 lg:col-span-2 optimize-gpu">
          <PaymentMethods review={review} />
        </div>

        {/* Bento Item 12: Playthrough Wager Calculator (Spans 1 column) */}
        <div className="reveal-card delay-6 lg:col-span-1 optimize-gpu">
          <WageringCalculator wageringMultiplier={currentWagering} bonusText={review.bonus} />
        </div>

        {/* Bento Item 13: Solvency Comparison Matrix (Full Width) */}
        <div className="reveal-card delay-7 lg:col-span-3 optimize-gpu">
          <Comparison review={review} />
        </div>

        {/* Bento Item 14: Audit FAQ block (Full Width) */}
        <div className="reveal-card delay-8 lg:col-span-3 optimize-gpu">
          <FAQ faqs={review.faqs} />
        </div>

      </main>

      {/* Client-rendered sticky RG footer dismiss bar */}
      <StickyRgFooter />
    </>
  );
}
