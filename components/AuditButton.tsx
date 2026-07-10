import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface AuditButtonProps {
  /** Optional affiliate redirect link to visit the operator directly */
  affiliateLink?: string;
  /** Boolean flag to indicate whether the operator has a signed partner contract */
  isPartner?: boolean;
  /** License jurisdiction held by this operator (e.g. ksa, mga, curacao) */
  licenseType?: string;
  /** Triggered when the button is clicked and there is no affiliate link */
  onClick?: () => void;
  /** Visual presentation style: "block" (large card button) or "inline" (small text button) */
  variant?: "block" | "inline";
  /** Optional extra Tailwind class names */
  className?: string;
}

export function AuditButton({
  affiliateLink,
  isPartner = false,
  licenseType = "mga",
  onClick,
  variant = "block",
  className = "",
}: AuditButtonProps) {
  const hasAffiliate = isPartner && !!affiliateLink && affiliateLink.trim().length > 0;

  if (variant === "inline") {
    if (hasAffiliate) {
      return (
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-emerald-450 hover:text-emerald-300 font-bold transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 py-0.5 ${className}`}
        >
          Visit Operator <ExternalLink size={12} />
        </a>
      );
    }

    return (
      <Link
        href="/contact"
        className={`inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-355 font-bold transition-colors cursor-pointer focus:outline-none ${className}`}
      >
        Request Audit <ArrowRight size={12} />
      </Link>
    );
  }

  // Block style (large card button)
  if (hasAffiliate) {
    let buttonColorClass = "";
    if (licenseType === "ksa") {
      buttonColorClass = "bg-emerald-500 hover:bg-emerald-450 text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.18)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] border border-emerald-500/20 focus:ring-emerald-500";
    } else if (licenseType === "mga") {
      buttonColorClass = "bg-sky-500 hover:bg-sky-450 text-slate-955 shadow-[0_4px_20px_rgba(14,165,233,0.18)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.4)] border border-sky-500/20 focus:ring-sky-500";
    } else {
      buttonColorClass = "bg-amber-400 hover:bg-amber-350 text-slate-955 shadow-[0_4px_20px_rgba(245,158,11,0.18)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] border border-amber-500/20 focus:ring-amber-500";
    }

    return (
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-955 ${buttonColorClass} ${className}`}
      >
        Visit Operator <ExternalLink size={13} />
      </a>
    );
  }

  return (
    <Link
      href="/contact"
      className={`w-full py-3 px-4 bg-blue-950/60 hover:bg-blue-900 text-blue-200 rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(59,130,246,0.18)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)] border border-blue-500/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-955 ${className}`}
    >
      Request Audit <ArrowRight size={13} />
    </Link>
  );
}
