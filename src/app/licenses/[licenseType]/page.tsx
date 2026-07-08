import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAllCasinos } from "@/src/lib/auditService";
import { LicensesContent } from "@/src/components/LicensesContent";

interface LicensePageProps {
  params: Promise<{
    licenseType: string;
  }>;
}

// Generate dynamic metadata for SEO based on the active license type/jurisdiction
export async function generateMetadata({ params }: LicensePageProps): Promise<Metadata> {
  const { licenseType } = await params;

  let title = "";
  let description = "";

  if (licenseType === "ksa") {
    title = "KSA Licensed Casinos - Compliance Audits & Reviews";
    description = "Compare online casinos officially licensed by the Dutch Kansspelautoriteit (KSA) under the Remote Gambling Act (Wet Koa). Read independent reviews.";
  } else if (licenseType === "mga") {
    title = "MGA Regulated Casinos - European Standards Compliance";
    description = "Audit reports and safety evaluations of gaming platforms licensed by the Malta Gaming Authority (MGA). Analyze payout metrics and wagering terms.";
  } else if (licenseType === "curacao") {
    title = "Curaçao Offshore Casinos - Independent Risk Assessments";
    description = "Read compliance reports and consumer safety evaluations of international gaming operators licensed under Curaçao eGaming master permits.";
  } else {
    title = "VerifiedSlots - Independent Licensing Audits";
    description = "Independent compliance evaluations of regulated and offshore iGaming platforms.";
  }

  return {
    title,
    description,
  };
}

export default async function LicensePage({ params }: LicensePageProps) {
  const { licenseType } = await params;

  // Validate licenseType
  const validLicenses = ["ksa", "mga", "curacao"];
  if (!validLicenses.includes(licenseType)) {
    notFound();
  }

  const casinosList = await fetchAllCasinos();

  return <LicensesContent licenseType={licenseType} casinos={casinosList} />;
}

// Generate static parameters for static site generation
export async function generateStaticParams() {
  return [
    { licenseType: "ksa" },
    { licenseType: "mga" },
    { licenseType: "curacao" },
  ];
}
