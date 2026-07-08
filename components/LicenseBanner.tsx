"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { casinos } from "@/src/data/casinos";
import { AlertTriangle } from "lucide-react";

export function LicenseBanner() {
  const pathname = usePathname() || "";

  // Detect if current route is related to a Curaçao casino or directory
  let isCuracao = false;

  if (pathname === "/licenses/curacao") {
    isCuracao = true;
  } else if (pathname.startsWith("/reviews/")) {
    const slug = pathname.replace("/reviews/", "");
    const casino = casinos.find((c) => c.slug === slug || c.id === slug);
    if (casino && casino.licenseType === "curacao") {
      isCuracao = true;
    }
  } else if (pathname.startsWith("/audits/")) {
    const segments = pathname.split("/");
    const slug = segments[3];
    const casino = casinos.find((c) => c.slug === slug || c.id === slug);
    if (casino && casino.licenseType === "curacao") {
      isCuracao = true;
    }
  }

  if (!isCuracao) return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 to-rose-600 border-b border-rose-500/20 text-white py-2.5 px-4 text-center relative z-50 flex items-center justify-center gap-2 shadow-md">
      <AlertTriangle className="text-white shrink-0 animate-pulse" size={16} />
      <span className="text-xs md:text-sm font-bold tracking-wide">
        International License: Not for residents of regulated regions like NL or UK.
      </span>
    </div>
  );
}
