"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Info, X, ShieldAlert, Award, FileText } from "lucide-react";

interface LicenseVerifierProps {
  licenseType: string;
  licenseNumber: string;
  className?: string;
}

export function LicenseVerifier({ licenseType, licenseNumber, className = "" }: LicenseVerifierProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  // Determine license attributes
  let name = "";
  let status = "";
  let guarantees: string[] = [];
  let risks: string[] = [];

  if (licenseType === "ksa") {
    name = "Kansspelautoriteit (KSA) - Netherlands";
    status = "Highly Regulated (Gold Standard)";
    guarantees = [
      "Mandatory self-exclusion integration with CRUKS to prevent addiction.",
      "Strict segregation of player funds (money is safe even if operator goes banktrupt).",
      "Fairness audits of all RNG games by European-certified test houses.",
      "Local dispute resolution and legal recourse under Dutch Civil Law."
    ];
    risks = [
      "Rigid deposit limits and mandatory registration requirements.",
      "Lacks cryptocurrency payment gateways due to AML compliance regulations."
    ];
  } else if (licenseType === "mga") {
    name = "Malta Gaming Authority (MGA) - Europe";
    status = "Standard Regulated (Standard Trust)";
    guarantees = [
      "Standard financial audit checks and solvency verification.",
      "Standard RNG fairness checks for certified casino suppliers.",
      "Dispute mediation portal offered directly by the MGA board."
    ];
    risks = [
      "No protection under Dutch local civil laws or KSA regulations.",
      "No national CRUKS database checks (separate site-specific limit tools only)."
    ];
  } else {
    name = "Curaçao eGaming - Offshore";
    status = "Offshore Regulated (High Risk)";
    guarantees = [
      "Basic operator background checks.",
      "Supports cryptocurrency deposits and higher transactional limits.",
      "Available globally for players residing in non-regulated jurisdictions."
    ];
    risks = [
      "Zero player protection or dispute arbitration for residents of regulated markets (NL/UK).",
      "Elevated insolvency risks (no guarantee of funds in the event of default).",
      "No mandatory responsible gambling checks or self-exclusion register."
    ];
  }

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

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-slate-950/80 backdrop-blur-md optimize-gpu animate-fade-in flex justify-center items-start md:items-center">
          <div className="my-auto relative w-full max-w-lg glass-card rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl animate-scale-up">
            
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
              <div className={`p-2.5 rounded-xl ${
                licenseType === "ksa"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : licenseType === "mga"
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}>
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
                  <span className="text-slate-400">Credentials Ref:</span>
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
      )}
    </>
  );
}
