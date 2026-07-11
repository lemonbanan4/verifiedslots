"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type VisitorProfile = "Global" | "Local";

interface ComplianceContextType {
  visitorProfile: VisitorProfile;
  isDutch: boolean;
  detectedCountry: string;
  setProfile: (profile: VisitorProfile) => void;
  toggleProfile: () => void;
}

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

export function ComplianceProvider({ children }: { children: React.ReactNode }) {
  const [visitorProfile, setVisitorProfile] = useState<VisitorProfile>("Global");
  const [detectedCountry, setDetectedCountry] = useState<string>("Detecting...");

  // Helper to read cookies on the client side
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  useEffect(() => {
    // 1. Admin/manual simulation override always wins (cookie, then
    // localStorage), mirroring the proxy's own priority order.
    const simulatedCookie = getCookie("simulated_geo_nl");
    const simulatedLocal = typeof window !== "undefined" ? localStorage.getItem("simulated_geo_nl") : null;
    const simulated = simulatedCookie ?? simulatedLocal;

    if (simulated !== null) {
      const isNL = simulated === "true";
      setVisitorProfile(isNL ? "Local" : "Global");
      setDetectedCountry(isNL ? "Netherlands (Simulated)" : "Global / Rest of World (Simulated)");
      return;
    }

    // 2. Real detection, resolved server-side in src/proxy.ts from
    // Cloudflare's ip-country header and handed to the client via a plain
    // cookie — no client-side IP-geolocation API calls needed.
    const detectedCookie = getCookie("detected_geo_nl");
    if (detectedCookie !== null) {
      const isNL = detectedCookie === "true";
      setVisitorProfile(isNL ? "Local" : "Global");
      setDetectedCountry(isNL ? "Netherlands (Server Detected)" : "Global / Rest of World (Server Detected)");
      return;
    }

    // 3. Defensive fallback if the cookie is somehow missing (e.g. a cached
    // asset served without going through the proxy).
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const langs = navigator.languages || [navigator.language];
      const isNL = tz === "Europe/Amsterdam" || langs.some((l) => l.toLowerCase().startsWith("nl"));
      setVisitorProfile(isNL ? "Local" : "Global");
      setDetectedCountry(isNL ? "Netherlands (Fallback)" : "Global / Rest of World (Fallback)");
    } catch {}
  }, []);

  const setProfile = (profile: VisitorProfile) => {
    const isNL = profile === "Local";
    
    // Set cookie for server-side Next.js middleware routing
    document.cookie = `simulated_geo_nl=${isNL ? "true" : "false"}; path=/; max-age=31536000`;
    
    if (typeof window !== "undefined") {
      localStorage.setItem("simulated_geo_nl", isNL ? "true" : "false");
    }
    
    setVisitorProfile(profile);
    setDetectedCountry(isNL ? "Netherlands (Simulated)" : "Global / Rest of World (Simulated)");

    // Dispatch event and reload to let Next.js server-side routing process the change
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("geo_simulation_change"));
      window.location.reload();
    }
  };

  const toggleProfile = () => {
    setProfile(visitorProfile === "Global" ? "Local" : "Global");
  };

  const isDutch = visitorProfile === "Local";

  return (
    <ComplianceContext.Provider value={{ visitorProfile, isDutch, detectedCountry, setProfile, toggleProfile }}>
      {children}
    </ComplianceContext.Provider>
  );
}

export function useCompliance() {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error("useCompliance must be used within a ComplianceProvider");
  }
  return context;
}
