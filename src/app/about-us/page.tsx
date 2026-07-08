import React from "react";
import type { Metadata } from "next";
import { AboutUs } from "@/src/views/about-us";

export const metadata: Metadata = {
  title: "About Us - Independent Compliance Audits & Team - VerifiedSlots",
  description: "Learn about the independent auditing desk, regulatory analyst specialists, and developer-led rating methodology behind VerifiedSlots.",
};

export default function AboutUsPage() {
  return <AboutUs />;
}
