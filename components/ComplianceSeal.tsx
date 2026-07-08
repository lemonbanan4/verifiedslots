import React from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

interface ComplianceSealProps {
  score: number;
  /** Size variant: "sm" (pill for cards) or "lg" (full circular badge for modals) */
  size?: "sm" | "lg";
  className?: string;
}

export function ComplianceSeal({ score, size = "sm", className = "" }: ComplianceSealProps) {
  // Define Tiers
  // > 85 -> Green / Certified
  // 60-85 -> Yellow / Verified
  // < 60 -> Red / Caution
  const getTierDetails = (score: number) => {
    if (score >= 85) {
      return {
        label: "Certified",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/25",
        glow: "shadow-[0_0_15px_rgba(16,185,129,0.25)]",
        icon: ShieldCheck,
        barColor: "#10b981",
      };
    }
    if (score >= 60) {
      return {
        label: "Verified",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/25",
        glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
        icon: AlertTriangle,
        barColor: "#f59e0b",
      };
    }
    return {
      label: "Caution",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/25",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.25)]",
      icon: ShieldAlert,
      barColor: "#ef4444",
    };
  };

  const tier = getTierDetails(score);
  const Icon = tier.icon;

  if (size === "sm") {
    // Elegant pill badge suitable for listing cards
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${tier.bg} ${tier.border} ${tier.glow} transition-all duration-300 ${className}`}
      >
        <Icon size={12} className={tier.color} />
        <span className={`text-[10px] font-black uppercase tracking-wider ${tier.color}`}>
          {tier.label}
        </span>
        <span className="text-white/40 text-[9px] font-bold">|</span>
        <span className="text-white text-xs font-black tabular-nums">
          {score}
        </span>
      </div>
    );
  }

  // Large premium seal badge suitable for modals / detail views
  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl border bg-slate-900/60 backdrop-blur-md ${tier.border} ${tier.glow} ${className}`}>
      {/* Decorative Outer Ring */}
      <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed ${tier.border} animate-[spin_20s_linear_infinite] mb-4`}>
        {/* Glowing Core */}
        <div className={`absolute inset-1 rounded-full flex items-center justify-center border bg-slate-950/80 ${tier.border} shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]`}>
        </div>
      </div>

      {/* Score & Icon positioned absolutely in center of spin ring */}
      <div className="absolute transform -translate-y-9 flex flex-col items-center pointer-events-none">
        <Icon size={26} className={`${tier.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]`} />
      </div>

      <div className="z-10 mt-1">
        <div className="text-3xl font-black text-white leading-none tracking-tight flex items-baseline justify-left">
          <span className={tier.color}>{score}</span>
          <span className="text-xs text-slate-500 font-bold ml-0.5">/85</span>
        </div>
        <p className={`text-xs font-black uppercase tracking-widest mt-1.5 ${tier.color}`}>
          Compliance {tier.label}
        </p>
        <p className="text-[10px] text-slate-400 font-semibold mt-1">
          Independent Solvency Audited
        </p>
      </div>

      {/* Score Bar indicator */}
      <div className="w-full mt-4 space-y-1">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(Math.min(score, 85) / 85) * 100}%`,
              backgroundColor: tier.barColor
            }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-bold text-slate-550 uppercase tracking-widest px-0.5">
          <span>0 (Fail)</span>
          <span>60 (Warn)</span>
          <span>85 (Pass)</span>
        </div>
      </div>
    </div>
  );
}
