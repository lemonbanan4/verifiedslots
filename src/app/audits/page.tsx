"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Shield,
  AlertTriangle,
  Clock,
  ArrowLeft,
  FileText,
  Filter,
  User,
  X,
  Search,
  HelpCircle,
  Coins,
  Flame,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { Audit, AuditCategory } from "@/src/types/audit";
import auditsData from "@/src/data/audits.json";
import { ComplianceSeal } from "@/components/ComplianceSeal";
import { AuditModal } from "@/components/AuditModal";
import { casinos } from "@/src/data/casinos";
import { CasinoCard } from "@/components/CasinoCard";
import { useCompliance } from "@/src/context/ComplianceContext";

const audits = auditsData as Audit[];

// ─── Main Tabs Config ────────────────────────────────────────────────────────
type MainTabKey = "directory" | "archive";

// ─── Filter config for Archive ───────────────────────────────────────────────
type FilterKey = "All" | "Math & RNG" | "Solvency" | "Strategy" | "Regulatory";

const FILTERS: { key: FilterKey; label: string; categories: AuditCategory[] }[] = [
  { key: "All", label: "All Audits", categories: [] },
  {
    key: "Math & RNG",
    label: "Math & RNG",
    categories: ["Math & RNG Auditing"],
  },
  {
    key: "Solvency",
    label: "Solvency",
    categories: [
      "Strategy & Solvency",
      "Regulatory Compliance & Risk Management",
      "Regulatory Oversight & Wagering Liability",
    ],
  },
  {
    key: "Strategy",
    label: "Strategy",
    categories: ["Strategy & Solvency"],
  },
  {
    key: "Regulatory",
    label: "Regulatory",
    categories: [
      "Regulatory Compliance & Risk Management",
      "Regulatory Oversight & Wagering Liability",
    ],
  },
];

// ─── Compliance tier helper for Archive ──────────────────────────────────────
type TierConfig = {
  label: "Certified" | "Verified" | "Caution";
  color: string;
  bg: string;
  border: string;
  bar: string;
  glow: string;
  icon: React.ElementType;
};

function getTier(score: number): TierConfig {
  if (score >= 80)
    return {
      label: "Certified",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      bar: "bg-emerald-500",
      glow: "0 0 12px rgba(16,185,129,0.35)",
      icon: ShieldCheck,
    };
  if (score >= 60)
    return {
      label: "Verified",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      bar: "bg-blue-500",
      glow: "0 0 12px rgba(59,130,246,0.35)",
      icon: Shield,
    };
  return {
    label: "Caution",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    bar: "bg-amber-500",
    glow: "0 0 12px rgba(245,158,11,0.35)",
    icon: AlertTriangle,
  };
}

// ─── Category Icon & Color Mapping ───────────────────────────────────────────
const categoryIconMap: Record<AuditCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  "Math & RNG Auditing": Coins,
  "Strategy & Solvency": Flame,
  "Regulatory Compliance & Risk Management": Shield,
  "Regulatory Oversight & Wagering Liability": ShieldCheck,
};

const categoryColorMap: Record<AuditCategory, string> = {
  "Math & RNG Auditing": "text-amber-400",
  "Strategy & Solvency": "text-rose-400",
  "Regulatory Compliance & Risk Management": "text-amber-500",
  "Regulatory Oversight & Wagering Liability": "text-emerald-400",
};

