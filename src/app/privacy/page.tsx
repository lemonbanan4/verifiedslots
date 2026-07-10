import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - VerifiedSlots",
  description: "Read the privacy policy for VerifiedSlots.com, operated by CogCore LLC.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="glass-card rounded-3xl p-8 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-widest font-bold">Last updated: July 7, 2026</p>
        
        <div className="space-y-6 text-sm text-slate-350 leading-relaxed font-medium">
          <p>
            At VerifiedSlots.com (operated by CogCore LLC), we respect your privacy and are committed to protecting any personal data we collect. This Privacy Policy outlines how we handle information when you visit our independent compliance auditing directory.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">1. Information We Collect</h2>
          <p>
            We do not require user account registration. We may collect non-personal analytics data, such as browser type, geographical region, and pages visited, to optimize our compliance scoring dashboard and geographic filtering.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">2. Outbound Links & Third-Party Cookies</h2>
          <p>
            VerifiedSlots contains outbound links to licensed gaming operators. Once you click these links, you will be redirected to third-party platforms which operate under their own privacy guidelines. These platforms may utilize tracking cookies for affiliate attribution.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">3. Data Controller</h2>
          <p>
            For the purposes of the GDPR and other applicable data protection laws, the data controller is CogCore LLC, located at 30 N Gould St Ste R, Sheridan, WY 82801, USA.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">4. Contacting Us</h2>
          <p>
            If you have questions regarding this policy or our data practices, you can reach out via our contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
