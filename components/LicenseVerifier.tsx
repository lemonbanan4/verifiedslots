"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, Info, X, ShieldAlert, Award, FileText } from "lucide-react";
import { getRegulatorMeta } from "@/src/data/regulators";

interface LicenseVerifierProps {
  licenseType: string;
  licenseNumber: string;
  className?: string;
}

export function LicenseVerifier({ licenseType, licenseNumber, className = "" }: LicenseVerifierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Determine license attributes from the shared regulator registry. An
  // unrecognized licenseType gets a neutral "data unavailable" state rather
  // than a specific offshore/high-risk claim we haven't actually verified.
  const meta = getRegulatorMeta(licenseType);
  const name = `${meta.fullName}${meta.shortLabel !== "N/A" ? ` (${meta.shortLabel})` : ""} - ${meta.jurisdictionLabel}`;
  const status = meta.status;
  const guarantees = meta.guarantees;
  const risks = meta.risks;

  const modalContent = isOpen && mounted && (
    <div className="fixed inset-0 z-[99999] overflow-y-auto p-4 bg-slate-950/95 backdrop-blur-md optimize-gpu animate-fade-in flex justify-center items-center" onClick={() => setIsOpen(false)}>
      <div 
        className="relative w-full max-w-lg bg-slate-900 rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Trigger */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className={`p-2.5 rounded-xl ${meta.colors.badgeBg} ${meta.colors.badgeText}`}>
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-md font-bold text-white tracking-tight">{name}</h3>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">{status}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-5 text-left">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold flex items-center gap-1.5 mb-2.5">
              <ShieldCheck className="text-emerald-400" size={13} /> Gained Guarantees
            </span>
            <ul className="space-y-2">
              {guarantees.map((item, i) => (
                <li key={i} className="text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/5 pt-4">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold flex items-center gap-1.5 mb-2.5">
              <ShieldAlert className="text-amber-400" size={13} /> Risks & Disadvantages
            </span>
            <ul className="space-y-2">
              {risks.map((item, i) => (
                <li key={i} className="text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* License Specs */}
          <div className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 mt-2 flex justify-between items-center text-[10px]">
            <div className="flex items-center gap-1.5">
              <FileText size={12} className="text-slate-400" />
              <span className="text-slate-450 font-bold uppercase tracking-wider">Credentials Ref:</span>
            </div>
            <span className="font-mono text-white font-bold">{licenseNumber || "N/A"}</span>
          </div>
        </div>

        {/* Footer button */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 py-2.5 bg-blue-500 hover:bg-blue-450 text-slate-950 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Acknowledge Verification
        </button>

      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${className}`}
        title="Check license guarantees"
        aria-label="Verify regulatory license guarantees"
      >
        <Info size={12} />
        <span>License Guarantees</span>
      </button>

      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
