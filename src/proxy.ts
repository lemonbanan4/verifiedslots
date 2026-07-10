import { NextResponse } from "next/server";
import type { NextRequest, ProxyConfig } from "next/server";
import { casinos, isCasinoAvailableInCountry } from "./data/casinos";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Determine Geo status
  const simulatedGeo = request.cookies.get("simulated_geo_nl")?.value;
  const rawCountryHeader = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const isDutch = simulatedGeo === "true" || rawCountryHeader === "NL";
  const countryCode = isDutch ? "NL" : (rawCountryHeader || "GB");

  // Determine user's country code to forward (lowercase, e.g. "nl", "global", "us")
  const country = (
    simulatedGeo === "true"
      ? "nl"
      : (rawCountryHeader || (request as any).geo?.country || "global")
  ).toLowerCase();

  // clone request headers and inject country
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-country", country);

  // Check admin bypass via query parameter or cookie
  const hasBypassParam = request.nextUrl.searchParams.get("bypass") === "true";
  const hasDisableBypass = request.nextUrl.searchParams.get("bypass") === "false";
  const hasBypassCookie = request.cookies.get("admin_bypass")?.value === "true";
  const isAdminBypass = (hasBypassParam || hasBypassCookie) && !hasDisableBypass;


  // 2. License Enforcement for Dutch Visitors
  if (isDutch && !isAdminBypass) {
    if (pathname === "/licenses" || pathname === "/licenses/" || pathname.startsWith("/licenses/ukgc") || pathname.startsWith("/licenses/mga")) {
      return NextResponse.redirect(new URL("/licenses/ksa", request.url));
    }
  }

  // 3. Smart Redirect for Review Pages (Permanent Redirect for SEO + Compliance Checks)
  if (pathname.startsWith("/reviews/")) {
    const slug = pathname.replace(/^\/reviews\//, "").replace(/\/$/, "");
    const casino = casinos.find((c) => c.slug === slug || c.id === slug);
    if (casino) {
      const license = casino.licenseType.toLowerCase();
      return NextResponse.redirect(new URL(`/audits/${license}/${slug}`, request.url), 308);
    }
  }

  if (pathname.startsWith("/audits/") && !isAdminBypass) {
    const segments = pathname.split("/");
    // Only /audits/[license]/[slug] casino review pages carry a casino slug in
    // segments[3] — /audits/insights/[slug] editorial articles use segments[2]
    // for "insights" and segments[3] for the article slug, which never matches
    // a casino and would otherwise redirect every article away for everyone.
    const isCasinoReviewRoute = ["ksa", "mga", "ukgc"].includes(segments[2]);
    const slug = segments[3] || "";
    if (isCasinoReviewRoute && slug && !isCasinoAvailableInCountry(slug, countryCode)) {
      return NextResponse.redirect(new URL(isDutch ? "/licenses/ksa" : "/licenses/mga", request.url));
    }
  }

  // 4. Robots Protection for non-matching profiles
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (hasBypassParam) {
    response.cookies.set("admin_bypass", "true", { path: "/" });
  } else if (hasDisableBypass) {
    response.cookies.delete("admin_bypass");
  }

  if (isDutch && (pathname.startsWith("/licenses/mga") || pathname.startsWith("/licenses/ukgc"))) {
    response.headers.set("x-robots-tag", "noindex");
  } else if (!isDutch && pathname.startsWith("/licenses/ksa")) {
    response.headers.set("x-robots-tag", "noindex");
  }

  return response;
}

// 5. Single Source of Truth for Matcher
export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.css$).*)',
  ],
};

// 6. Client-side compliance simulation helper
export function runComplianceMiddleware(pathname: string, isDutch: boolean): string | null {
  const countryCode = isDutch ? "NL" : "GB";


  if (isDutch) {
    if (pathname === "/licenses" || pathname === "/licenses/" || pathname.startsWith("/licenses/mga") || pathname.startsWith("/licenses/ukgc")) {
      return "/licenses/ksa";
    }
    if (pathname.startsWith("/reviews/")) {
      const slug = pathname.replace(/^\/reviews\//, "").replace(/\/$/, "");
      const casino = casinos.find((c) => c.slug === slug || c.id === slug);
      if (casino) {
        return `/audits/${casino.licenseType.toLowerCase()}/${slug}`;
      }
      return "/licenses/ksa";
    }
    if (pathname.startsWith("/audits/")) {
      const segments = pathname.split("/");
      const isCasinoReviewRoute = ["ksa", "mga", "ukgc"].includes(segments[2]);
      const slug = segments[3] || "";
      if (isCasinoReviewRoute && slug && !isCasinoAvailableInCountry(slug, countryCode)) {
        return "/licenses/ksa";
      }
    }
  } else {
    if (pathname.startsWith("/licenses/ksa")) {
      return "/licenses/mga";
    }
    if (pathname.startsWith("/reviews/")) {
      const slug = pathname.replace(/^\/reviews\//, "").replace(/\/$/, "");
      const casino = casinos.find((c) => c.slug === slug || c.id === slug);
      if (casino) {
        return `/audits/${casino.licenseType.toLowerCase()}/${slug}`;
      }
      return "/licenses/mga";
    }
    if (pathname.startsWith("/audits/")) {
      const segments = pathname.split("/");
      const isCasinoReviewRoute = ["ksa", "mga", "ukgc"].includes(segments[2]);
      const slug = segments[3] || "";
      if (isCasinoReviewRoute && slug && !isCasinoAvailableInCountry(slug, countryCode)) {
        return "/licenses/mga";
      }
    }
  }

  return null; // No redirect needed
}