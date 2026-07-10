import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface AuditButtonProps {
  /** Optional affiliate redirect link to visit the operator directly */
  affiliateLink?: string;
  /** Boolean flag to indicate whether the operator has a signed partner contract */
  isPartner?: boolean;
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
        Request Compliance Audit <ArrowRight size={12} />
      </Link>
    );
  }

  // Block style (large card button)
  if (hasAffiliate) {
    return (
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(16,185,129,0.18)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] border border-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-955 ${className}`}
      >
        Visit Operator <ExternalLink size={13} />
      </a>
    );
  }

  return (
    <Link
      href="/contact"
      className={`w-full py-3 px-4 bg-blue-400 hover:bg-blue-350 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(56,189,248,0.18)] hover:shadow-[0_4px_25px_rgba(56,189,248,0.4)] border border-blue-400/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-955 ${className}`}
    >
      Request Compliance Audit <ArrowRight size={13} />
    </Link>
  );
}
