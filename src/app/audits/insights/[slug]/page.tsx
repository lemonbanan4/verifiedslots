import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Clock,
  User,
  ArrowLeft,
  ShieldCheck,
  Shield,
  AlertTriangle,
  HelpCircle,
  Coins,
  Flame,
} from "lucide-react";
import type { Audit, AuditCategory, AuditSection } from "@/src/types/audit";
import auditsData from "@/src/data/audits.json";
import { AuditButton } from "@/components/AuditButton";

const audits = auditsData as Audit[];

interface AuditInsightPageProps {
  params: Promise<{
    slug: string;
  }>;
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

// ─── Compliance Tier System ───────────────────────────────────────────────────
type ComplianceTier = {
  label: "Certified" | "Verified" | "Caution";
  color: string;
  bg: string;
  border: string;
  bar: string;
  glow: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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

// 1. Next.js Dynamic Metadata Injection
export async function generateMetadata({ params }: AuditInsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const audit = audits.find((a) => a.slug.toLowerCase() === slug.toLowerCase());

  if (!audit) {
    return {
      title: "Audit Not Found - VerifiedSlots",
      description: "The requested compliance audit reports could not be found.",
    };
  }

  // Use dynamic SEO fields from audits.json, falling back to basic fields if not yet generated
  const title = audit.metaTitle || `${audit.title} | Compliance Audit`;
  const description = audit.metaDescription || audit.summary;
  const keywords = audit.keywords || [audit.category, "iGaming compliance", "solvency audit"];

  return {
    title: title.slice(0, 60), // Hard limit to 60 characters for Google standards
    description: description.slice(0, 160), // Hard limit to 160 characters
    keywords: keywords,
    alternates: {
      canonical: `/audits/insights/${slug.toLowerCase()}`,
    },
  };
}

// 2. Server Component for Dynamic Page Rendering
export default async function AuditInsightPage({ params }: AuditInsightPageProps) {
  const { slug } = await params;
  const audit = audits.find((a) => a.slug.toLowerCase() === slug.toLowerCase());

  if (!audit) {
    notFound();
  }

  const CategoryIcon = categoryIconMap[audit.category] || HelpCircle;
  const categoryColor = categoryColorMap[audit.category] || "text-blue-400";
  const tier = getComplianceTier(audit.complianceScore);
  const TierIcon = tier.icon;
  const approved = audit.status === "Editorial Approved";

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/audits"
          className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
        >
          ← Back to Audits Hub
        </Link>
      </div>

      <article className="glass-card rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.03] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none"></div>

        {/* Category Header */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <span className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/15 text-xs font-bold uppercase tracking-wider">
            <CategoryIcon size={14} className={categoryColor} />
            {audit.category}
          </span>
          <div className="flex items-center gap-1.5 text-slate-450 text-xs font-bold">
            <Clock size={13} />
            <span>{audit.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight font-display tracking-tight">
          {audit.title}
        </h1>

        {/* Author / Date Info */}
        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-blue-400 font-bold">
            <User size={18} />
          </div>
          <div className="leading-snug">
            <p className="text-slate-200 font-bold text-sm">{audit.author}</p>
            <p className="text-slate-500 font-medium text-xs">{audit.authorRole}</p>
          </div>
          <span className="text-slate-400 ml-auto text-xs font-bold">{audit.date}</span>
        </div>

        {/* Main Body Sections */}
        <div className="space-y-6 text-slate-300 leading-relaxed pb-8 border-b border-white/10">
          {audit.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              {section.heading && (
                <h2 className="text-lg font-bold text-white mt-8 flex items-center gap-2">
                  <Shield size={18} className="text-blue-400" />
                  {section.heading}
                </h2>
              )}
              <p
                className="text-sm md:text-base text-slate-300 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Panel — Compliance Metrics + Affiliation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Compliance Score Widget */}
          <div className={`rounded-2xl border p-5 ${tier.bg} ${tier.border}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Compliance Score</p>
                <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${tier.color}`}>
                  <TierIcon size={14} />
                  {tier.label}
                </span>
              </div>
              <span className={`text-3xl font-black tabular-nums leading-none ${tier.color}`} style={{ textShadow: tier.glow }}>
                {audit.complianceScore}
                <span className="text-sm font-bold text-slate-500">/85</span>
              </span>
            </div>
            <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${(Math.min(audit.complianceScore, 85) / 85) * 100}%`,
                  backgroundColor: audit.complianceScore >= 85 ? "#10b981" : audit.complianceScore >= 60 ? "#f59e0b" : "#ef4444"
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[8px] font-bold text-slate-650 uppercase tracking-wider">
              <span>0 — Caution</span>
              <span>60 — Verified</span>
              <span>85 — Certified</span>
            </div>
          </div>

          {/* Action Call to Action */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-wider">
              {approved ? (
                <>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={16} /> Editorial Approved
                  </span>
                  <span>• Verification Active</span>
                </>
              ) : (
                <>
                  <span className="text-amber-400 flex items-center gap-1">
                    <Clock size={16} /> Pending Review
                  </span>
                  <span>• Under Assessment</span>
                </>
              )}
            </div>

            <AuditButton
              affiliateLink={audit.affiliateLink}
              variant="block"
            />
          </div>
        </div>
      </article>
    </div>
  );
}

// 3. Next.js static rendering optimization (equivalent to getStaticPaths)
export async function generateStaticParams() {
  return audits.map((audit) => ({
    slug: audit.slug.toLowerCase(),
  }));
}
