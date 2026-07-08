import React from "react";
import { MessageSquare, Mail, Shield, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Compliance Desk - VerifiedSlots",
  description: "Reach out to the independent auditing and compliance verification team at VerifiedSlots.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 relative optimize-gpu animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl">
        {/* Header Icon */}
        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
          <MessageSquare size={22} />
        </div>

        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight mb-4">
          Contact Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Compliance Desk</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8">
          VerifiedSlots operates as an independent auditing team. If you are an operator requesting a compliance audit, or a player wishing to report a regulatory violation or licensing discrepancy, please connect with our desk directly.
        </p>

        {/* Contact Info Block */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 bg-slate-950/40 border border-white/5 p-4 rounded-2xl">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Email Communications</p>
              <a 
                href="mailto:compliance@verifiedslots.com" 
                className="text-sm font-bold text-white hover:text-blue-400 transition-colors"
              >
                compliance@verifiedslots.com
              </a>
            </div>
          </div>
        </div>

        {/* Advisory Stamp */}
        <div className="pt-6 border-t border-white/5 flex items-start gap-3 text-[11px] text-slate-400 leading-relaxed">
          <Shield className="text-blue-400 shrink-0 mt-0.5" size={14} />
          <div>
            <span className="font-bold text-white">Editorial Independence Guarantee:</span> We do not accept advertising placements or commercial compensation to alter audit findings or compliance scores. All inquiries are processed under strict editorial integrity standards.
          </div>
        </div>
      </div>
    </div>
  );
}
