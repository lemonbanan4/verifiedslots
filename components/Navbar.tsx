"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, BookOpen, AlertTriangle, ChevronDown, MessageSquare, Handshake, Menu, X, ShieldCheck, Sparkles } from "lucide-react";

// Every destination in the desktop nav + Resources dropdown, flattened into
// one list — the mobile drawer shows all of them vertically rather than
// nesting a second dropdown inside the drawer.
const MOBILE_LINKS = [
  { href: "/licenses/ksa", label: "KSA", icon: ShieldCheck },
  { href: "/licenses/mga", label: "MGA", icon: ShieldCheck },
  { href: "/licenses/ukgc", label: "UKGC", icon: ShieldCheck },
  { href: "/audits", label: "Insights", icon: Sparkles },
  { href: "/about-us", label: "Info", icon: Info },
  { href: "/editorial-policy", label: "Policy", icon: BookOpen },
  { href: "/responsible-gambling", label: "Safe Play", icon: AlertTriangle },
  { href: "/contact", label: "Contact", icon: MessageSquare },
  { href: "/partnership", label: "Partners", icon: Handshake },
];

export function Navbar() {
  const currentPath = usePathname() || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the full-screen drawer is open, and close it
  // automatically if the viewport is resized past the mobile breakpoint.
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const mobileDrawer = isMobileMenuOpen && mounted && (
    <div className="fixed inset-0 z-[9999] bg-slate-950/98 backdrop-blur-lg flex flex-col md:hidden animate-fade-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo.png" className="h-10 w-10 object-contain" alt="Logo" />
          <span className="text-base font-bold text-slate-100">VerifiedSlots</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1.5" aria-label="Mobile navigation">
        {MOBILE_LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${currentPath === href
              ? "text-white bg-white/10 border border-white/10"
              : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <nav className="sticky top-4 z-40 glass-card rounded-2xl md:rounded-full px-5 py-3 md:py-3.5 flex items-center justify-between shadow-2xl mb-8 border border-white/10 select-none">
      <Link
        href="/"
        className="flex items-center gap-3 group focus:outline-none min-w-0"
      >
        {/* Smaller on mobile so the logo + title never crowd out the hamburger */}
        <img
          src="/logo.png"
          className="h-12 w-12 md:h-20 md:w-20 object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
          alt="Logo"
        />

        <div className="min-w-0">
          <h1 className="text-sm md:text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2 leading-tight truncate">
            VerifiedSlots
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400">
              Compliance
            </span>
          </h1>
          <p className="hidden md:block text-[9px] text-slate-500 uppercase tracking-widest font-semibold leading-none mt-0.5">
            INDEPENDENT COMPLIANCE AUDIT DESK
          </p>
        </div>
      </Link>

      {/* Nav Links (right) - desktop/tablet only; mobile gets the hamburger + drawer below */}
      <div className="hidden md:flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-350">
        <Link
          href="/licenses/ksa"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent ${currentPath === "/licenses/ksa"
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          KSA
        </Link>

        <Link
          href="/licenses/mga"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent ${currentPath === "/licenses/mga"
            ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          MGA
        </Link>

        <Link
          href="/licenses/ukgc"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent ${currentPath === "/licenses/ukgc"
            ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          UKGC
        </Link>

        <Link
          href="/audits"
          className={`transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent ${currentPath === "/audits"
            ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
            : "hover:text-white hover:bg-white/5"
            }`}
        >
          Insights
        </Link>

        <span className="text-white/10" aria-hidden="true">|</span>

        <Link
          href="/about-us"
          className={`flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent ${currentPath === "/about-us"
            ? "text-white bg-white/10 border-white/10"
            : "hover:text-white hover:bg-white/5"
            }`}
          title="About Us"
        >
          <Info size={13} aria-hidden="true" />
          <span>Info</span>
        </Link>

        <span className="text-white/10" aria-hidden="true">|</span>

        {/* Resources Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className={`flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2.5 py-1.5 border border-transparent cursor-pointer font-bold uppercase tracking-wider text-[11px] ${["/editorial-policy", "/responsible-gambling", "/contact", "/partnership"].includes(currentPath)
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[11px] font-bold uppercase tracking-wider ${currentPath === "/editorial-policy"
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[11px] font-bold uppercase tracking-wider ${currentPath === "/responsible-gambling"
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[11px] font-bold uppercase tracking-wider ${currentPath === "/contact"
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-350 hover:text-white hover:bg-white/5"
                    }`}
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <MessageSquare size={13} aria-hidden="true" />
                  <span>Contact</span>
                </Link>

                <Link
                  href="/partnership"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[11px] font-bold uppercase tracking-wider ${currentPath === "/partnership"
                      ? "text-indigo-400 bg-indigo-500/10"
                      : "text-slate-350 hover:text-white hover:bg-white/5"
                    }`}
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Handshake size={13} aria-hidden="true" />
                  <span>Partners</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger trigger — mobile only */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
        aria-label="Open menu"
        aria-expanded={isMobileMenuOpen}
      >
        <Menu size={20} />
      </button>

      {mounted && isMobileMenuOpen && createPortal(mobileDrawer, document.body)}
    </nav>
  );
}

