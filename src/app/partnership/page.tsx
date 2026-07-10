import React from "react";
import type { Metadata } from "next";
import { Partnership } from "@/src/views/partnership";

export const metadata: Metadata = {
  title: "Partnerships - Independent Compliance Audits for Operators - VerifiedSlots",
  description: "Partner with VerifiedSlots' independent compliance audit desk. Earn the Compliance Seal, increase player trust and LTV, and align with our RNG, licensing, and solvency audit methodology.",
};

export default function PartnershipPage() {
  return <Partnership />;
}
