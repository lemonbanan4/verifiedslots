"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Shield, ShieldCheck, ShieldAlert, BookOpen, HeartPulse, Scale, ArrowRight } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface PillarPageContentProps {
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

export function PillarPageContent({ casinos }: PillarPageContentProps) {
  const ksaCount = casinos.filter((c) => c.licenseType === "ksa").length;
  const mgaCount = casinos.filter((c) => c.licenseType === "mga").length;
  const curacaoCount = casinos.filter((c) => c.licenseType === "curacao").length;

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
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Regulated KSA</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{ksaCount} Brands</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Regulated MGA</span>
              <p className="text-lg font-bold text-blue-400 font-mono">{mgaCount} Brands</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Offshore Curaçao</span>
              <p className="text-lg font-bold text-amber-400 font-mono">{curacaoCount} Brands</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Core Pillars - Bento Grids with dynamic hover glow */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cluster 1 - KSA */}
        <motion.div 
          variants={itemVariants}
          className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu"
        >
          <div>
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-450 mb-4 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
              KSA Licensed (NL)
              <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded font-mono">
                {ksaCount} audited
              </span>
            </h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
              Operators holding active permits from the Dutch Kansspelautoriteit (KSA) under the Remote Gambling Act (Wet Koa). Features segregated player funds, strict deposit limitations, and mandatory CRUKS integration.
            </p>
          </div>
          <Link href="/licenses/ksa" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-450 hover:text-emerald-300 transition-colors">
            Browse KSA Directory <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cluster 2 - MGA */}
        <motion.div 
          variants={itemVariants}
          className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu"
        >
          <div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-405 mb-4 border border-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Shield size={18} />
            </div>
            <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
              MGA Regulated
              <span className="text-[9px] bg-blue-500/15 border border-blue-500/20 text-blue-400 font-extrabold px-2 py-0.5 rounded font-mono">
                {mgaCount} audited
              </span>
            </h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
              Audits of operators licensed by the Malta Gaming Authority (MGA). MGA provides European player protection standards, rigorous operator solvency checks, and independent third-party RNG verification, but lacks Dutch local legal support.
            </p>
          </div>
          <Link href="/licenses/mga" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-405 hover:text-blue-300 transition-colors">
            Browse MGA Directory <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cluster 3 - Curaçao */}
        <motion.div 
          variants={itemVariants}
          className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between group optimize-gpu"
        >
          <div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-450 mb-4 border border-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldAlert size={18} />
            </div>
            <h3 className="text-md font-bold text-white mb-2 flex items-center justify-between">
              Curaçao Licensed
              <span className="text-[9px] bg-amber-500/15 border border-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded font-mono">
                {curacaoCount} audited
              </span>
            </h3>
            <p className="text-[11px] text-slate-350 leading-relaxed mb-6">
              Platforms operating under Curaçao eGaming master license systems. Regarded as offshore hubs, these casinos offer higher anonymity and crypto options but carry notable risks in consumer protection and dispute mediation.
            </p>
          </div>
          <Link href="/licenses/curacao" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-455 hover:text-amber-300 transition-colors">
            Browse Curaçao Directory <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

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
