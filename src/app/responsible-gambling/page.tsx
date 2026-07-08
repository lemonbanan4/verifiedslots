import React from "react";
import type { Metadata } from "next";
import { ResponsibleGamblingPage as View } from "@/src/views/responsible-gambling";

export const metadata: Metadata = {
  title: "Responsible Gambling Support & Self-Exclusion Directory - VerifiedSlots",
  description: "Find self-exclusion guidance, local support lines (Loket Kansspel, CRUKS), and expert resources to manage gaming limits and play safely.",
};

export default function ResponsibleGamblingPage() {
  return <View />;
}
