"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { OutboundLink } from "./OutboundLink";
import { Star, ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";
import type { Casino } from "@/src/data/casinos";

interface CasinoCardProps {
  casino: Casino;
  licenseType?: string;
}

export const CasinoCard = React.memo(function CasinoCard({ casino, licenseType }: CasinoCardProps) {
  // Determine active license based on page context
  const types = casino.licenseTypes && casino.licenseTypes.length > 0 ? casino.licenseTypes : [casino.licenseType];
  const activeLicense = licenseType && types.includes(licenseType as any)
    ? licenseType.toLowerCase()
    : casino.licenseType.toLowerCase();

  const displayName = casino.name === "Bet365 NL" && activeLicense !== "ksa"
    ? "Bet365"
    : casino.name;

  const isKsa = activeLicense === "ksa";
  const isMga = activeLicense === "mga";
  const ratingScale = "/10";

  let badgeText = "";
  let badgeClass = "";
  let icon: React.ReactNode = null;

  if (isKsa) {
    badgeText = "KSA Licensed";
    badgeClass = "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400";
    icon = <ShieldCheck size={13} className="text-emerald-400 shrink-0" />;
  } else if (isMga) {
    badgeText = "MGA Licensed";
    badgeClass = "bg-blue-500/15 border border-blue-500/30 text-blue-400";
    icon = <ShieldCheck size={13} className="text-blue-400 shrink-0" />;
  } else {
    badgeText = "UKGC Regulated";
    badgeClass = "bg-amber-500/15 border border-amber-500/30 text-amber-400";
    icon = <ShieldCheck size={13} className="text-amber-400 shrink-0" />;
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
        borderColor: "rgba(56, 189, 248, 0.25)",
        boxShadow:
          "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(56, 189, 248, 0.08)",
      }}
      whileTap={{ scale: 0.995 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      /*
       * h-full — fills the grid cell so all cards in a row are equal height.
       * relative overflow-hidden — contains absolutely-positioned children and
       *   prevents any inner element from breaking the rounded border.
       * flex flex-col — stacks header / body / footer vertically.
       * box-border — ensures padding never adds to declared width.
       */
      className="glass-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden shadow-xl optimize-gpu focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 outline-none cursor-default border border-white/5 box-border"
    >
      {/* ── Header row: badge + rating ──────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 gap-2 w-full min-w-0">
        {/*
         * min-w-0 on the badge span lets it shrink when the row is narrow.
         * truncate clips text if it overflows on very small viewports.
         */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider min-w-0 truncate ${badgeClass}`}
        >
          {icon}
          <span className="truncate">{badgeText}</span>
        </span>

        {/* Rating — shrink-0 keeps it from ever wrapping or disappearing */}
        <div className="flex items-center gap-1 bg-slate-950/60 border border-white/5 px-2.5 py-1 rounded-lg shrink-0">
          <Star className="text-amber-400 fill-amber-400" size={14} aria-hidden="true" />
          <span
            className="text-xs font-bold text-slate-100"
            aria-label={`Rating ${casino.rating} out of ${isKsa ? "10" : "5"}`}
          >
            {casino.rating}
          </span>
          <span className="text-[10px] text-slate-400">{ratingScale}</span>
        </div>
      </div>

      <div className="flex-grow min-w-0 w-full">
        <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-1.5 min-w-0 truncate">
          {displayName}
        </h3>
        <p className="text-[11px] text-slate-400 font-mono mb-4 truncate">{casino.domain}</p>
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
          {casino.summaryText}
        </p>
      </div>

      <div className="mt-6 space-y-3 w-full min-w-0">
        <div className="w-full box-border bg-slate-950/40 border border-white/5 p-3 rounded-xl">
          <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
            Welcome Offer
          </p>
          <p className="text-xs font-bold text-emerald-400 truncate w-full">
            {casino.welcomeBonus}
          </p>
        </div>

        <div className="flex gap-2 w-full">
          <Link
            href={`/audits/${activeLicense}/${casino.slug.toLowerCase()}`}
            className="flex-1 min-w-0 text-center py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer truncate"
          >
            Read Review
          </Link>
          {casino.isPartner && casino.affiliateUrl && casino.affiliateUrl.trim().length > 0 ? (
            <OutboundLink
              href={casino.affiliateUrl}
              className={`flex-1 min-w-0 text-center py-2.5 px-3 rounded-lg text-xs font-bold text-slate-955 flex items-center justify-center gap-1 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer ${
                activeLicense === "ksa"
                  ? "bg-emerald-500 hover:bg-emerald-450 focus:ring-emerald-500"
                  : activeLicense === "mga"
                  ? "bg-sky-500 hover:bg-sky-450 focus:ring-sky-500"
                  : "bg-amber-400 hover:bg-amber-350 focus:ring-amber-500"
              }`}
            >
              Visit Operator <ArrowRight size={12} aria-hidden="true" className="shrink-0" />
            </OutboundLink>
          ) : (
            <Link
              href="/contact"
              className="flex-1 min-w-0 text-center py-2.5 px-3 rounded-lg text-xs font-bold bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 text-blue-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer truncate flex items-center justify-center gap-1"
            >
              Request Audit <ArrowRight size={12} aria-hidden="true" className="shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
});
