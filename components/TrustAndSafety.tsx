import { Shield, Zap, AlertCircle } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface TrustAndSafetyProps {
  review: Casino;
}

export function TrustAndSafety({ review }: TrustAndSafetyProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <Shield className={review.isKsaLicensed ? "text-emerald-400" : "text-rose-400"} size={16} />;
      case "zap":
        return <Zap className="text-amber-400" size={16} />;
      default:
        return <AlertCircle className="text-rose-450" size={16} />;
    }
  };

  return (
    <section className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex flex-col h-full">
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white/5 border rounded-full mb-4 ${
          review.isKsaLicensed 
            ? "border-emerald-500/20" 
            : "border-rose-500/20"
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            review.isKsaLicensed ? "bg-emerald-500" : "bg-rose-500"
          }`}></div>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${
            review.isKsaLicensed ? "text-emerald-400" : "text-rose-450"
          }`}>
            {review.isKsaLicensed ? "Regulatory Verified" : "Proceed with Caution"}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-3 tracking-tight">{review.securityTitle}</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {review.securitySummary}
        </p>
      </div>

      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {review.securityPoints.map((point, index) => (
          <div 
            key={index} 
            className={`p-4 bg-slate-900/50 rounded-2xl border ${
              point.status === "success" 
                ? "border-emerald-500/25" 
                : point.status === "danger" 
                ? "border-rose-500/20" 
                : "border-white/5"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {getIcon(point.iconName)}
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">{point.title}</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
