import { Gift } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface BonusComparisonProps {
  review: Casino;
}

export function BonusComparison({ review }: BonusComparisonProps) {
  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-2 rounded-lg text-indigo-400">
          <Gift size={20} />
        </div>
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Bonus Comparison</h2>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">Metric</th>
              <th className="p-4 font-bold text-blue-400 bg-blue-500/10 text-xs uppercase tracking-wider">{review.name}</th>
              <th className="p-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Regulated Standard</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-white/5">
              <td className="p-4 text-slate-300 font-medium">Match Offer</td>
              <td className="p-4 text-white font-semibold bg-blue-500/5">{review.bonusMatchOffer}</td>
              <td className="p-4 text-slate-400">100% up to €250 (or equivalent)</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4 text-slate-300 font-medium">Wagering Req.</td>
              <td className="p-4 font-semibold bg-blue-500/5 text-slate-350">{review.bonusWagering}</td>
              <td className="p-4 text-slate-400">30x-35x (Bonus Only) or 1x on Free Spins</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4 text-slate-300 font-medium">Minimum Deposit</td>
              <td className="p-4 text-white font-semibold bg-blue-500/5">{review.bonusMinDeposit}</td>
              <td className="p-4 text-slate-400">€10</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4 text-slate-300 font-medium">Validity Period</td>
              <td className="p-4 text-white font-semibold bg-blue-500/5">{review.bonusValidity}</td>
              <td className="p-4 text-slate-400">30 Days</td>
            </tr>
            <tr>
              <td className="p-4 text-slate-300 font-medium">Max Bet w/ Bonus</td>
              <td className="p-4 text-white font-semibold bg-blue-500/5">{review.bonusMaxBet}</td>
              <td className="p-4 text-slate-400">€5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
