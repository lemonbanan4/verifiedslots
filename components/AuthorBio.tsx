import React from "react";
import Link from "next/link";
import { ShieldCheck, User } from "lucide-react";

interface AuthorBioProps {
  authorName: string;
  authorTitle?: string;
  className?: string;
}

export function AuthorBio({ authorName, authorTitle = "iGaming Compliance Analyst", className = "" }: AuthorBioProps) {
  // Generate initials for avatar fallback
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      {/* Author Avatar with initials & icon badge */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
          {initials || <User size={20} />}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5 border border-slate-900" title="Verified Expert">
          <ShieldCheck size={12} className="text-slate-950 fill-emerald-500" />
        </div>
      </div>

      {/* Author Credentials & Info */}
      <div className="text-center sm:text-left flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h4 className="text-sm font-bold text-white">{authorName}</h4>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{authorTitle}</p>
          </div>

          <Link
            href="/editorial-policy"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider transition-all self-center sm:self-auto cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <ShieldCheck size={12} />
            <span>Verified By CRP</span>
          </Link>
        </div>
        <p className="text-[11px] text-slate-350 leading-relaxed mt-2">
          This review was independently audited and verified for compliance, playthrough calculations, and responsible gambling standards under the VerifiedSlots Editorial Policy.
        </p>
      </div>
    </div>
  );
}
