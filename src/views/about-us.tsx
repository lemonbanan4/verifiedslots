"use client";

import React from "react";
import { useCompliance } from "@/src/context/ComplianceContext";
import { t } from "../utils/translation";
import { Shield, Database, Cpu, UserCheck, CheckCircle, Scale, Coins } from "lucide-react";

export function AboutUs() {
  const { isDutch } = useCompliance();
  const isNl = isDutch;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-12 max-w-4xl mx-auto my-8 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Title block */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          <Shield size={12} />
          {isNl ? "ONAFHANKELIJKE ANALYSE" : "INDEPENDENT ANALYTICS"}
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {t("about_us_headline", isNl ? "nl" : "en")}
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-350 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {isNl
            ? "Wij zijn een onafhankelijk team van ontwikkelaars, data-analisten en iGaming-juristen. Onze missie is om de online kansspelindustrie transparant en meetbaar te maken door spelersveiligheid boven affiliate commissies te stellen."
            : "We are an independent consortium of software developers, data scientists, and iGaming legal experts. Our mission is to inject mathematical transparency and regulatory rigor into the online gaming sector, placing player safety above commercial gain."}
        </p>
      </div>

      {/* Core Narrative / Narrative Section */}
      <div className="prose prose-invert max-w-none mb-12 text-xs md:text-sm text-slate-300 space-y-6 leading-relaxed relative z-10">
        <p>
          {isNl
            ? "De meeste reviewwebsites in de iGaming-industrie worden gedreven door pure marketing. Casino's die de hoogste commissies betalen, krijgen automatisch de hoogste ratings, ongeacht hun uitbetalingssnelheid of verborgen voorwaarden. Wij geloven dat dit model fundamenteel kapot is en spelers in gevaar brengt."
            : "The vast majority of iGaming affiliate portals operate on a simple pay-to-play marketing scheme. Operators offering the highest revenue-share models are routinely awarded top rankings, irrespective of their actual payout reliability, terms fairness, or licensing compliance. We believe this standard is ethically flawed and places consumers at risk."}
        </p>
        <p>
          {isNl
            ? "Als ontwikkelaars benaderen we casinoreviews anders. We analyseren de onderliggende systemen: we controleren spel-API's om de werkelijke RTP (Return to Player) te valideren, rekenen bonusvoorwaarden door met simulatiescripting om de verwachte waarde te berekenen, en testen betaalpoorten met echt geld om transactiesnelheden objectief vast te leggen."
            : "Our approach is built on technical auditing. Instead of copy-pasting promotional brochures, we interact with game APIs to verify live Return to Player (RTP) parameters, build Monte Carlo simulations to model the mathematical expected value of bonus playthrough terms, and make real-money deposits and cashouts to verify transaction velocities under load."}
        </p>
      </div>

      {/* Methodology Grid */}
      <h2 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
        <Scale className="text-blue-400" size={20} />
        {isNl ? "Onze Drie Pijlers" : "Our Core Review Pillars"}
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12 relative z-10">
        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
          <div>
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 font-bold">1</div>
            <h3 className="text-sm font-bold text-white mb-2">{isNl ? "Wiskundige Validatie" : "Mathematical Audits"}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isNl
                ? "We berekenen de werkelijke winstkansen van bonussen na aftrek van inzetvereisten, maximale inzetlimieten en spelwegingen."
                : "We deconstruct the terms of welcome offers, calculating the mathematical threshold at which a bonus becomes negative expected value."}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
          <div>
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4 font-bold">2</div>
            <h3 className="text-sm font-bold text-white mb-2">{isNl ? "Strikte Geo-Compliance" : "Localized Compliance"}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isNl
                ? "Voor Nederlandse gebruikers filteren we alle illegale en offshore aanbieders. We tonen uitsluitend KSA-gelicenseerde exploitanten."
                : "We inspect local licenses. NL traffic is directed strictly to Kansspelautoriteit (KSA) licensees, while global traffic is routed to audited jurisdictions."}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
          <div>
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4 font-bold">3</div>
            <h3 className="text-sm font-bold text-white mb-2">{isNl ? "Transparant Verdienmodel" : "Monetization Disclosure"}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isNl
                ? "Wij ontvangen affiliate vergoedingen voor verwezen spelers. Maar onze partners kunnen op geen enkele wijze ratings kopen of reviews wijzigen."
                : "We earn referral commissions on outbound links. However, financial terms have zero impact on our code-level audits or scorecards."}
            </p>
          </div>
        </div>
      </div>

      {/* Disclosures section */}
      <div className="bg-slate-955/60 border border-white/5 rounded-2xl p-6 relative z-10">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
          <Coins className="text-amber-400" size={16} />
          {isNl ? "Belofte van Onafhankelijkheid" : "Independence Pledge"}
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {isNl
            ? "Elke link op onze site naar een casino is voorzien van rel=\"nofollow sponsored\" om de SEO-richtlijnen te respecteren. Casino's betalen ons uitsluitend op basis van spelerregistraties. We weigeren sponsorovereenkomsten die eisen dat we negatieve aspecten (zoals trage uitbetalingen of ongunstige algemene voorwaarden) achterwege laten."
            : "Every casino link featured across our index uses rel=\"nofollow sponsored\" to comply with search engine guidelines. While we earn compensation, we refuse sponsorship packages that mandate the suppression of negative findings, slow withdrawal logs, or high wagering playthrough requirements."}
        </p>
      </div>

      {/* Localized KSA Footer compliance block */}
      {isNl && (
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-rose-455 text-xs font-bold uppercase tracking-wider">
            Wat kost gokken jou? Stop op tijd. 18+
          </p>
        </div>
      )}
    </div>
  );
}
