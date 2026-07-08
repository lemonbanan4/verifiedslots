"use client";

import React from "react";
import { useCompliance } from "@/src/context/ComplianceContext";
import { t } from "../utils/translation";
import { BookOpen, FileText, CheckCircle2, ShieldCheck, Scale, Award, Percent } from "lucide-react";

export function EditorialPolicy() {
  const { isDutch } = useCompliance();
  const isNl = isDutch;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-12 max-w-4xl mx-auto my-8 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          <BookOpen size={12} />
          {isNl ? "KWALITEITSSTANDAARD" : "EDITORIAL GUIDELINES"}
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {t("editorial_policy_headline", isNl ? "nl" : "en")}
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-350 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {isNl
            ? "Ons formele toetsingskader voor objectieve casinoreviews, transparantie in partnerschappen en het beschermen van de speler."
            : "Our objective auditing framework governing operator scorecards, playthrough validation, and advertising disclosure rules."}
        </p>
      </div>

      {/* Principles Section */}
      <div className="space-y-10 relative z-10 mb-12">
        {/* Licensing */}
        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={22} />
            {isNl ? "1. Kansspellicenties & Geo-Fencing" : "1. Licensing Validation & Jurisdiction"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isNl
              ? "De eerste en belangrijkste stap in onze audit is het verifiëren van de vergunning. In Nederland tonen en beoordelen we uitsluitend aanbieders met een actieve vergunning van de Kansspelautoriteit (KSA) onder de Wet Kansspelen op afstand (Koa). Wij weigeren categorisch om illegale aanbieders te listen voor Nederlandse bezoekers."
              : "Licensing is our primary gatekeeper. We cross-reference every listed operator's license number with active regulatory registries. For Dutch traffic, only Kansspelautoriteit (KSA) licensed entities are permitted. Offshore operators targeting blacklisted markets are either filtered or prominently tagged with caution notices."}
          </p>
          <div className="border-t border-white/5 pt-3 text-[10px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-emerald-400" />
            {isNl ? "Directe verificatie in het KSA register voor elke review." : "Continuous verification via direct regulatory databases."}
          </div>
        </div>

        {/* Financial testing */}
        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Scale className="text-blue-400" size={22} />
            {isNl ? "2. Transactiesnelheid & Uitbetalingstests" : "2. Payout Speed Audits & Payment Rigor"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isNl
              ? "We reviewen casino's niet op papier; we openen anonieme accounts en storten echt geld. We meten de daadwerkelijke tijd die nodig is om een uitbetaling te verwerken (inclusief KYC-verificatie). Casino's die winsten onnodig vasthouden of uitbetalingen vertragen om spelers te verleiden door te spelen, krijgen direct aftrek in hun rating."
              : "We perform real-money audit transactions on anonymous accounts. Our team measures the total duration elapsed between a withdrawal request and the funds arriving in the bank account, accounting for KYC verification cycles. Any operator delaying payouts to trigger player cancellation receives immediate score penalties."}
          </p>
          <div className="border-t border-white/5 pt-3 text-[10px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-blue-400" />
            {isNl ? "Transacties getest met iDEAL en instant-banking." : "Transacties audited using instant-banking, credit cards, and e-wallets."}
          </div>
        </div>

        {/* Bonus Playthrough math */}
        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Percent className="text-indigo-400" size={22} />
            {isNl ? "3. Eerlijkheid van Bonusvoorwaarden" : "3. Playthrough Mathematics & Bonus Fairness"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isNl
              ? "Een grote bonus is waardeloos als de voorwaarden onmogelijk zijn. We ontleden de algemene voorwaarden en berekenen de playthrough-ratio. We beoordelen inzetvereisten (wager), maximale inzetlimieten met bonusgeld, en spelwegingen. Alleen bonussen die een eerlijke kans bieden om te worden omgezet in opneembaar cash geld, krijgen een voldoende rating."
              : "Large promotional bonus matches are mathematically misleading if bound to predatory terms. Our editors calculate the exact rollover multiplier and game wagering weightings. Bonuses with wagering requirements exceeding 35x (bonus + deposit) or containing unfair maximum win caps are rated as unfavorable."}
          </p>
          <div className="border-t border-white/5 pt-3 text-[10px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-indigo-400" />
            {isNl ? "Inclusief berekening van de verwachte wiskundige waarde." : "Expectation analysis computed on all bonus terms before listing."}
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Award className="text-amber-450" size={22} />
            {isNl ? "4. Transparantie in Partnerschappen" : "4. Affiliate Relationship & Commission Disclosures"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isNl
              ? "VerifiedSlots is een door affiliate-commissies ondersteund platform. Wanneer u via onze links een account opent, ontvangen wij een commissie van de aanbieder. Dit heeft echter géén invloed op de rating die we toekennen. Onze redactionele onafhankelijkheid is contractueel vastgelegd. Als een casino slecht scoort op uitbetalingssnelheid of compliance, vermelden we dat ongeacht de commissie."
              : "This website operates on an affiliate advertising model. When registering through our links, we may receive compensation from the operator. We maintain strict separation between advertising accounts and our editorial scoring engine. Partners are never permitted to review copy prior to publication or influence compliance warnings."}
          </p>
          <div className="border-t border-white/5 pt-3 text-[10px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-amber-455" />
            {isNl ? "Alle links gemarkeerd met rel=\"nofollow sponsored\"." : "SEO links wrapped strictly in rel=\"nofollow sponsored\" attributes."}
          </div>
        </div>
      </div>

      {/* Footer warning */}
      {isNl ? (
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-rose-455 text-xs font-bold uppercase tracking-wider mb-2">
            Wat kost gokken jou? Stop op tijd. 18+
          </p>
          <p className="text-[10px] text-slate-450 leading-relaxed">
            Laatste update van het reviewbeleid: Juni 2026. Compliant met artikel 4.2 van de Regeling werving, reclame en verslavingspreventie kansspelen.
          </p>
        </div>
      ) : (
        <div className="border-t border-white/10 pt-6 text-center text-[10px] text-slate-400">
          Last updated: June 2026. Governed by independent affiliate guidelines.
        </div>
      )}
    </div>
  );
}
