import React from "react";
import type { Metadata } from "next";
import { EditorialPolicy } from "@/src/views/editorial-policy";

export const metadata: Metadata = {
  title: "Editorial Policy & Scorecard Methodology - VerifiedSlots",
  description: "Read our rigorous testing guidelines. Learn how we verify house edge configuration, audit payout processing times, and rate regulatory compliance.",
};

export default function EditorialPolicyPage() {
  return <EditorialPolicy />;
}
