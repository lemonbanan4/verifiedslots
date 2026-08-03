import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCasinoBySlug, fetchAllCasinos } from "@/src/lib/auditService";
import { casinoHoldsLicense } from "@/src/data/casinos";
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

  const hasMatchingLicense = !!casino && casinoHoldsLicense(casino, license.toLowerCase());

  if (!casino || !hasMatchingLicense) {
    return {
      title: "Audit Not Found - VerifiedSlots",
      description: "The requested casino compliance audit could not be found.",
    };
  }

  // Matches ReviewTemplate's own on-page display name correction — "Bet365
  // NL" is only accurate for the KSA (Dutch) jurisdiction; the tab title
  // shouldn't say "NL" while viewing the MGA/UKGC audit for the same brand.
  const name = casino.name === "Bet365 NL" && license.toLowerCase() !== "ksa"
    ? "Bet365"
    : casino.name;
  const jurisdiction = license.toUpperCase();
  const title = `${name} Audit & Compliance Report (${jurisdiction})`;
  const description = `Independent iGaming audit of ${name} (${casino.domain}). Verify safety rating (${casino.rating}), regulatory license status, welcome offer wagering terms (${casino.wagering}), and payment solvency.`;

  return {
    title,
    description,
    alternates: {
      // Casinos with multiple license types (e.g. LuckyNiki holds both UKGC
      // and MGA) get one static page per license so each regulator's
      // directory can link to a contextually-framed version. All of those
      // variants must canonicalize to the same primary URL or Google treats
      // them as separate duplicate pages competing for crawl budget.
      canonical: `/audits/${casino.licenseType.toLowerCase()}/${slug.toLowerCase()}`,
    },
  };
}

// Server Component: Renders on the server for speed and SEO indexing
export default async function AuditPage({ params }: AuditPageProps) {
  const { license, slug } = await params;
  const casino = await fetchCasinoBySlug(slug);

  // Guard: Verify document exists and license segment matches to avoid duplicate routing
  if (!casino) {
    notFound();
  }

  if (!casinoHoldsLicense(casino, license.toLowerCase())) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href={`/licenses/${license.toLowerCase()}`}
          className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
        >
          ← Back to {license.toUpperCase()} Regulated Directory
        </Link>
      </div>
      <ReviewTemplate review={casino} activeLicenseRoute={license} />
    </div>
  );
}

// Next.js App Router: Equivalent of getStaticPaths to pre-render every audit path
export async function generateStaticParams() {
  const casinosList = await fetchAllCasinos();
  
  const paths: Array<{ license: string; slug: string }> = [];
  casinosList.forEach((casino) => {
    const types = casino.licenseTypes && casino.licenseTypes.length > 0 ? casino.licenseTypes : [casino.licenseType];
    types.forEach((type) => {
      paths.push({
        license: type.toLowerCase(),
        slug: casino.slug.toLowerCase(),
      });
    });
  });
  return paths;
}
