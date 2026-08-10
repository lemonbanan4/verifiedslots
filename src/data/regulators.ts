// Single source of truth for every gambling regulator/license jurisdiction
// the site covers. Widening coverage to a new regulator (e.g. Denmark's
// Spillemyndigheden) means adding one key here — every route, nav link,
// sitemap entry, badge, and modal that used to hardcode "ksa"|"mga"|"ukgc"
// reads from REGULATOR_KEYS/REGULATOR_META instead, so nothing has to be
// touched a second time per file.
//
// Historically this project had "ksa"|"mga"|"ukgc" duplicated as a literal
// union across ~10 files (including a hand-written copy in
// scripts/build-data.ts's generator template), plus several components with
// unsafe "check mga, check ukgc, else assume ksa/Curaçao" fallback chains
// that would silently mislabel any 4th value. This file exists to collapse
// both problems into one place.

export type LicenseType = "ksa" | "mga" | "ukgc";

export const REGULATOR_KEYS: LicenseType[] = ["ksa", "mga", "ukgc"];

export interface RegulatorMeta {
  key: LicenseType;
  /** Short badge form, e.g. "KSA". */
  shortLabel: string;
  /** Directory-card badge text, e.g. "KSA Licensed" / "UKGC Regulated" — kept
   * distinct per regulator since the existing copy isn't perfectly uniform.
   * Also reused as the review page's top badge text. */
  cardBadgeText: string;
  /** Dutch-language variant of cardBadgeText, shown to simulated-Dutch
   * visitors on the review page top badge. Only KSA has one today. */
  cardBadgeTextNl?: string;
  /** Regulator name without the abbreviation suffix, e.g. "Kansspelautoriteit". */
  fullName: string;
  /** Broad jurisdiction description used in the license verification modal, e.g. "Netherlands". */
  jurisdictionLabel: string;
  /** Regulator's general public site — used for the review page's "Verify Registry" citation link. */
  registryUrl: string;
  registryLabel: string;
  /** Regulator's specific public license-lookup tool — used in the author box's "Verify X Register" link. */
  verificationUrl: string;
  verificationLabel: string;
  /** License Guarantees modal content. */
  status: string;
  guarantees: string[];
  risks: string[];
  /** International-visitor affiliate-link tooltip copy (OutboundLinkWithTooltip). */
  internationalComplianceText: string;
  /** Directory hub page copy (LicensesContent / /licenses/[licenseType]). */
  directoryHeading: string;
  directorySubHeading: string;
  directorySubLicenseText: string;
  metaTitle: string;
  metaDescription: string;
  /** Whether this regulator has its own hard local-market visitor carve-out
   * analogous to KSA/NL (i.e. proxy.ts should force-redirect visitors from
   * that country to this regulator's directory). Unset unless confirmed. */
  localMarketCountryCode?: string;
  colors: {
    /** LicenseVerifier modal header icon + CasinoCard/LicensesContent banner badge. */
    badgeBg: string;
    badgeText: string;
    /** CasinoCard directory badge (bg + border + text combined, as currently authored per-component). */
    cardBadgeClass: string;
    cardBadgeIconClass: string;
    /** CTA button classes — deliberately kept distinct per component below,
     * since the live site already uses "sky" for MGA's CasinoCard button but
     * "blue" for MGA's badge; preserved as-is rather than unified, to avoid
     * any visual diff during the Phase 1 refactor. */
    casinoCardButtonClass: string;
    auditButtonClass: string;
    reviewTemplateButtonClass: string;
    reviewTemplateAvatarGradient: string;
    reviewTemplateAvatarTextClass: string;
    reviewTemplateBonusTextClass: string;
    reviewTemplateTopBadgeClass: string;
    licensesContentBannerClass: string;
    licensesContentHeroIconClass: string;
    navActiveClass: string;
  };
}

