"use client";

import React, { useState } from "react";
import { useCompliance } from "@/src/context/ComplianceContext";
import { HeartPulse, X } from "lucide-react";

export function StickyRgFooter() {
  const [showStickyRg, setShowStickyRg] = useState(true);
  const { visitorProfile } = useCompliance();
  const isNl = visitorProfile === "Local";

  if (!showStickyRg) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-slate-950/95 border-t border-rose-500/30 py-3.5 px-4 backdrop-blur-lg shadow-2xl flex items-center justify-between gap-4 optimize-gpu">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HeartPulse className="text-rose-500 shrink-0 hidden sm:block animate-pulse" size={18} />
          <div className="text-[11px] leading-relaxed text-slate-350 font-semibold">
            {isNl ? (
              <span className="font-bold text-rose-500">
                Wat kost gokken jou? Stop op tijd. 18+
              </span>
            ) : (
              <span>
                <span className="font-bold text-rose-455">Play Responsibly. 18+</span> | Gambling involves financial risk and addiction. Self-exclusion tools are available.
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              window.history.pushState(null, "", "/responsible-gambling");
              window.dispatchEvent(new Event("popstate"));
            }}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 shrink-0 cursor-pointer transition-colors"
          >
            {isNl ? "Hulp & Advies" : "Get Help"}
          </button>
          <button 
            onClick={() => setShowStickyRg(false)}
            className="text-slate-400 hover:text-white shrink-0 p-1 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer"
            title="Dismiss"
            aria-label="Dismiss responsible gambling banner"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
