"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { isAffiliateOfferAvailable } from "@/src/data/casinos";
import { getRegulatorMeta } from "@/src/data/regulators";
import { useCompliance } from "@/src/context/ComplianceContext";

interface AuditButtonProps {
  /** Optional affiliate redirect link to visit the operator directly */
  affiliateLink?: string;
  /**
   * Country codes the offer is approved for. When set, the affiliate CTA is
   * only rendered for visitors in those countries. Omit if unrestricted.
   */
  affiliateGeos?: string[];
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
  affiliateGeos,
  isPartner = false,
  licenseType = "mga",
  onClick,
  variant = "block",
  className = "",
}: AuditButtonProps) {
  const { countryCode } = useCompliance();
  const hasAffiliate = isAffiliateOfferAvailable(
    { affiliateUrl: affiliateLink || "", affiliateGeos, isPartner },
    countryCode,
  );

  if (variant === "inline") {
    if (hasAffiliate) {
      return (
        <a
          href={affiliateLink}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
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
    const buttonColorClass = getRegulatorMeta(licenseType).colors.auditButtonClass;

    return (
      <a
        href={affiliateLink}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
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
