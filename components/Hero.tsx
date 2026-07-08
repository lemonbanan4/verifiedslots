"use client";

import { motion } from "motion/react";
import { ShieldCheck, ShieldX, Gift, Gamepad2 } from "lucide-react";
import { Casino } from "@/src/data/casinos";
import { OutboundLink } from "./OutboundLink";

interface HeroProps {
  review: Casino;
}

export function Hero({ review }: HeroProps) {
  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 ${
            review.isKsaLicensed 
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}>
            {review.isKsaLicensed ? <ShieldCheck size={14} /> : <ShieldX size={14} />}
            {review.isKsaLicensed 
              ? `KSA Licensed: ${review.name} (${review.domain})` 
              : `Unlicensed Operator Check: ${review.name} (${review.domain})`}
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            {review.name} <span className="text-blue-400 font-medium">Review</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            {review.summaryText}
          </p>
          
          {review.warningText && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium mb-10 ${
              review.isKsaLicensed
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-300"
            }`}>
              {review.isKsaLicensed ? <ShieldCheck size={16} className="text-emerald-400" /> : <ShieldX size={16} className="text-rose-400" />}
              {review.warningText}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-4 rounded-xl min-w-[240px]">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-emerald-400">
                <Gift size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Welcome Offer</p>
                <p className="font-bold text-white text-lg">{review.welcomeBonus}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-4 rounded-xl min-w-[240px]">
              <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg text-indigo-400">
                <Gamepad2 size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Game Library</p>
                <p className="font-bold text-white text-lg">{review.gameLibraryCount}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <OutboundLink 
              href={review.affiliateUrl} 
              className={`inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold text-slate-950 shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                review.isKsaLicensed
                  ? "bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-350 hover:to-green-400 shadow-emerald-500/20"
                  : "bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-350 hover:to-indigo-450 shadow-blue-500/20"
              }`}
            >
              {review.isKsaLicensed ? "Claim Bonus & Play" : "Visit Operator (External Link)"}
            </OutboundLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
