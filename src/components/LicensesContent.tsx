"use client";

import React from "react";
import { useCompliance } from "@/src/context/ComplianceContext";
import { CasinoCard } from "@/components/CasinoCard";
import { ShieldCheck, ShieldAlert, Sparkles, BookOpen } from "lucide-react";
import { Casino, casinoHoldsLicense, sortByAffiliatePriority } from "@/src/data/casinos";
import { motion, Variants } from "motion/react";

interface LicensesContentProps {
  licenseType: string;
  casinos: Casino[];
}

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

export function LicensesContent({ licenseType, casinos }: LicensesContentProps) {
  const { visitorProfile } = useCompliance();

  // Filter casinos matching the license type (checking the full licenseTypes
  // array, not just each casino's single primary licenseType, so dual/multi-
  // licensed operators show up under every jurisdiction they actually hold).
  // If Dutch, only show KSA.
  const visibleCasinos = sortByAffiliatePriority(
    casinos.filter((c) => {
      const matchesLicense = casinoHoldsLicense(c, licenseType);
      const passesGeoCheck = visitorProfile !== "Local" || casinoHoldsLicense(c, "ksa");
      return matchesLicense && passesGeoCheck;
    })
  );

  // Setup dynamic content based on license type
  let heading = "";
  let subHeading = "";
  let subLicenseText = "";
  let heroIconClass = "";

  if (licenseType === "ksa") {
    heading = "KSA Regulated Operators";
    subHeading = "Nederlandse Kansspelen Evaluatie";
    subLicenseText = "We compare and review operators holding active licenses from the Kansspelautoriteit (KSA) under the Remote Gambling Act (Wet Koa).";
    heroIconClass = "text-emerald-400";
  } else if (licenseType === "mga") {
    heading = "MGA Regulated Operators";
    subHeading = "Malta Gaming Authority Evaluation";
    subLicenseText = "Independent audits and compliance reviews of operators licensed by the Malta Gaming Authority (MGA). Check playthrough maths and regulatory safety.";
    heroIconClass = "text-blue-400";
  } else {
    heading = "UKGC Regulated Operators";
    subHeading = "UK Gambling Commission Evaluation";
    subLicenseText = "Compliance oversight and safety evaluations of operators regulated by the UK Gambling Commission (UKGC). Inspect playthrough math and social responsibility standards.";
    heroIconClass = "text-amber-400";
  }

  // Dynamically update the header depending on the active visitorProfile (Global vs. Local)
  const verifiedBrandsHeader = visitorProfile === "Local"
    ? `Local Regulated Brand Reviews (${licenseType.toUpperCase()})`
    : `Verified Brand Reviews (${licenseType.toUpperCase()})`;

  // The proxy already redirects genuinely NL-geo visitors away from
  // /licenses/mga and /licenses/ukgc before this ever renders, but the
  // admin bypass and the client-side geo simulator can still land a
  // "Local" visitorProfile here - that's the one case where an MGA/UKGC
  // page is actually the wrong jurisdiction, so the warning is scoped to
  // it rather than shown unconditionally to every visitor.
  const isWrongJurisdictionRisk = licenseType !== "ksa" && visitorProfile === "Local";

  const regulatedBannerClass: Record<string, string> = {
    mga: "bg-blue-500/10 border border-blue-500/20 text-blue-400 neon-border-blue",
    ukgc: "bg-amber-500/10 border border-amber-500/20 text-amber-400",
  };
  const regulatorFullName: Record<string, string> = {
    mga: "Malta Gaming Authority",
    ukgc: "UK Gambling Commission",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 optimize-gpu"
    >
      {/* 1. Dynamic Warning Banner per Regulatory Context */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3 optimize-gpu">
        {licenseType === "ksa" ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 neon-border-emerald">
            <ShieldCheck className="text-emerald-400 shrink-0" size={16} />
            <span>KSA-Regulated: Full legal protection under Kansspelautoriteit regulations. Exclusively for Dutch residents.</span>
          </div>
        ) : isWrongJurisdictionRisk ? (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 neon-border-rose">
            <ShieldAlert className="text-rose-400 shrink-0" size={16} />
            <span>International Licensed ({licenseType.toUpperCase()}): Not authorized for residents of the Netherlands. NL players are strictly prohibited.</span>
          </div>
        ) : (
          <div className={`px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 ${regulatedBannerClass[licenseType] ?? regulatedBannerClass.mga}`}>
            <ShieldCheck className="shrink-0" size={16} />
            <span>{licenseType.toUpperCase()} Regulated: Independently audited operator compliant with {regulatorFullName[licenseType] ?? regulatorFullName.mga} standards.</span>
          </div>
        )}
      </motion.div>

      {/* 2. Portal Hero - Styled with Liquid Glass */}
      <motion.div
        variants={itemVariants}
        className="reveal-card delay-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden optimize-gpu"
      >
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            {subHeading}
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight leading-tight">
            {licenseType.toUpperCase()} Licensed Brands
          </h1>

          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            {subLicenseText}
          </p>

          <div className="flex justify-center items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck size={14} className={heroIconClass} />
              {heading}
            </div>
            <span className="text-white/10">•</span>
            <div className="flex items-center gap-1.5 font-semibold">
              <BookOpen size={14} className="text-indigo-400" />
              Independent Safety Check
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Directory Listings - Bento Grid style cards with reveal animations */}
      <motion.div variants={itemVariants} className="optimize-gpu">
        <h2 className="text-md font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          {verifiedBrandsHeader}
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-350">
            {visibleCasinos.length} Operator{visibleCasinos.length !== 1 ? "s" : ""}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {visibleCasinos.map((casino) => (
            <CasinoCard key={casino.id} casino={casino} licenseType={licenseType} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
