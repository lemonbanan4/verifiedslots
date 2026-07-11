import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - VerifiedSlots",
  description: "See exactly which cookies VerifiedSlots.com uses, why, and for how long.",
};

const COOKIES = [
  {
    name: "detected_geo_nl",
    purpose: "Server-set flag recording whether your connection was detected as originating from the Netherlands, so the correct KSA/MGA/UKGC directory and compliance banners are shown.",
    duration: "1 hour",
  },
  {
    name: "simulated_geo_nl",
    purpose: "Only set if you use the geo-location simulator to preview the site as a different visitor profile. Lets that choice persist across page loads.",
    duration: "1 year",
  },
  {
    name: "admin_bypass",
    purpose: "Internal flag used to bypass geo-compliance redirects during editorial review and testing. Not set for ordinary visitors.",
    duration: "Session",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="glass-card rounded-3xl p-8 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6">Cookie Policy</h1>
        <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-widest font-bold">Last updated: July 12, 2026</p>

        <div className="space-y-6 text-sm text-slate-350 leading-relaxed font-medium">
          <p>
            VerifiedSlots.com uses a small, fixed set of cookies — all strictly necessary to operate the site's core jurisdiction-detection and compliance-routing logic. We do not use analytics, advertising, or tracking cookies of our own.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">1. Cookies We Set</h2>
          <div className="space-y-4">
            {COOKIES.map((cookie) => (
              <div key={cookie.name} className="bg-slate-950/40 border border-white/5 rounded-xl p-4">
                <p className="font-mono text-xs text-blue-400 font-bold mb-1">{cookie.name}</p>
                <p className="text-slate-350 mb-2">{cookie.purpose}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Duration: {cookie.duration}</p>
              </div>
            ))}
          </div>

          <h2 className="text-base font-bold text-white mt-6 mb-2">2. Why No Consent Banner?</h2>
          <p>
            Under GDPR and UK PECR, cookies that are strictly necessary to provide a service you've actively requested — such as showing you the correct regulatory directory for your jurisdiction — are exempt from requiring prior consent. Since every cookie above falls into that category, and none are used for tracking, profiling, or advertising, we disclose them here rather than interrupting your visit with a banner that wouldn't offer any meaningful choice.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">3. Third-Party Cookies</h2>
          <p>
            VerifiedSlots contains outbound links to licensed gaming operators. Once you click through to an operator's site, that platform may set its own cookies under its own privacy and cookie policies — these are entirely outside our control. See our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> for more on outbound links.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">4. Managing Cookies</h2>
          <p>
            You can block or delete cookies at any time through your browser settings. Since our cookies are strictly necessary for jurisdiction detection, disabling them may cause the site to default to a general international view rather than your local regulated directory.
          </p>

          <h2 className="text-base font-bold text-white mt-6 mb-2">5. Contacting Us</h2>
          <p>
            If you have questions about this policy, you can reach out via our <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
