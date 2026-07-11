import type { MetadataRoute } from "next";
import { casinos } from "@/src/data/casinos";
import auditsData from "@/src/data/audits.json";
import type { Audit } from "@/src/types/audit";

const BASE_URL = "https://verifiedslots.com";
const audits = auditsData as Audit[];

const STATIC_ROUTES = [
  "",
  "/about-us",
  "/audits",
  "/contact",
  "/cookie-policy",
  "/editorial-policy",
  "/licenses",
  "/partnership",
  "/privacy",
  "/responsible-gambling",
  "/terms",
];

const LICENSE_TYPES = ["ksa", "mga", "ukgc"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const licenseEntries: MetadataRoute.Sitemap = LICENSE_TYPES.map((licenseType) => ({
    url: `${BASE_URL}/licenses/${licenseType}`,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // One entry per casino per license it actually holds, mirroring the
  // route generation in audits/[license]/[slug]/page.tsx.
  const reviewEntries: MetadataRoute.Sitemap = casinos.flatMap((casino) => {
    const types = casino.licenseTypes && casino.licenseTypes.length > 0
      ? casino.licenseTypes
      : [casino.licenseType];
    return types.map((licenseType) => ({
      url: `${BASE_URL}/audits/${licenseType.toLowerCase()}/${casino.slug.toLowerCase()}`,
      lastModified: casino.lastModified ? new Date(casino.lastModified) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  });

  const insightEntries: MetadataRoute.Sitemap = audits.map((audit) => ({
    url: `${BASE_URL}/audits/insights/${audit.slug.toLowerCase()}`,
    lastModified: new Date(audit.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...licenseEntries, ...reviewEntries, ...insightEntries];
}
