"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  User,
  FileText,
  ShieldCheck,
  ArrowRight,
  X,
  Coins,
  Flame,
  TrendingUp,
  Shield,
  BookOpen,
  HelpCircle,
  LucideIcon,
  ChevronDown,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

import type { Audit, AuditSection, AuditCategory } from "@/src/types/audit";
import auditsData from "@/src/data/audits.json";
import { ComplianceSeal } from "./ComplianceSeal";
import { AuditModal } from "./AuditModal";

const FALLBACK_ARTICLES = auditsData as Audit[];

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

const iconMap: Record<string, LucideIcon> = {
  Coins,
  Flame,
  TrendingUp,
  Shield,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
};

// ─── Compliance Tier System ───────────────────────────────────────────────────
// Formula: score ≥ 80 → Certified | 60–79 → Verified | < 60 → Caution
type ComplianceTier = {
  label: "Certified" | "Verified" | "Caution";
  color: string;          // Tailwind text colour
  bg: string;             // Tailwind bg colour (badge fill)
  border: string;         // Tailwind border colour
  bar: string;            // Tailwind bar fill colour
  glow: string;           // inline box-shadow glow
  icon: LucideIcon;
};

function getComplianceTier(score: number): ComplianceTier {
  if (score >= 80) {
    return {
      label: "Certified",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      bar: "bg-emerald-500",
      glow: "0 0 12px rgba(16,185,129,0.35)",
      icon: ShieldCheck,
    };
  }
  if (score >= 60) {
    return {
      label: "Verified",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      bar: "bg-blue-500",
      glow: "0 0 12px rgba(59,130,246,0.35)",
      icon: Shield,
    };
  }
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
// ─────────────────────────────────────────────────────────────────────────────

export function JournalisticInsights({ limit }: { limit?: number } = {}) {
  const [articles, setArticles] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Audit | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/insights");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to load insights, falling back to static content:", err);
        setArticles(FALLBACK_ARTICLES);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card rounded-3xl p-6 h-[400px] flex flex-col justify-between animate-pulse border border-white/5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-white/10 rounded w-24"></div>
                <div className="h-4 bg-white/10 rounded w-16"></div>
              </div>
              <div className="h-7 bg-white/10 rounded w-full"></div>
              <div className="h-7 bg-white/10 rounded w-3/4"></div>
              <div className="h-12 bg-white/10 rounded-lg w-full mt-4"></div>
            </div>
            <div className="h-11 bg-white/10 rounded-xl w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {displayedArticles.map((article, index) => {
          const CardIcon = categoryIconMap[article.category] || HelpCircle;
          const categoryColor = categoryColorMap[article.category] || "text-blue-400";
          const approved = article.status === "Editorial Approved";
          return (
            <article
              key={index}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden optimize-gpu shadow-xl animate-bento-entry h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta details */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-[10px] uppercase font-bold tracking-wider">
                    <span className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/15 truncate max-w-full whitespace-nowrap">
                      <CardIcon size={12} className={`${categoryColor} shrink-0`} />
                      <span className="truncate whitespace-nowrap">{article.category}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={11} />
                        <span>{article.readTime}</span>
                      </div>
                      {article.complianceScore !== undefined && (
                        <ComplianceSeal score={article.complianceScore} size="sm" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight min-h-[3.5rem] flex items-center">
                    {article.title}
                  </h3>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] text-blue-400 font-bold">
                      <User size={12} />
                    </div>
                    <div className="text-[10px] leading-tight">
                      <p className="text-slate-200 font-bold">{article.author}</p>
                      <p className="text-slate-500 font-medium">{article.authorRole}</p>
                    </div>
                    <span className="text-slate-750 ml-auto">{article.date}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-350 leading-relaxed mb-6 font-medium line-clamp-3 min-h-[3rem]">
                    {article.summary}
                  </p>
                </div>

                {/* Reusable Audit Button */}
                <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                  {/* Data-driven Editorial Status Badge */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-wider">
                    <span className="truncate max-w-[48%] whitespace-nowrap">{article.category}</span>
                    {approved ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <ShieldCheck size={12} /> Editorial Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400">
                        <Clock size={12} /> Pending Review
                      </span>
                    )}
                  </div>

                  {/* Visit Operator Button (in the middle if affiliateLink exists) */}
                  {article.affiliateLink && article.affiliateLink.trim().length > 0 && (
                    <a
                      href={article.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(16,185,129,0.15)] border border-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider focus:outline-none"
                    >
                      Visit Operator <ExternalLink size={12} />
                    </a>
                  )}

                  {/* Primary Action Button - Always Read Full Audit */}
                  <button
                    onClick={() => setSelectedArticle(article)}
                    type="button"
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(99,102,241,0.15)] border border-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider focus:outline-none"
                  >
                    Read Full Audit <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Full Audit Detail Modal */}
      <AuditModal audit={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}
