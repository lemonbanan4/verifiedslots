import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCasinoBySlug, fetchAllCasinos } from "@/src/lib/auditService";
import { ReviewTemplate } from "@/components/ReviewTemplate";
import type { Metadata } from "next";

interface AuditPageProps {
  params: Promise<{
    license: string;
    slug: string;
  }>;
}

// Next.js App Router: Dynamic Metadata for SEO & Indexing
export async function generateMetadata({ params }: AuditPageProps): Promise<Metadata> {
  const { license, slug } = await params;
  const casino = await fetchCasinoBySlug(slug);

  if (!casino || casino.licenseType.toLowerCase() !== license.toLowerCase()) {
    return {
      title: "Audit Not Found - VerifiedSlots",
      description: "The requested casino compliance audit could not be found.",
    };
  }

  const name = casino.name;
  const jurisdiction = casino.licenseType.toUpperCase();
  const title = `${name} Audit & Compliance Report (${jurisdiction})`;
  const description = `Independent iGaming audit of ${name} (${casino.domain}). Verify safety rating (${casino.rating}), regulatory license status, welcome offer wagering terms (${casino.wagering}), and payment solvency.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/audits/${license.toLowerCase()}/${slug.toLowerCase()}`,
    },
  };
}

// Server Component: Renders on the server for speed and SEO indexing
export default async function AuditPage({ params }: AuditPageProps) {
  const { license, slug } = await params;
  const casino = await fetchCasinoBySlug(slug);

  // Guard: Verify document exists and license segment matches to avoid duplicate routing
  if (!casino || casino.licenseType.toLowerCase() !== license.toLowerCase()) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href={`/licenses/${casino.licenseType}`}
          className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
        >
          ← Back to {casino.licenseType.toUpperCase()} Regulated Directory
        </Link>
      </div>
      <ReviewTemplate review={casino} />
    </div>
  );
}

// Next.js App Router: Equivalent of getStaticPaths to pre-render every audit path
export async function generateStaticParams() {
  const casinosList = await fetchAllCasinos();
  
  return casinosList.map((casino) => ({
    license: casino.licenseType.toLowerCase(),
    slug: casino.slug.toLowerCase(),
  }));
}
