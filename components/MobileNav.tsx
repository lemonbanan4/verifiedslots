"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Shield, ShieldAlert, Scale, AlertTriangle } from "lucide-react";

export function MobileNav() {
  const currentPath = usePathname() || "";

  const navItems = [
    {
      label: "Hub",
      icon: <Scale size={18} />,
      path: "/",
    },
    {
      label: "KSA",
      icon: <ShieldCheck size={18} />,
      path: "/licenses/ksa",
    },
    {
      label: "MGA",
      icon: <Shield size={18} />,
      path: "/licenses/mga",
    },
    {
      label: "UKGC",
      icon: <ShieldAlert size={18} />,
      path: "/licenses/ukgc",
    },
  ];

  return (
    <>
      {/* Sticky Bottom Bar for Mobile Viewports */}
      <nav className="fixed bottom-0 left-0 w-full z-45 bg-slate-950/90 border-t border-white/10 backdrop-blur-lg px-6 py-2 pb-5 md:hidden flex justify-between items-center shadow-2xl optimize-gpu select-none">
        
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex flex-col items-center gap-1.5 px-3 py-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-blue-400 bg-blue-500/10 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <div className={isActive ? "scale-110 text-blue-400" : ""}>
                {item.icon}
              </div>
              <span className="text-[9px] uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Floating Thumb-Reach Responsible Gambling Toggle button */}
        <Link
          href="/responsible-gambling"
          className={`flex flex-col items-center justify-center p-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-slate-950 shadow-lg shadow-rose-500/20 active:scale-95 transition-all animate-pulse outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-slate-950 relative -top-3 cursor-pointer`}
          title="Responsible Gambling"
          aria-label="Responsible Gambling Information"
        >
          <AlertTriangle size={18} className="text-slate-950 font-bold" />
          <span className="absolute -bottom-5 text-[8px] font-bold text-rose-500 uppercase tracking-widest whitespace-nowrap">
            18+ Safe
          </span>
        </Link>

      </nav>
      {/* Extra spacing block on mobile to prevent content clipping under the sticky bottom nav */}
      <div className="h-20 w-full md:hidden" aria-hidden="true" />
    </>
  );
}
