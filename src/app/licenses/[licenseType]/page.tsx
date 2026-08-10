import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAllCasinos } from "@/src/lib/auditService";
import { LicensesContent } from "@/src/components/LicensesContent";
import { REGULATOR_KEYS, getRegulatorMeta, isLicenseType } from "@/src/data/regulators";

interface LicensePageProps {
  params: Promise<{
    licenseType: string;
  }>;
}

// Generate dynamic metadata for SEO based on the active license type/jurisdiction
export async function generateMetadata({ params }: LicensePageProps): Promise<Metadata> {
  const { licenseType } = await params;

  if (!isLicenseType(licenseType)) {
    return {
      title: "VerifiedSlots - Independent Licensing Audits",
      description: "Independent compliance evaluations of regulated and offshore iGaming platforms.",
    };
  }

  const meta = getRegulatorMeta(licenseType);
  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
  };
}

export default async function LicensePage({ params }: LicensePageProps) {
  const { licenseType } = await params;

  if (!isLicenseType(licenseType)) {
    notFound();
  }

  const casinosList = await fetchAllCasinos();

  return <LicensesContent licenseType={licenseType} casinos={casinosList} />;
}

// Generate static parameters for static site generation
export async function generateStaticParams() {
  return REGULATOR_KEYS.map((licenseType) => ({ licenseType }));
}
