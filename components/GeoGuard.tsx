"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCompliance } from "@/src/context/ComplianceContext";
import { runComplianceMiddleware } from "@/src/proxy";
import { ShieldCheck, ShieldAlert, Globe, Landmark } from "lucide-react";

interface GeoGuardProps {
  children: React.ReactNode;
}

export function GeoGuard({ children }: GeoGuardProps) {
  const { isDutch, detectedCountry, setProfile } = useCompliance();
  const currentPath = usePathname() || "";
  const [showPanel, setShowPanel] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const hasSimulateParam = window.location.search.includes("simulate=true");
      if (hasSimulateParam) {
        setShowPanel(true);
      }
    }
  }, []);

  // Enforce compliance routing on client side as fallback
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mounted) return;
    if (detectedCountry === "Detecting...") return;

    // Check client-side admin bypass state
    const hasBypassCookie = document.cookie.split('; ').find(row => row.startsWith('admin_bypass='))?.split('=')[1] === 'true';
    const hasBypassParam = window.location.search.includes('bypass=true');
    const hasDisableParam = window.location.search.includes('bypass=false');
    const isAdminBypass = (hasBypassParam || hasBypassCookie) && !hasDisableParam;

    if (isAdminBypass) return; // Skip compliance checks for administrator review bypass

    const checkRedirect = () => {
      const path = window.location.pathname;
      const redirectPath = runComplianceMiddleware(path, isDutch);

      if (redirectPath) {
        const cleanPath = path.replace(/\/$/, "");
        const cleanRedirect = redirectPath.replace(/\/$/, "");
        if (cleanRedirect !== cleanPath) {
          window.history.replaceState(null, "", redirectPath);
          window.location.reload();
        }
      }
    };

    checkRedirect();
  }, [currentPath, isDutch, mounted, detectedCountry]);

  const isNlPath = currentPath === "/licenses/ksa" || currentPath.startsWith("/licenses/ksa/");

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Floating Simulation Control Panel */}
      {mounted && showPanel && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 md:max-w-sm z-50 bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Globe className="text-blue-400" size={16} />
              <span className="text-xs font-bold text-white uppercase tracking-wider">iGaming Geo-Simulation</span>
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer"
            >
              Hide
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] text-slate-350 leading-relaxed">
              <span className="text-slate-400">Visitor Profile:</span> <strong className="text-white">{detectedCountry}</strong>
            </div>

            <div className="flex items-center justify-between bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
              <span className="text-xs font-medium text-slate-305">Simulate Netherlands Visitor</span>
              <button
                onClick={() => setProfile(isDutch ? "Global" : "Local")}
                className={`text-xs px-3 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${isDutch
                  ? "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-md shadow-emerald-500/10"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
              >
                {isDutch ? "NL Active" : "Global"}
              </button>
            </div>

            {/* Compliance Badge */}
            <div className="flex items-center gap-2 text-xs p-2 rounded-xl bg-slate-950/80 border border-white/5">
              {isDutch ? (
                <>
                  <ShieldCheck className="text-emerald-400 shrink-0" size={16} />
                  <div>
                    <p className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider">🛡️ Local Profile Active</p>
                    <p className="text-[9px] text-slate-400 leading-tight">Exclusively loading KSA-licensed operators.</p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldCheck className="text-blue-400 shrink-0" size={16} />
                  <div>
                    <p className="font-bold text-blue-400 text-[10px] uppercase tracking-wider">🌐 Global Profile Active</p>
                    <p className="text-[9px] text-slate-450 leading-tight">Showing MGA & Curaçao directories.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mini Toggle tab if hidden — dev/staging only. Production keeps the
          panel reachable via ?simulate=true, but doesn't advertise it. */}
      {!showPanel && process.env.NODE_ENV !== "production" && (
        <button
          onClick={() => setShowPanel(true)}
          className="fixed bottom-4 right-4 z-50 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Globe size={12} className="text-blue-400" /> Show Geo-Simulation
        </button>
      )}

      {/* Dutch Geo Banner (If visiting Dutch directory) */}
      {isNlPath && (
        <div className="w-full bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-b border-emerald-500/20 backdrop-blur px-4 py-2 text-center text-emerald-400 text-[11px] font-semibold flex items-center justify-center gap-2 relative z-30">
          <Landmark size={14} className="text-emerald-400 animate-pulse" />
          <span>Kansspelautoriteit (KSA) Gereguleerde Inhoud — Uitsluitend gelicentieerde aanbieders</span>
        </div>
      )}

      {/* Main App Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
