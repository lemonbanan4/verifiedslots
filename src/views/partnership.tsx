"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import {
  Handshake,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Scale,
  Cpu,
  Wallet,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { ComplianceSeal } from "@/components/ComplianceSeal";

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

// Note: Tailwind's scanner needs fully static class strings at build time —
// interpolating `bg-${color}-500/10` would not be picked up, so each icon
// treatment is spelled out per-item instead of composed from a color key.
const valueProps = [
  {
    icon: TrendingUp,
    iconClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "Higher Player LTV",
    body: "Trust reduces first-deposit hesitation and extends player lifecycles. Verified operators consistently see longer retention curves than unaudited competitors in the same vertical.",
  },
  {
    icon: ShieldCheck,
    iconClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "Fewer Disputes & Chargebacks",
    body: "Transparent, independently-audited wagering terms mean fewer players feel misled — which means fewer support escalations, chargebacks, and reputational fires to fight.",
  },
  {
    icon: Users,
    iconClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    title: "Qualified, High-Intent Traffic",
    body: "Our audited-only directory sends players who have already read the compliance report before they click through — higher intent, lower bounce, better conversion economics.",
  },
  {
    icon: Scale,
    iconClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "Regulatory Goodwill",
    body: "Public alignment with an independent auditor strengthens your standing with regulators like the KSA, MGA, and UKGC — and gives your compliance team a citable third-party record.",
  },
];

const methodology = [
  {
    step: "1",
    icon: Cpu,
    iconClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "RNG & Game Math Audits",
    body: "We verify live RTP configurations against certified lab data, run Monte Carlo simulations on welcome-bonus playthrough terms, and confirm game-category contribution weightings match what's disclosed to players.",
  },
  {
    step: "2",
    icon: Scale,
    iconClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "Licensing & Jurisdiction Verification",
    body: "Every license number is cross-checked directly against the public KSA, MGA, and UKGC registries. We confirm restricted-country logic matches the license actually held — not just the one advertised.",
  },
  {
    step: "3",
    icon: Wallet,
    iconClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    title: "Solvency & Payout Audits",
    body: "We make real-money deposits and cashouts to verify processing SLAs under load, and assess whether player funds are genuinely segregated from operating capital — not just claimed to be.",
  },
];

export function Partnership() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 py-6 optimize-gpu"
    >
      {/* 1. Hero */}
      <motion.section
        variants={itemVariants}
        className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden optimize-gpu"
      >
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Handshake size={13} />
            B2B Partnerships
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-5 tracking-tight leading-tight">
            Trust Is The New Currency —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 neon-text-blue">
              We Help You Earn It
            </span>
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            VerifiedSlots partners with operators who are ready to be independently audited, not just advertised. For affiliate managers and compliance officers, that means qualified traffic, fewer disputes, and a public compliance record your regulators can actually check.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Request Partnership <ArrowRight size={14} />
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 mt-8 border-t border-white/5 text-left">
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Audited Operators</span>
              <p className="text-lg font-bold text-white font-mono">12+</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Jurisdictions Covered</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">KSA · MGA · UKGC</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Editorial Independence</span>
              <p className="text-lg font-bold text-blue-400 font-mono">100%</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Pay-To-Rank Placements</span>
              <p className="text-lg font-bold text-amber-400 font-mono">Zero</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. The VerifiedSlots Compliance Seal */}
      <motion.section variants={itemVariants} className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden optimize-gpu">
        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <ShieldCheck size={12} />
              The VerifiedSlots Compliance Seal
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4 tracking-tight">
              A Badge Players Already Know To Trust
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
              The Compliance Seal is only issued to operators who pass our independent audit — it is never sold, and it is never displayed on placeholder promise. Once earned, it can be embedded directly on your site and links back to your live, continuously-updated audit report on VerifiedSlots.
            </p>
            <ul className="space-y-3">
              {[
                "Issued strictly post-audit — never pay-to-display",
                "Live-linked to your public audit report and score",
                "Automatically flags if your compliance status changes",
                "Lightweight embed snippet, no tracking scripts required",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[11px] md:text-xs text-slate-350">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Seal mockup, framed like an embedded browser widget */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl overflow-hidden">
              {/* Mock browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900/80 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
                <span className="ml-3 text-[10px] text-slate-500 font-mono truncate">
                  yourcasino.com/trust
                </span>
              </div>

              {/* Mock site chrome showing the badge in-context */}
              <div className="p-6 flex flex-col items-center gap-4 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_60%)]">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold self-start">
                  Trust &amp; Safety
                </p>
                <ComplianceSeal score={92} size="lg" className="w-full max-w-[220px]" />
                <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                  Verified by an independent third-party auditor. Click to view the full compliance report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Partner Value Proposition */}
      <motion.section variants={itemVariants} className="optimize-gpu">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-3 tracking-tight">
            Partner Value Proposition
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Bonuses are commoditized — nearly any operator can match a deposit offer. Trust is not, and it compounds directly into player lifetime value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {valueProps.map(({ icon: Icon, iconClass, title, body }) => (
            <div
              key={title}
              className="glass-card-interactive rounded-2xl p-6 flex gap-4 items-start group optimize-gpu"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 group-hover:scale-105 transition-transform duration-200 ${iconClass}`}
              >
                <Icon size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
                <p className="text-[11px] text-slate-350 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. Compliance-First Methodology */}
      <motion.section variants={itemVariants} className="glass-card rounded-3xl p-6 md:p-10 optimize-gpu">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <BarChart3 size={12} />
            Compliance-First Methodology
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-3 tracking-tight">
            How We Actually Audit An Operator
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No brochure copy, no marketing screenshots. Every audit is built from three technical pillars.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {methodology.map(({ step, icon: Icon, iconClass, title, body }) => (
            <div
              key={title}
              className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors"
            >
              <div>
                <div
                  className={`w-10 h-10 border rounded-xl flex items-center justify-center mb-4 ${iconClass}`}
                >
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-slate-600 font-mono text-xs">{step}.</span>
                  {title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. Final CTA */}
      <motion.section
        variants={itemVariants}
        className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden optimize-gpu"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.08),_transparent_65%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Handshake className="text-indigo-400 mx-auto mb-4" size={28} />
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4 tracking-tight">
            Ready To Build Trust With Us?
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8">
            Tell us about your platform and your current licensing status. Our compliance desk will scope an independent audit and walk you through what earning the Compliance Seal looks like.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Request Partnership <ArrowRight size={14} />
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
