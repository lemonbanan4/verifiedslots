"use client";

import React, { useState } from "react";
import { useCompliance } from "@/src/context/ComplianceContext";
import { OutboundLink } from "./OutboundLink";
import { HelpCircle, ShieldCheck, ShieldAlert } from "lucide-react";

interface OutboundLinkWithTooltipProps {
  affiliateUrl: string;
  isLicensedInNL: boolean;
  isKsaLicensed: boolean;
  licenseType: string;
  name: string;
  welcomeBonus: string;
  className?: string;
  children: React.ReactNode;
}

export function OutboundLinkWithTooltip({
  affiliateUrl,
  isLicensedInNL,
  isKsaLicensed,
  licenseType,
  name,
  className = "",
  children,
}: OutboundLinkWithTooltipProps) {
  const { visitorProfile } = useCompliance();
  const [showTooltip, setShowTooltip] = useState(false);

  const isNl = visitorProfile === "Local";

  // Determine dynamic compliance status text
  let statusText = "";
  let tooltipTitle = "";
  let isCompliant = false;

  if (isNl) {
    if (isKsaLicensed) {
      statusText = `✓ KSA Gereguleerd: ${name} is wettelijk toegestaan door de Kansspelautoriteit om spelers uit Nederland te accepteren.`;
      tooltipTitle = "Veilige Verbinding";
      isCompliant = true;
    } else {
      statusText = `⚠️ Geen KSA-vergunning: Toegang is voor inwoners van Nederland niet toegestaan. Geen consumentenbescherming.`;
      tooltipTitle = "Waarschuwing";
      isCompliant = false;
    }
  } else {
    // International visitor
    if (licenseType === "mga") {
      statusText = `✓ MGA Licensed: Solvency checked under EU rules. Available for global players.`;
      tooltipTitle = "Compliant Gateway";
      isCompliant = true;
    } else if (licenseType === "curacao") {
      statusText = `✓ Offshore Licensed: Available for global players. High deposit limits.`;
      tooltipTitle = "Compliant Gateway";
      isCompliant = true;
    } else {
      statusText = `⚠️ KSA Regulated: Exclusively structured for Netherlands market players.`;
      tooltipTitle = "Compliance Warning";
      isCompliant = false;
    }
  }

  return (
    <div className="relative flex flex-col items-center md:items-end gap-1.5 shrink-0 select-none">
      
      {/* Tooltip Hover Area */}
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <OutboundLink
          href={affiliateUrl}
          className={className}
        >
          {children}
        </OutboundLink>

        {/* Floating Tooltip Bubble */}
        {showTooltip && (
          <div className="absolute z-50 bottom-full mb-2 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 w-64 bg-slate-900/95 border border-white/10 p-3 rounded-xl shadow-2xl text-left optimize-gpu">
            <div className="flex gap-2 items-start">
              {isCompliant ? (
                <ShieldCheck className="text-emerald-450 shrink-0 mt-0.5" size={14} />
              ) : (
                <ShieldAlert className="text-rose-455 shrink-0 mt-0.5" size={14} />
              )}
              <div>
                <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">
                  {tooltipTitle}
                </p>
                <p className="text-[9px] text-slate-350 leading-relaxed font-medium">
                  {statusText}
                </p>
              </div>
            </div>
            <div className="absolute top-full right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 w-2 h-2 bg-slate-900 border-r border-b border-white/10 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Tiny descriptive badge below the button (mobile friendly) */}
      <span className="flex items-center gap-1 text-[9px] text-slate-450 font-bold uppercase tracking-wider">
        <HelpCircle size={10} className="text-slate-500" />
        {isCompliant ? (
          <span className="text-emerald-500">{isNl ? "✓ Veilige Gateway" : "✓ Safe Gateway"}</span>
        ) : (
          <span className="text-rose-500">{isNl ? "⚠️ Beperkte Regio" : "⚠️ Restricted Geo"}</span>
        )}
      </span>

    </div>
  );
}
