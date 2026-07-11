import React from "react";
import Link from "next/link";
import { fetchAllCasinos } from "@/src/lib/auditService";
import { casinoHoldsLicense } from "@/src/data/casinos";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Scale,
  ArrowRight,
  FileText
} from "lucide-react";
import { JournalisticInsights } from "@/components/JournalisticInsights";

export default async function Homepage() {
  const casinos = await fetchAllCasinos();
  const ksaCount = casinos.filter((c) => casinoHoldsLicense(c, "ksa")).length;
  const mgaCount = casinos.filter((c) => casinoHoldsLicense(c, "mga")).length;
  const ukgcCount = casinos.filter((c) => casinoHoldsLicense(c, "ukgc")).length;

  return (
    <div className="flex flex-col gap-10 py-2 optimize-gpu">
      {/* 1. Cyber Hero Header */}
      <section className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden optimize-gpu">
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-450 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Scale size={13} />
            Independent iGaming Auditing and Compliance
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-5 tracking-tight leading-tight">
            iGaming Licensing & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 neon-text-blue font-semibold">
              Compliance Intelligence
            </span>
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Welcome to the developer-led framework auditing online casinos, playthrough mathematics, and payout solvency. We analyze licensing compliance to deliver objective, fact-based reports.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5 text-left">
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total Audits</span>
              <p className="text-lg font-bold text-white font-mono">{casinos.length} Brands</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Regulated KSA</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{ksaCount} Audits</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Regulated MGA</span>
              <p className="text-lg font-bold text-blue-400 font-mono">{mgaCount} Audits</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Regulated UKGC</span>
              <p className="text-lg font-bold text-amber-400 font-mono">{ukgcCount} Audits</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Directories (Bento Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KSA */}
        <div className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu">
          <div>
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-455 mb-4 border border-emerald-500/20 group-hover:scale-105 transition-all">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
              KSA Licensed (NL)
              <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded font-mono">
                {ksaCount} active
              </span>
            </h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
              Evaluation of operators audited by the Dutch Kansspelautoriteit. Rigorous consumer safety standards, CRUKS limits, and strict player account segregation.
            </p>
          </div>
          <Link href="/licenses/ksa" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-455 hover:text-emerald-300 transition-colors">
            KSA Audits <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MGA */}
        <div className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu">
          <div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-405 mb-4 border border-blue-500/20 group-hover:scale-105 transition-all">
              <Shield size={18} />
            </div>
            <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
              MGA Regulated
              <span className="text-[9px] bg-blue-500/15 border border-blue-500/20 text-blue-400 font-extrabold px-2 py-0.5 rounded font-mono">
                {mgaCount} active
              </span>
            </h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
              Assessments of Malta Gaming Authority licensees. Audits of playthrough calculations, solvent player fund segregation, and secure withdrawal windows.
            </p>
          </div>
          <Link href="/licenses/mga" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-405 hover:text-blue-300 transition-colors">
            MGA Audits <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* UKGC */}
        <div className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu">
          <div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-455 mb-4 border border-amber-500/20 group-hover:scale-105 transition-all">
              <ShieldAlert size={18} />
            </div>
            <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
              UKGC Regulated
              <span className="text-[9px] bg-amber-500/15 border border-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded font-mono">
                {ukgcCount} active
              </span>
            </h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
              Evaluations of operators regulated by the UK Gambling Commission. High social responsibility standards, strict playthrough math audits, and secure payouts.
            </p>
          </div>
          <Link href="/licenses/ukgc" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-455 hover:text-amber-300 transition-colors">
            UKGC Audits <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. Journalistic Insights Section (Articles) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
          <h2 className="text-lg font-display font-extrabold text-white tracking-wider flex items-center gap-2">
            <FileText className="text-blue-400" size={20} />
            iGaming Journalistic Insights & Audits
          </h2>
          <Link
            href="/audits"
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.1)] cursor-pointer self-start sm:self-auto shrink-0"
          >
            View All Audits <ArrowRight size={12} />
          </Link>
        </div>

        <JournalisticInsights limit={2} />
      </section>
    </div>
  );
}
