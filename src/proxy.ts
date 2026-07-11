import { NextResponse } from "next/server";
import type { NextRequest, ProxyConfig } from "next/server";
import { casinos, isCasinoAvailableInCountry } from "./data/casinos";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Determine Geo status. This app runs on Cloud Run behind Cloudflare,
  // which adds "cf-ipcountry" to every request that reaches the origin;
  // "x-vercel-ip-country" is kept as a fallback for any environment that
  // provides it instead. A simulated cookie (admin/testing override) always
  // takes full priority over the real header, in either direction.
  const simulatedGeo = request.cookies.get("simulated_geo_nl")?.value;
  const rawCountryHeader = (
    request.headers.get("cf-ipcountry") || request.headers.get("x-vercel-ip-country")
  )?.toUpperCase();
  const isDutch = simulatedGeo !== undefined ? simulatedGeo === "true" : rawCountryHeader === "NL";
  const countryCode = isDutch ? "NL" : (rawCountryHeader || "GB");

  // Determine user's country code to forward (lowercase, e.g. "nl", "global", "us")
  const country = (
    simulatedGeo !== undefined
      ? (simulatedGeo === "true" ? "nl" : "global")
      : (rawCountryHeader || "global")
  ).toLowerCase();

  // clone request headers and inject country
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-country", country);

  // Check admin bypass via query parameter or cookie
  const hasBypassParam = request.nextUrl.searchParams.get("bypass") === "true";
  const hasDisableBypass = request.nextUrl.searchParams.get("bypass") === "false";
  const hasBypassCookie = request.cookies.get("admin_bypass")?.value === "true";
  const isAdminBypass = (hasBypassParam || hasBypassCookie) && !hasDisableBypass;

  // Hands the real, server-detected geo down to the client via a plain
  // (non-httpOnly) cookie, so ComplianceContext can read it synchronously
  // instead of calling third-party IP-geolocation APIs from the browser.
  const withGeoCookie = <T extends NextResponse>(res: T): T => {
    res.cookies.set("detected_geo_nl", isDutch ? "true" : "false", { path: "/", maxAge: 3600 });
    return res;
  };

  // 2. License Enforcement for Dutch Visitors
  if (isDutch && !isAdminBypass) {
    if (pathname === "/licenses" || pathname === "/licenses/" || pathname.startsWith("/licenses/ukgc") || pathname.startsWith("/licenses/mga")) {
      return withGeoCookie(NextResponse.redirect(new URL("/licenses/ksa", request.url)));
    }
  }

  // 3. Smart Redirect for Review Pages (Permanent Redirect for SEO + Compliance Checks)
  if (pathname.startsWith("/reviews/")) {
    const slug = pathname.replace(/^\/reviews\//, "").replace(/\/$/, "");
    const casino = casinos.find((c) => c.slug === slug || c.id === slug);
    if (casino) {
      const license = casino.licenseType.toLowerCase();
      return withGeoCookie(NextResponse.redirect(new URL(`/audits/${license}/${slug}`, request.url), 308));
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
      return withGeoCookie(NextResponse.redirect(new URL(isDutch ? "/licenses/ksa" : "/licenses/mga", request.url)));
    }
  }

  // 4. Robots Protection for non-matching profiles
  const response = withGeoCookie(NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  }));

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

  // Temporary diagnostic header confirming which upstream geo header (if
  // any) actually reaches the origin in production — safe to remove once
  // confirmed live.
  response.headers.set("x-debug-geo-header", rawCountryHeader || "none");

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