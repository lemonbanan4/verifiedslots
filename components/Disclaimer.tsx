"use client";

import { useCompliance } from "@/src/context/ComplianceContext";

export function Disclaimer() {
  const { visitorProfile } = useCompliance();
  const isNl = visitorProfile === "Local";

  return (
    <footer className="relative z-10 mt-12 pt-8 border-t border-white/10 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-sm text-center">
        <div className="flex justify-center gap-4 opacity-40 mb-8">
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white">18+</div>
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white">SSL</div>
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white text-center leading-tight">RNG<br />CERT</div>
        </div>

        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
          {isNl ? "Verantwoord Spelen & Regulatory Disclosure" : "Responsible Gambling & Regulatory Disclosure"}
        </h3>

        <p className="mb-4 leading-relaxed max-w-3xl mx-auto text-[10px] text-slate-500">
          {isNl ? (
            "Gokken brengt financiële risico's met zich mee en kan verslavend werken. Speel alsjeblieft alleen met geld dat je comfortabel kunt missen. De inhoud op deze pagina is uitsluitend bedoeld voor informatieve en amusementsdoeleinden en mag niet worden opgevat als financieel of juridisch advies."
          ) : (
            "Gambling involves financial risk and can be addictive. Please only gamble with funds that you can comfortably afford to lose. The content provided on this page is for informational and entertainment purposes only and should not be construed as financial or legal advice."
          )}
        </p>

        <p className="mb-8 leading-relaxed max-w-3xl mx-auto text-[10px] text-slate-500">
          {isNl ? (
            "Als jij of iemand die je kent worstelt met een gokprobleem, is er vertrouwelijke hulp beschikbaar. Neem contact op met Loket Kansspel of andere lokale hulporganisaties. Zorg ervoor dat je voldoet aan de wettelijke leeftijdsvereisten en andere regelgeving voordat je een online gokplatform bezoekt."
          ) : (
            "If you or someone you know is struggling with a gambling problem, confidential help is available. Please contact organizations such as Gamblers Anonymous or your local problem gambling helpline. Ensure you meet all legal age and jurisdictional requirements before accessing any real-money gambling platforms."
          )}
        </p>

        <div className="w-16 h-px bg-white/10 mx-auto mb-8"></div>

        {/* Dutch KSA Responsible Gambling Warning: Mandatory on /nl/ pages */}
        {isNl && (
          <p className="text-[11px] text-rose-500 font-bold uppercase tracking-widest pb-4 animate-pulse">
            Wat kost gokken jou? Stop op tijd. 18+
          </p>
        )}

        <p className="text-[10px] text-slate-600 pb-8">
          &copy; {new Date().getFullYear()} VerifiedSlots. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
