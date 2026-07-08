import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Globe, User, Linkedin } from "lucide-react";

interface AuthorBoxProps {
  authorName: string;
  authorTitle?: string;
  licenseType: string;
  licenseNumber?: string;
  className?: string;
}

export function AuthorBox({
  authorName,
  authorTitle = "Senior iGaming Compliance Auditor",
  licenseType,
  licenseNumber,
  className = "",
}: AuthorBoxProps) {
  // Generate initials for avatar fallback
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Dynamic license verification destination
  let verificationUrl = "/licenses";
  let verificationText = "Verify Regulatory Index";

  if (licenseType === "ksa") {
    verificationUrl = "https://www.kansspelautoriteit.nl/kansspelwijzer/";
    verificationText = "Verify KSA Kansspelwijzer";
  } else if (licenseType === "mga") {
    verificationUrl = "https://authorisation.mga.org.mt/verification.aspx";
    verificationText = "Verify MGA Register";
  } else if (licenseType === "curacao") {
    verificationUrl = "/licenses/curacao";
    verificationText = "Audit Offshore Registry";
  }

  return (
    <div className={`glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5 relative overflow-hidden optimize-gpu ${className}`}>

      {/* Editorial Specialist Avatar */}
      <div className="relative shrink-0 self-center md:self-auto">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white text-md shadow-lg shadow-blue-500/10">
          {initials || <User size={24} />}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-1 border-2 border-slate-950" title="Senior Auditor">
          <ShieldCheck size={12} className="text-slate-950 fill-emerald-500" />
        </div>
      </div>

      {/* Editor Bio Info */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h4 className="text-md font-bold text-white tracking-tight">{authorName}</h4>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">{authorTitle}</p>
          </div>

          {/* Verification Actions Bar */}
          <div className="flex flex-wrap justify-center gap-2 self-center md:self-auto">
            <Link
              href="/editorial-policy"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <FileText size={12} className="text-blue-400" />
              <span>Editorial Policy</span>
            </Link>

            {/* <a
              href="https://www.linkedin.com/in/igaming-compliance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Linkedin size={12} className="text-indigo-400" />
              <span>LinkedIn</span>
            </a> */}

            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Globe size={12} className="text-blue-400" />
              <span>{verificationText}</span>
            </a>
          </div>
        </div>

        <p className="text-[11px] text-slate-350 leading-relaxed mt-3">
          This review has been compiled and checked by our editorial audit desk. Wagering multipliers, payout solvency ratios, and license credentials (including active license number: <code className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded text-[10px]">{licenseNumber || "N/A"}</code>) were verified in compliance with our rigorous testing framework.
        </p>
      </div>

    </div>
  );
}
