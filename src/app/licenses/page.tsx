import React from "react";
import type { Metadata } from "next";
import { fetchAllCasinos } from "@/src/lib/auditService";
import { PillarPageContent } from "@/components/PillarPageContent";

export const metadata: Metadata = {
  title: "iGaming Licensing & Regulatory Compliance Hub - VerifiedSlots",
  description: "Independent audit reports and compliance indexes for regulated (KSA, MGA) and offshore (Curaçao) online casinos. Review playthrough mathematics and consumer safety.",
};

export default async function PillarPage() {
  const casinosList = await fetchAllCasinos();
  return <PillarPageContent casinos={casinosList} />;
}
