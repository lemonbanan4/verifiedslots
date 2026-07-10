import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - VerifiedSlots",
  description: "Read the terms of service for VerifiedSlots.com, operated by CogCore LLC.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="glass-card rounded-3xl p-8 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-widest font-bold">Last updated: July 7, 2026</p>
        
        <div className="space-y-6 text-sm text-slate-350 leading-relaxed font-medium">
          <p>
            Welcome to VerifiedSlots.com. These Terms of Service govern your use of our directory and compliance scoring platform.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">1. Directory Purpose & Disclaimer</h2>
          <p>
            VerifiedSlots is an independent compliance auditing directory. The content provided is for informational purposes only. We verify operator licensing status, fund segregation, and playthrough transparency based on public files and regulatory enforcement records. This information does not constitute financial, legal, or professional advice.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">2. Limitation of Liability</h2>
          <p>
            CogCore LLC does not guarantee operator solvency or play safety. We are not liable for any financial losses incurred on third-party gaming platforms linked from our directory.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">3. Affiliate Disclosure</h2>
          <p>
            User acknowledges that VerifiedSlots receives commissions through outbound affiliate referral links. These sponsorships do not affect the impartiality of our compliance ratings or scoring algorithms.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">4. Company Information</h2>
          <p>
            VerifiedSlots.com is a trade name of CogCore LLC. Registered Office: 30 N Gould St Ste R, Sheridan, WY 82801, USA.
          </p>
        </div>
      </div>
    </div>
  );
}
