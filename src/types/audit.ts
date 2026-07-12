// ─── Audit Database Types ─────────────────────────────────────────────────────
// These types back src/data/audits.json and are the canonical shape
// for all audit data in the app. Components should import from here
// rather than inline-defining their own interfaces.

export type AuditStatus = "Editorial Approved" | "Pending Review";

export type AuditCategory =
  | "Math & RNG Auditing"
  | "Strategy & Solvency"
  | "Regulatory Compliance & Risk Management"
  | "Regulatory Oversight & Wagering Liability";

/** A single section of content inside an audit article */
export interface AuditSection {
  /** Optional section header (h4-level) */
  heading?: string;
  /** The text body or paragraph content. Supports inline HTML. */
  body: string;
}

/** A full audit record as stored in src/data/audits.json */
export interface Audit {
  /** Unique numeric identifier */
  id: number;
  /** URL-safe slug, used in route paths */
  slug: string;
  /** Full display title of the audit */
  title: string;
  /** Short summary shown on the card (2 sentences max) */
  summary: string;
  /** Full name of the author */
  author: string;
  /** Author's professional role/title */
  authorRole: string;
  /** Estimated reading time e.g. "7 min read" */
  readTime: string;
  /** Publication date in human-readable format e.g. "July 6, 2026" */
  date: string;
  /** Audit category — drives filtering and display labels */
  category: AuditCategory;
  /**
   * Compliance score 0–100.
   * >= 80 → Certified (emerald)
   * 60–79 → Verified  (blue)
   *  < 60 → Caution   (amber)
   */
  complianceScore: number;
  /** Editorial publication status — drives the badge on cards and modal footer */
  status: AuditStatus;
  /** Ordered array of section blocks that make up the full article body */
  sections: AuditSection[];
  /** Optional affiliate redirect link to visit the operator directly */
  affiliateLink?: string;
  /** Boolean flag to indicate whether the operator has a signed partner contract */
  isPartner?: boolean;
  /** SEO specific meta title (max 60 chars) */
  metaTitle?: string;
  /** SEO specific meta description (max 160 chars) */
  metaDescription?: string;
  /** Target SEO keywords */
  keywords?: string[];
  /** Optional cover image, as a public/-relative path (e.g. "/my-image.png") */
  coverImage?: string;
}
