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
    // 1. Initial State Resolution from Cookie or LocalStorage
    const simulatedCookie = getCookie("simulated_geo_nl");
    let isNL = false;

    if (simulatedCookie !== null) {
      isNL = simulatedCookie === "true";
    } else {
      // LocalStorage fallback
      if (typeof window !== "undefined") {
        const simulatedLocal = localStorage.getItem("simulated_geo_nl");
        if (simulatedLocal !== null) {
          isNL = simulatedLocal === "true";
        } else {
          // Timezone fallback
          try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            isNL = tz === "Europe/Amsterdam";
          } catch {}
        }
      }
    }

    setVisitorProfile(isNL ? "Local" : "Global");
    setDetectedCountry(isNL ? "Netherlands (Simulated)" : "Global / Rest of World (Simulated)");

    // 2. Fetch IP Geolocation API if no simulation overrides are set
    if (simulatedCookie === null && typeof window !== "undefined" && localStorage.getItem("simulated_geo_nl") === null) {
      let active = true;

      const resolveGeo = async () => {
        // Provider 1: ipapi.co
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (!res.ok) throw new Error();
          const data = await res.json();
          return { code: data.country_code?.toUpperCase(), country: data.country_name };
        } catch {}

        // Provider 2: freeipapi.com
        try {
          const res = await fetch("https://freeipapi.com/api/json");
          if (!res.ok) throw new Error();
          const data = await res.json();
          return { code: data.countryCode?.toUpperCase(), country: data.countryName };
        } catch {}

        // Provider 3: ipwhois.app
        try {
          const res = await fetch("https://ipwhois.app/json/");
          if (!res.ok) throw new Error();
          const data = await res.json();
          return { code: data.country_code?.toUpperCase(), country: data.country };
        } catch {}

        throw new Error("All geo-location APIs exhausted");
      };

      resolveGeo()
        .then((data) => {
          if (!active) return;
          const isIPNL = data.code === "NL";
          setVisitorProfile(isIPNL ? "Local" : "Global");
          setDetectedCountry(isIPNL ? `${data.country} (IP Geolocation)` : `${data.country || "Rest of World"} (IP Geolocation)`);
        })
        .catch(() => {
          // Fallback timezone and language check
          if (!active) return;
          try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const isTzNL = tz === "Europe/Amsterdam";
            const langs = navigator.languages || [navigator.language];
            const isLangNL = langs.some((l) => l.toLowerCase().startsWith("nl"));
            
            if (isTzNL || isLangNL) {
              setVisitorProfile("Local");
              setDetectedCountry("Netherlands (Fallback - Timezone/Language)");
            } else {
              setVisitorProfile("Global");
              setDetectedCountry("Rest of World (Fallback)");
            }
          } catch {}
        });

      return () => {
        active = false;
      };
    }
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
