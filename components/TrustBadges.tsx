"use client";

import React from "react";
import { ShieldCheck, UserCheck, Zap } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="text-blue-400 group-hover:scale-110 transition-transform duration-200 shrink-0" size={14} />,
      label: "Verified License",
      sub: "100% Regulated",
    },
    {
      icon: <UserCheck className="text-indigo-400 group-hover:scale-110 transition-transform duration-200 shrink-0" size={14} />,
      label: "KYC Audited",
      sub: "Solvency Checked",
    },
    {
      icon: <Zap className="text-amber-400 group-hover:scale-110 transition-transform duration-200 shrink-0" size={14} />,
      label: "Fast Payouts",
      sub: "Verified Speed",
    },
  ];

  return (
    /*
     * flex-wrap allows the badges to drop to a second line on
     * mid-width screens instead of overflowing the card.
     * gap-2 keeps them tight when wrapped.
     */
    <div className="flex items-center flex-wrap gap-2 select-none justify-center">
      {badges.map((badge, idx) => (
        <div
          key={idx}
          className="group flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 hover:border-blue-500/25 hover:bg-slate-900/60 transition-all duration-200 cursor-pointer shrink-0"
        >
          <div className="flex items-center justify-center p-1 rounded bg-white/5 group-hover:bg-blue-500/10 transition-colors">
            {badge.icon}
          </div>
          {/* Always show label text — hidden sm:block was hiding it at wrong breakpoints */}
          <div className="text-left">
            <p className="text-[10px] font-bold text-slate-100 tracking-tight leading-none whitespace-nowrap">
              {badge.label}
            </p>
            <p className="text-[8px] text-slate-400 font-medium uppercase tracking-wider leading-none mt-0.5 whitespace-nowrap">
              {badge.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
