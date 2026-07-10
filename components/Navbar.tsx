"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Info, BookOpen, AlertTriangle, ChevronDown, MessageSquare, Shield } from "lucide-react";

export function Navbar() {
  const currentPath = usePathname() || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuditsDropdownOpen, setIsAuditsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-4 z-40 glass-card rounded-2xl md:rounded-full px-5 py-3 md:py-3.5 flex items-center justify-between shadow-2xl mb-8 border border-white/10 select-none">
      <Link
        href="/"
        className="flex items-center gap-3 group focus:outline-none"
      >
        {/* Let the icon breathe by removing the fixed w-9/h-9 container */}
        <img
          src="/logo.png"
          className="h-20 w-20 object-contain transition-transform duration-200 group-hover:scale-105"
          alt="Logo"
        />

        <div>
          <h1 className="text-base md:text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2 leading-tight">
            VerifiedSlots
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400">
              Compliance
            </span>
          </h1>
          <p className="hidden md:block text-[9px] text-slate-500 uppercase tracking-widest font-semibold leading-none mt-0.5">
            INDEPENDENT COMPLIANCE AUDIT DESK
          </p>
        </div>
      </Link>

      {/* Nav Links (right) - Horizontal layout on all viewports, compact icons on mobile */}
      <div className="flex items-center gap-1 md:gap-2.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-350">
        <Link
          href="/licenses/ksa"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2 py-1.5 md:px-2.5 border border-transparent ${currentPath === "/licenses/ksa"
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          KSA
        </Link>

        <Link
          href="/licenses/mga"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2 py-1.5 md:px-2.5 border border-transparent ${currentPath === "/licenses/mga"
            ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          MGA
        </Link>

        <Link
          href="/licenses/ukgc"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2 py-1.5 md:px-2.5 border border-transparent ${currentPath === "/licenses/ukgc"
            ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          UKGC
        </Link>

        <Link
          href="/audits"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2 py-1.5 md:px-2.5 border border-transparent ${currentPath === "/audits"
            ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          Insights
        </Link>

        <span className="text-white/10 hidden sm:inline" aria-hidden="true">|</span>

        <Link
          href="/about-us"
          className={`flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent ${currentPath === "/about-us"
            ? "text-white bg-white/10 border-white/10"
            : "hover:text-white hover:bg-white/5"
            }`}
          title="About Us"
        >
          <Info size={13} aria-hidden="true" />
          <span className="hidden sm:inline">Info</span>
        </Link>

        <span className="text-white/10 hidden sm:inline" aria-hidden="true">|</span>

        {/* Resources Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className={`flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent cursor-pointer font-bold uppercase tracking-wider text-[10px] md:text-[11px] ${["/editorial-policy", "/responsible-gambling", "/contact"].includes(currentPath)
                ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                : "text-slate-350 hover:text-white hover:bg-white/5"
              }`}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span>Resources</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Conditional Dropdown Panel */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 pt-2 w-48 z-50">
              <div
                className="bg-slate-900 border border-white/10 rounded-xl shadow-xl p-1.5 backdrop-blur-md"
                role="menu"
              >
                <Link
                  href="/editorial-policy"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${currentPath === "/editorial-policy"
                      ? "text-white bg-white/10"
                      : "text-slate-350 hover:text-white hover:bg-white/5"
                    }`}
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <BookOpen size={13} aria-hidden="true" />
                  <span>Policy</span>
                </Link>

                <Link
                  href="/responsible-gambling"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${currentPath === "/responsible-gambling"
                      ? "text-rose-455 bg-rose-500/10"
                      : "text-slate-350 hover:text-rose-450 hover:bg-rose-500/5"
                    }`}
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <AlertTriangle size={13} className="text-rose-400 shrink-0" aria-hidden="true" />
                  <span>Safe Play</span>
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${currentPath === "/contact"
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-350 hover:text-white hover:bg-white/5"
                    }`}
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <MessageSquare size={13} aria-hidden="true" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav >
  );
}