// ─── Card component for Archive ─────────────────────────────────────────────
function AuditCard({ audit, onSelect }: { audit: Audit; onSelect: () => void }) {
  const tier = getTier(audit.complianceScore);
  const approved = audit.status === "Editorial Approved";
  const CategoryIcon = categoryIconMap[audit.category] || HelpCircle;
  const categoryColor = categoryColorMap[audit.category] || "text-blue-400";

  return (
    <article className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden shadow-xl h-full">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

      <div className="flex-1 flex flex-col">
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2 mb-4 text-[10px] uppercase font-bold tracking-wider">
          <span className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/15 truncate max-w-full whitespace-nowrap">
            <CategoryIcon size={12} className={`${categoryColor} shrink-0`} />
            <span className="truncate whitespace-nowrap">{audit.category}</span>
          </span>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock size={11} />
              <span>{audit.readTime}</span>
            </div>
            {audit.complianceScore !== undefined && (
              <ComplianceSeal score={audit.complianceScore} size="sm" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-white mb-2 leading-snug min-h-[2.8rem] line-clamp-2">
          {audit.title}
        </h2>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
          <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
            <User size={12} className="text-blue-400" />
          </div>
          <div className="text-[10px] leading-tight">
            <p className="text-slate-200 font-bold">{audit.author}</p>
            <p className="text-slate-500">{audit.authorRole}</p>
          </div>
          <span className="ml-auto text-[10px] text-slate-650 font-bold">{audit.date}</span>
        </div>

        {/* Summary */}
        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1">
          {audit.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto space-y-3">
        {/* Status + action button */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-bold tracking-wider pt-1 flex-wrap sm:flex-nowrap">
          {approved ? (
            <span className="flex items-center gap-1 text-emerald-400 shrink-0">
              <ShieldCheck size={11} /> Editorial Approved
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400 shrink-0">
              <Clock size={11} /> Pending Review
            </span>
          )}

          {/* Visit Operator (rendered in the middle if affiliateLink exists) */}
          {audit.affiliateLink && audit.affiliateLink.trim().length > 0 && (
            <a
              href={audit.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-350 font-bold transition-all px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-[9px] uppercase tracking-wider whitespace-nowrap"
            >
              Visit Operator <ExternalLink size={10} />
            </a>
          )}

          {/* Primary Action is always Read Audit */}
          <button
            onClick={onSelect}
            type="button"
            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-350 font-bold transition-colors cursor-pointer border-none bg-transparent focus:outline-none text-[9px] uppercase tracking-wider whitespace-nowrap"
          >
            Read Full Audit <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AuditsPage() {
  const { isDutch } = useCompliance();
  const [activeTab, setActiveTab] = useState<MainTabKey>("directory");

  // State for Directory Tab
  const [activeLicenseFilter, setActiveLicenseFilter] = useState<"All" | "ksa" | "mga" | "ukgc">("All");

  // Reset active license filter if user is Dutch and it's set to non-KSA
  useEffect(() => {
    if (isDutch && activeLicenseFilter !== "ksa") {
      setActiveLicenseFilter("ksa");
    }
  }, [isDutch, activeLicenseFilter]);

  // State for Archive Tab
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  // Shared Search State
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

  // Filtered Casinos list
  const filteredCasinos = useMemo(() => {
    let list = casinos;

    if (isDutch) {
      list = list.filter((c) => c.licenseType === "ksa");
    } else if (activeLicenseFilter !== "All") {
      list = list.filter((c) => c.licenseType === activeLicenseFilter);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          c.welcomeBonus.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeLicenseFilter, searchQuery, isDutch]);

  // Filtered Archive Audits list
  const filteredAudits = useMemo(() => {
    let list = audits;

    const config = FILTERS.find((f) => f.key === activeFilter)!;
    if (config.categories.length > 0) {
      list = list.filter((a) => config.categories.includes(a.category));
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeFilter, searchQuery]);

  // General Database Statistics
  const totalCasinos = casinos.length;
  const totalAudits = audits.length;
  const ksaLicensedCount = casinos.filter((c) => c.licenseType === "ksa").length;

  return (
    <div className="flex flex-col gap-8 py-2">
      {/* Page header */}
      <section className="glass-card rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[60%] bg-indigo-500/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[60%] bg-blue-500/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors mb-6"
          >
            <ArrowLeft size={12} /> Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <FileText size={11} />
                Independent Auditing Desk
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white leading-tight tracking-tight">
                Compliance{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Database & Audits
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
                Objective, data-driven analysis of licensed operators. Toggle below to browse our casino compliance reviews or access deep-dive solvency and mathematical audit archives.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 shrink-0 text-left">
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Verified Reviews</span>
                <p className="text-xl font-black text-white font-mono">{totalCasinos}</p>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Audit Reports</span>
                <p className="text-xl font-black text-indigo-400 font-mono">{totalAudits}</p>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">KSA Regulated</span>
                <p className="text-xl font-black text-emerald-400 font-mono">{ksaLicensedCount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Switcher — Segmented Premium Design */}
      <div className="flex justify-center border-b border-white/10">
        <div className="flex gap-8">
          <button
            onClick={() => {
              setActiveTab("directory");
              setSearchQuery(""); // Reset search on tab switch
            }}
            className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "directory"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Compliance Directory
            <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono ${
              activeTab === "directory" ? "bg-blue-500/20 text-blue-300" : "bg-white/5 text-slate-500"
            }`}>
              {totalCasinos}
            </span>
          </button>
          <button
            onClick={() => {
              setActiveTab("archive");
              setSearchQuery(""); // Reset search on tab switch
            }}
            className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "archive"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Journalistic Audit Archive
            <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono ${
              activeTab === "archive" ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-slate-500"
            }`}>
              {totalAudits}
            </span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/20 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
        {/* Category Filters (Dynamic Based on activeMainTab) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2">
            <Filter size={11} />
            Filter
          </div>

          {activeTab === "directory" ? (
            // Compliance Directory License Filters
            <>
              {(isDutch ? (["ksa"] as const) : (["All", "ksa", "mga", "ukgc"] as const)).map((license) => (
                <button
                  key={license}
                  onClick={() => setActiveLicenseFilter(license)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    activeLicenseFilter === license
                      ? "bg-blue-600 border-blue-500/40 text-white shadow-[0_0_16px_rgba(59,130,246,0.3)]"
                      : "bg-white/5 border-white/8 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {license === "All" ? "All Licenses" : license.toUpperCase()}
                  <span className={`ml-2 font-mono ${activeLicenseFilter === license ? "text-blue-200" : "text-slate-600"}`}>
                    {license === "All"
                      ? casinos.length
                      : casinos.filter((c) => c.licenseType === license).length}
                  </span>
                </button>
              ))}
            </>
          ) : (
            // Journalistic Audit Archive Category Filters
            <>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    activeFilter === f.key
                      ? "bg-indigo-600 border-indigo-500/40 text-white shadow-[0_0_16px_rgba(99,102,241,0.3)]"
                      : "bg-white/5 border-white/8 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 font-mono ${activeFilter === f.key ? "text-indigo-200" : "text-slate-600"}`}>
                    {f.categories.length === 0
                      ? audits.length
                      : audits.filter((a) => f.categories.includes(a.category)).length}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xl">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "directory"
                ? "Search operators by name or domain..."
                : "Search audits by title..."
            }
            className="w-full bg-white/5 border border-white/8 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium py-2"
            style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer border-none bg-transparent"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Grid Content Panel */}
      {activeTab === "directory" ? (
        // Grid for Compliance Directory (Casinos)
        filteredCasinos.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-500">
            <Shield className="mx-auto mb-3 opacity-30" size={32} />
            <p className="text-sm font-bold">No operators matching your search criteria were found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredCasinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))}
          </div>
        )
      ) : (
        // Grid for Journalistic Audit Archive
        filteredAudits.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-500">
            <FileText size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-bold">No audits matching your search criteria were found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredAudits.map((audit) => (
              <AuditCard key={audit.id} audit={audit} onSelect={() => setSelectedAudit(audit)} />
            ))}
          </div>
        )
      )}

      {/* Audit Detail Modal */}
      <AuditModal audit={selectedAudit} onClose={() => setSelectedAudit(null)} />
    </div>
  );
}
