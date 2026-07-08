import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full glass-card rounded-3xl p-8 border border-white/10 shadow-2xl optimize-gpu">
        
        {/* Animated Icon */}
        <div className="inline-flex p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl mb-6 animate-pulse">
          <ShieldAlert size={40} />
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight mb-3">
          404 - Audit Page Restricted
        </h1>
        
        <p className="text-xs text-slate-400 leading-relaxed mb-8">
          The requested compliance URL or review index was not found or is restricted. Please select one of our certified licensing pathways below.
        </p>

        {/* Certified pathways */}
        <div className="space-y-3.5 mb-8 text-left">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold block mb-1">
            Certified Jurisdictions
          </span>
          
          <Link
            href="/licenses/ksa"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 hover:bg-slate-950/80 border border-white/5 hover:border-emerald-500/20 text-slate-200 hover:text-white transition-all cursor-pointer group"
          >
            <span className="text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              KSA Licensed Audits (NL)
            </span>
            <ArrowRight size={14} className="text-slate-550 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/licenses/mga"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 hover:bg-slate-950/80 border border-white/5 hover:border-blue-500/20 text-slate-200 hover:text-white transition-all cursor-pointer group"
          >
            <span className="text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
              MGA Licensed Audits (Europe)
            </span>
            <ArrowRight size={14} className="text-slate-550 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Back to Home action */}
        <Link
          href="/"
          className="w-full py-3 bg-blue-500 hover:bg-blue-450 text-slate-950 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home size={14} />
          <span>Return to Homepage</span>
        </Link>

      </div>
    </main>
  );
}
