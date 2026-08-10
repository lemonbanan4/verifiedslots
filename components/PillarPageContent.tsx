"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Shield, ShieldCheck, ShieldAlert, BookOpen, HeartPulse, Scale, ArrowRight } from "lucide-react";
import { Casino, casinoHoldsLicense } from "@/src/data/casinos";
import { REGULATOR_KEYS, REGULATOR_META, type LicenseType } from "@/src/data/regulators";

interface PillarPageContentProps {
  casinos: Casino[];
}

// Purely decorative per-regulator presentation for this page's cluster
// cards. Kept local (not in regulators.ts) since this copy/styling is
// specific to the pillar page and already differs subtly from the
// homepage's own cluster cards (e.g. "Browse KSA Directory" vs "KSA
// Audits", "{n} audited" vs "{n} active"). A new regulator without an
// entry here gets the indigo default rather than silently reusing
// another regulator's icon/copy/colors.
const PILLAR_ICON: Partial<Record<LicenseType, React.ElementType>> = {
  ksa: ShieldCheck,
  mga: Shield,
  ukgc: ShieldAlert,
};
const PILLAR_ICON_WRAP_CLASS: Partial<Record<LicenseType, string>> = {
  ksa: "bg-emerald-500/10 text-emerald-450 border-emerald-500/20",
  mga: "bg-blue-500/10 text-blue-405 border-blue-500/20",
  ukgc: "bg-amber-500/10 text-amber-450 border-amber-500/20",
};
const DEFAULT_PILLAR_ICON_WRAP_CLASS = "bg-indigo-500/10 text-indigo-405 border-indigo-500/20";
const PILLAR_HEADING: Partial<Record<LicenseType, string>> = {
  ksa: "KSA Licensed (NL)",
  mga: "MGA Regulated",
  ukgc: "UKGC Regulated",
};
const PILLAR_COPY: Partial<Record<LicenseType, string>> = {
  ksa: "Operators holding active permits from the Dutch Kansspelautoriteit (KSA) under the Remote Gambling Act (Wet Koa). Features segregated player funds, strict deposit limitations, and mandatory CRUKS integration.",
  mga: "Audits of operators licensed by the Malta Gaming Authority (MGA). MGA provides European player protection standards, rigorous operator solvency checks, and independent third-party RNG verification, but lacks Dutch local legal support.",
  ukgc: "Assessments of operators licensed by the UK Gambling Commission (UKGC). High social responsibility standards, strict playthrough math audits, and secure payouts.",
};
const DEFAULT_PILLAR_COPY = "Independent audits and compliance reviews of licensed operators.";
const PILLAR_STATS_TEXT_CLASS: Partial<Record<LicenseType, string>> = {
  ksa: "text-emerald-400",
  mga: "text-blue-400",
  ukgc: "text-amber-400",
};
const PILLAR_BADGE_CLASS: Partial<Record<LicenseType, string>> = {
  ksa: "bg-emerald-500/15 border border-emerald-500/20 text-emerald-400",
  mga: "bg-blue-500/15 border border-blue-500/20 text-blue-400",
  ukgc: "bg-amber-500/15 border border-amber-500/20 text-amber-400",
};
const DEFAULT_PILLAR_BADGE_CLASS = "bg-indigo-500/15 border border-indigo-500/20 text-indigo-400";
const PILLAR_LINK_CLASS: Partial<Record<LicenseType, string>> = {
  ksa: "text-emerald-450 hover:text-emerald-300",
  mga: "text-blue-405 hover:text-blue-300",
  ukgc: "text-amber-455 hover:text-amber-300",
};
const DEFAULT_PILLAR_LINK_CLASS = "text-indigo-405 hover:text-indigo-300";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};

export function PillarPageContent({ casinos }: PillarPageContentProps) {
  const licenseCounts = Object.fromEntries(
    REGULATOR_KEYS.map((key) => [key, casinos.filter((c) => casinoHoldsLicense(c, key)).length])
  ) as Record<LicenseType, number>;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 py-6 optimize-gpu"
    >
      
      {/* 1. Bento Header Block (Hero) */}
      <motion.section 
        variants={itemVariants}
        className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden optimize-gpu"
      >
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-450 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Scale size={13} />
            Independent iGaming Compliance Directory
          </div>
          
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-5 tracking-tight leading-tight">
            iGaming Licensing & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 neon-text-blue">
              Regulatory Audit Hub
            </span>
          </h1>
          
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            An objective, developer-led framework auditing online casino jurisdictions. We analyze regulatory compliance, verify playthrough mathematics, and assess consumer safety standards to deliver non-sponsored reviews.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5 text-left">
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total Audits</span>
              <p className="text-lg font-bold text-white font-mono">{casinos.length} Platforms</p>
            </div>
            {REGULATOR_KEYS.map((key) => (
              <div key={key}>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Regulated {REGULATOR_META[key].shortLabel}</span>
                <p className={`text-lg font-bold font-mono ${PILLAR_STATS_TEXT_CLASS[key] ?? "text-indigo-400"}`}>{licenseCounts[key]} Brands</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 2. Core Pillars - Bento Grids with dynamic hover glow */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REGULATOR_KEYS.map((key) => {
          const Icon = PILLAR_ICON[key] ?? ShieldCheck;
          return (
            <motion.div
              key={key}
              variants={itemVariants}
              className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border group-hover:scale-105 transition-transform duration-200 ${PILLAR_ICON_WRAP_CLASS[key] ?? DEFAULT_PILLAR_ICON_WRAP_CLASS}`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
                  {PILLAR_HEADING[key] ?? REGULATOR_META[key].cardBadgeText}
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded font-mono ${PILLAR_BADGE_CLASS[key] ?? DEFAULT_PILLAR_BADGE_CLASS}`}>
                    {licenseCounts[key]} audited
                  </span>
                </h3>
                <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
                  {PILLAR_COPY[key] ?? DEFAULT_PILLAR_COPY}
                </p>
              </div>
              <Link href={`/licenses/${key}`} className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${PILLAR_LINK_CLASS[key] ?? DEFAULT_PILLAR_LINK_CLASS}`}>
                Browse {REGULATOR_META[key].shortLabel} Directory <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          );
        })}
      </section>

      {/* 3. Supporting Pillars - Help and Verification Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Responsible Gambling Info */}
        <motion.div 
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 flex gap-4 items-start hover:border-rose-500/20 transition-colors optimize-gpu"
        >
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-405 border border-rose-500/20 shrink-0">
            <HeartPulse size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1.5">Responsible Gaming Support</h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-4">
              Access self-exclusion guides, local Dutch support mechanisms (Loket Kansspel, CRUKS registration), UK GamCare resources, and advice on setting session limits.
            </p>
            <Link href="/responsible-gambling" className="text-[11px] font-bold uppercase tracking-wider text-rose-405 hover:text-rose-300 inline-flex items-center gap-1">
              Read Self-Help Guide <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>

        {/* Auditing and Editorial Standards */}
        <motion.div 
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 flex gap-4 items-start hover:border-indigo-500/20 transition-colors optimize-gpu"
        >
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-405 border border-indigo-500/20 shrink-0">
            <BookOpen size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1.5">How We Verify Operator Claims</h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-4">
              Read our auditing scorecard rules. Learn how we verify house edge configurations, check for hidden playthrough limits, and audit withdrawal processing speeds.
            </p>
            <Link href="/editorial-policy" className="text-[11px] font-bold uppercase tracking-wider text-indigo-405 hover:text-indigo-300 inline-flex items-center gap-1">
              Read Editorial Guidelines <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>

      </section>
      
    </motion.div>
  );
}
