"use client";

import React from "react";
import Link from "next/link";
import { useCompliance } from "@/src/context/ComplianceContext";
import { Shield, ShieldAlert, HeartPulse, ExternalLink } from "lucide-react";

export function Footer() {
  const { visitorProfile } = useCompliance();
  const isNl = visitorProfile === "Local";

  return (
    <footer className="relative z-10 mt-16 pt-12 border-t border-white/10 w-full bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* 1. Top Section - Brand and Quick Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3 w-max">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
                <Shield size={16} />
              </div>
              <span className="text-md font-bold text-white">
                VerifiedSlots
              </span>
            </Link>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              An independent, developer-led compliance auditing directory. We analyze payout mechanics, playthrough mathematics, and regulatory licensing safety.
            </p>
          </div>

          {/* Compliance & Responsible Gambling Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Responsible Play Support</h4>
            <ul className="text-[11px] text-slate-400 space-y-2">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <HeartPulse size={12} className="text-rose-500" />
                <a href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5">
                  UK: GamCare Helplines <ExternalLink size={8} />
                </a>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <HeartPulse size={12} className="text-rose-500" />
                <a href="https://www.loketkansspel.nl/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5">
                  NL: Loket Kansspel <ExternalLink size={8} />
                </a>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ShieldAlert size={12} className="text-emerald-500" />
                <a href="https://cruksregister.nl/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5">
                  NL: CRUKS Self-Exclusion <ExternalLink size={8} />
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliate Relationship & Commission Disclosure */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Affiliate Disclosure</h4>
            <p className="text-[10px] text-slate-450 leading-relaxed">
              VerifiedSlots is supported by affiliate relationships. When you visit an operator and sign up via our outbound links, we may receive a commission. This enables us to maintain our server checks, audit scorecards, and run independent reviews without sponsored content influence.
            </p>
          </div>
        </div>

        {/* 2. Middle Section - E-E-A-T Badges */}
        <div className="flex justify-center gap-6 py-8 opacity-45">
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white" title="Responsible Gambling 18+">18+</div>
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-[9px] font-bold text-white" title="Secure SSL Audits">SSL</div>
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-[9px] font-bold text-white text-center leading-tight" title="Independent RNG Certification">RNG<br />CERT</div>
        </div>

        {/* 3. Bottom Section - Regulatory Disclaimers */}
        <div className="text-center pb-12">
          <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
            {isNl ? "Verantwoord Spelen & Regulatory Disclosure" : "Responsible Gambling & Regulatory Disclosure"}
          </h3>

          <div className="space-y-4 max-w-4xl mx-auto text-[10px] text-slate-500 leading-relaxed">
            <p>
              {isNl ? (
                "Gokken brengt financiële risico's met zich mee en kan verslavend werken. Speel alsjeblieft alleen met geld dat je comfortabel kunt missen. De inhoud op deze pagina is uitsluitend bedoeld voor informatieve en amusementsdoeleinden en mag niet worden opgevat als financieel of juridisch advies."
              ) : (
                "Gambling involves financial risk and can be addictive. Please only gamble with funds that you can comfortably afford to lose. The content provided on this page is for informational and entertainment purposes only and should not be construed as financial or legal advice."
              )}
            </p>

            <p>
              {isNl ? (
                "Als jij of iemand die je kent worstelt met een gokprobleem, is er vertrouwelijke hulp beschikbaar. Neem contact op met Loket Kansspel of andere lokale hulporganisaties. Zorg ervoor dat je voldoet aan de wettelijke leeftijdsvereisten en andere regelgeving voordat je een online gokplatform bezoekt."
              ) : (
                "If you or someone you know is struggling with a gambling problem, confidential help is available. Please contact organizations such as Gamblers Anonymous or your local problem gambling helpline. Ensure you meet all legal age and jurisdictional requirements before accessing any real-money gambling platforms."
              )}
            </p>

            {/* Dutch KSA Responsible Gambling Warning: Mandatory on Dutch local directories */}
            {isNl && (
              <p className="text-[11px] text-rose-500 font-bold uppercase tracking-widest pt-2 animate-pulse">
                Wat kost gokken jou? Stop op tijd. 18+
              </p>
            )}
          </div>

          <div className="w-16 h-px bg-white/10 mx-auto my-6"></div>

          {/* Legal and compliance links */}
          <div className="flex justify-center gap-6 mb-6 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/responsible-gambling" className="hover:text-slate-300 transition-colors">
              Responsible Gambling
            </Link>
            <Link href="/partnership" className="hover:text-slate-300 transition-colors">
              Partnerships
            </Link>
          </div>

          {/* Licensed & Audited Badge */}
          <div className="flex justify-center mb-4">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/35 transition-all text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Licensed & Audited
            </Link>
          </div>

          <p className="text-[10px] text-slate-650">
            &copy; {new Date().getFullYear()} VerifiedSlots.com - Operated by CogCore LLC. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