export const REGULATOR_META: Record<LicenseType, RegulatorMeta> = {
  ksa: {
    key: "ksa",
    shortLabel: "KSA",
    cardBadgeText: "KSA Licensed",
    cardBadgeTextNl: "KSA Gecertificeerd",
    fullName: "Kansspelautoriteit",
    jurisdictionLabel: "Netherlands",
    registryUrl: "https://kansspelautoriteit.nl/",
    registryLabel: "Kansspelautoriteit (KSA) Official Website",
    verificationUrl: "https://www.kansspelautoriteit.nl/kansspelwijzer/",
    verificationLabel: "Verify KSA Kansspelwijzer",
    status: "Highly Regulated (Gold Standard)",
    guarantees: [
      "Mandatory self-exclusion integration with CRUKS to prevent addiction.",
      "Strict segregation of player funds (money is safe even if operator goes bankrupt).",
      "Fairness audits of all RNG games by European-certified test houses.",
      "Local dispute resolution and legal recourse under Dutch Civil Law.",
    ],
    risks: [
      "Rigid deposit limits and mandatory registration requirements.",
      "Lacks cryptocurrency payment gateways due to AML compliance regulations.",
    ],
    internationalComplianceText: "⚠️ KSA Regulated: Exclusively structured for Netherlands market players.",
    directoryHeading: "KSA Regulated Operators",
    directorySubHeading: "Nederlandse Kansspelen Evaluatie",
    directorySubLicenseText: "We compare and review operators holding active licenses from the Kansspelautoriteit (KSA) under the Remote Gambling Act (Wet Koa).",
    metaTitle: "KSA Licensed Casinos - Compliance Audits & Reviews",
    metaDescription: "Compare online casinos officially licensed by the Dutch Kansspelautoriteit (KSA) under the Remote Gambling Act (Wet Koa). Read independent reviews.",
    localMarketCountryCode: "NL",
    colors: {
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-400",
      cardBadgeClass: "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400",
      cardBadgeIconClass: "text-emerald-400",
      casinoCardButtonClass: "bg-emerald-500 hover:bg-emerald-450 focus:ring-emerald-500",
      auditButtonClass: "bg-emerald-500 hover:bg-emerald-450 text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.18)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] border border-emerald-500/20 focus:ring-emerald-500",
      reviewTemplateButtonClass: "bg-emerald-500 hover:bg-emerald-450 shadow-emerald-500/10",
      reviewTemplateAvatarGradient: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white",
      reviewTemplateAvatarTextClass: "text-white",
      reviewTemplateBonusTextClass: "text-emerald-400",
      reviewTemplateTopBadgeClass: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
      licensesContentBannerClass: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 neon-border-emerald",
      licensesContentHeroIconClass: "text-emerald-400",
      navActiveClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  },
  mga: {
    key: "mga",
    shortLabel: "MGA",
    cardBadgeText: "MGA Licensed",
    fullName: "Malta Gaming Authority",
    jurisdictionLabel: "Europe",
    registryUrl: "https://www.mga.org.mt/",
    registryLabel: "Malta Gaming Authority (MGA) Registry Portal",
    verificationUrl: "https://www.mga.org.mt/licensee-hub/licensee-register/",
    verificationLabel: "Verify MGA Register",
    status: "Standard Regulated (Standard Trust)",
    guarantees: [
      "Standard financial audit checks and solvency verification.",
      "Standard RNG fairness checks for certified casino suppliers.",
      "Dispute mediation portal offered directly by the MGA board.",
    ],
    risks: [
      "No protection under Dutch local civil laws or KSA regulations.",
      "No national CRUKS database checks (separate site-specific limit tools only).",
    ],
    internationalComplianceText: "✓ MGA Licensed: Solvency checked under EU rules. Available for global players.",
    directoryHeading: "MGA Regulated Operators",
    directorySubHeading: "Malta Gaming Authority Evaluation",
    directorySubLicenseText: "Independent audits and compliance reviews of operators licensed by the Malta Gaming Authority (MGA). Check playthrough maths and regulatory safety.",
    metaTitle: "MGA Regulated Casinos - European Standards Compliance",
    metaDescription: "Audit reports and safety evaluations of gaming platforms licensed by the Malta Gaming Authority (MGA). Analyze payout metrics and wagering terms.",
    colors: {
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-400",
      cardBadgeClass: "bg-blue-500/15 border border-blue-500/30 text-blue-400",
      cardBadgeIconClass: "text-blue-400",
      casinoCardButtonClass: "bg-sky-500 hover:bg-sky-450 focus:ring-sky-500",
      auditButtonClass: "bg-sky-500 hover:bg-sky-450 text-slate-955 shadow-[0_4px_20px_rgba(14,165,233,0.18)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.4)] border border-sky-500/20 focus:ring-sky-500",
      reviewTemplateButtonClass: "bg-sky-500 hover:bg-sky-450 shadow-sky-500/10",
      reviewTemplateAvatarGradient: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
      reviewTemplateAvatarTextClass: "text-white",
      reviewTemplateBonusTextClass: "text-sky-400",
      reviewTemplateTopBadgeClass: "bg-blue-500/10 border border-blue-500/20 text-blue-450",
      licensesContentBannerClass: "bg-blue-500/10 border border-blue-500/20 text-blue-400 neon-border-blue",
      licensesContentHeroIconClass: "text-blue-400",
      navActiveClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
  },
  ukgc: {
    key: "ukgc",
    shortLabel: "UKGC",
    cardBadgeText: "UKGC Regulated",
    fullName: "UK Gambling Commission",
    jurisdictionLabel: "United Kingdom",
    registryUrl: "https://www.gamblingcommission.gov.uk/",
    registryLabel: "UK Gambling Commission (UKGC) Portal",
    verificationUrl: "https://www.gamblingcommission.gov.uk/public-register/",
    verificationLabel: "Verify UKGC Public Register",
    status: "Highly Regulated (Gold Standard)",
    guarantees: [
      "Strict player protection rules and verification standards.",
      "Solvency and client fund segregation (medium/high protection standard requirements).",
      "Mandatory participation in national multi-operator self-exclusion registry (GAMSTOP).",
      "Strict oversight on game math, fairness checks, and marketing transparency.",
    ],
    risks: [
      "No support for credit card deposits (restricted under UKGC rules).",
      "Rigorous affordability and KYC validation checks.",
    ],
    internationalComplianceText: "✓ UKGC Regulated: Secure and compliant UK Gambling Commission standards. Available for UK players.",
    directoryHeading: "UKGC Regulated Operators",
    directorySubHeading: "UK Gambling Commission Evaluation",
    directorySubLicenseText: "Compliance oversight and safety evaluations of operators regulated by the UK Gambling Commission (UKGC). Inspect playthrough math and social responsibility standards.",
    metaTitle: "UKGC Regulated Casinos - UK Compliance Audits",
    metaDescription: "Read compliance reports and consumer safety evaluations of international gaming operators regulated by the UK Gambling Commission (UKGC).",
    colors: {
      badgeBg: "bg-amber-500/10",
      badgeText: "text-amber-400",
      cardBadgeClass: "bg-amber-500/15 border border-amber-500/30 text-amber-400",
      cardBadgeIconClass: "text-amber-400",
      casinoCardButtonClass: "bg-amber-400 hover:bg-amber-350 focus:ring-amber-500",
      auditButtonClass: "bg-amber-400 hover:bg-amber-350 text-slate-955 shadow-[0_4px_20px_rgba(245,158,11,0.18)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] border border-amber-500/20 focus:ring-amber-500",
      reviewTemplateButtonClass: "bg-amber-400 hover:bg-amber-350 shadow-amber-500/10",
      reviewTemplateAvatarGradient: "bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950",
      reviewTemplateAvatarTextClass: "text-slate-950",
      reviewTemplateBonusTextClass: "text-amber-400",
      reviewTemplateTopBadgeClass: "bg-amber-500/10 border border-amber-500/20 text-amber-400",
      licensesContentBannerClass: "bg-amber-500/10 border border-amber-500/20 text-amber-400",
      licensesContentHeroIconClass: "text-amber-400",
      navActiveClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  },
};

export function isLicenseType(value: string): value is LicenseType {
  return (REGULATOR_KEYS as string[]).includes(value);
}

/** Safe fallback for any value that isn't a recognized LicenseType — used
 * only where a neutral "we don't have data for this yet" state is needed
 * rather than silently reusing another regulator's name/colors/risk copy. */
export const UNKNOWN_REGULATOR_META: Omit<RegulatorMeta, "key"> = {
  shortLabel: "N/A",
  cardBadgeText: "Regulatory Status Pending",
  fullName: "Unrecognized Jurisdiction",
  jurisdictionLabel: "Unknown",
  registryUrl: "/licenses",
  registryLabel: "VerifiedSlots Licensing Index",
  verificationUrl: "/licenses",
  verificationLabel: "Verify Regulatory Index",
  status: "Data Unavailable",
  guarantees: [],
  risks: ["This jurisdiction has not yet been verified by our editorial audit desk."],
  internationalComplianceText: "ℹ️ Licensing details for this jurisdiction are being verified.",
  directoryHeading: "Regulated Operators",
  directorySubHeading: "Licensing Evaluation",
  directorySubLicenseText: "Independent audits and compliance reviews of licensed operators.",
  metaTitle: "VerifiedSlots - Independent Licensing Audits",
  metaDescription: "Independent compliance evaluations of regulated iGaming platforms.",
  colors: {
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-400",
    cardBadgeClass: "bg-slate-500/15 border border-slate-500/30 text-slate-400",
    cardBadgeIconClass: "text-slate-400",
    casinoCardButtonClass: "bg-slate-500 hover:bg-slate-450 focus:ring-slate-500",
    auditButtonClass: "bg-slate-500 hover:bg-slate-450 text-white border border-slate-500/20 focus:ring-slate-500",
    reviewTemplateButtonClass: "bg-slate-500 hover:bg-slate-450 shadow-slate-500/10",
    reviewTemplateAvatarGradient: "bg-gradient-to-br from-slate-700 to-slate-800 text-white",
    reviewTemplateAvatarTextClass: "text-white",
    reviewTemplateBonusTextClass: "text-slate-300",
    reviewTemplateTopBadgeClass: "bg-slate-500/10 border border-slate-500/20 text-slate-400",
    licensesContentBannerClass: "bg-slate-500/10 border border-slate-500/20 text-slate-400",
    licensesContentHeroIconClass: "text-slate-400",
    navActiveClass: "text-slate-300 bg-slate-500/10 border-slate-500/20",
  },
};

export function getRegulatorMeta(licenseType: string): RegulatorMeta | (Omit<RegulatorMeta, "key"> & { key: string }) {
  if (isLicenseType(licenseType)) return REGULATOR_META[licenseType];
  return { ...UNKNOWN_REGULATOR_META, key: licenseType };
}
