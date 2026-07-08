import { AlertCircle } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface BonusTermsProps {
  review: Casino;
}

export function BonusTerms({ review }: BonusTermsProps) {
  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-full gap-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${
          review.isKsaLicensed 
            ? "bg-emerald-500/10 text-emerald-400" 
            : "bg-rose-500/10 text-rose-455"
        }`}>
          <AlertCircle size={20} />
        </div>
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Bonus Terms Analysis</h2>
      </div>
      <p className="text-xs text-slate-300 mb-4 leading-relaxed font-medium">
        Transparency is critical when evaluating promotional offers. Here is our objective breakdown of the welcome bonus terms at {review.name}.
      </p>
      
      <div className="space-y-4">
        <div className={`border rounded-xl p-4 ${
          review.isKsaLicensed
            ? "bg-emerald-500/5 border-emerald-500/10 text-slate-300"
            : "bg-rose-500/5 border-rose-500/10 text-slate-300"
        }`}>
          <h3 className={`text-xs font-bold mb-1 uppercase ${
            review.isKsaLicensed ? "text-emerald-400" : "text-rose-400"
          }`}>
            Objective Verdict: {review.isKsaLicensed ? "Player-Friendly Promotion" : "High Wagering Requirements"}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">{review.bonusTermsVerdict}</p>
        </div>

        {review.bonusTermsDetails.map((detail, index) => (
          <div key={index} className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
            <h3 className="text-xs font-bold text-white mb-1">{detail.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{detail.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
