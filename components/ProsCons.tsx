import { CheckCircle2, XCircle } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col h-full gap-4">
      <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">The Honest Verdict</h2>
      
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5">
        <h3 className="text-xs font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase">
          <CheckCircle2 size={16} /> Advantages
        </h3>
        <ul className="space-y-3">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 text-xs">
              <span className="text-emerald-500 shrink-0">•</span>
              <span className="leading-relaxed">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-5 flex-1">
        <h3 className="text-xs font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase">
          <XCircle size={16} /> Disadvantages
        </h3>
        <ul className="space-y-3">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 text-xs">
              <span className="text-rose-500 shrink-0">•</span>
              <span className="leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
