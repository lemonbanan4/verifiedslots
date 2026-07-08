import { Casino } from "@/src/data/casinos";

interface ComparisonProps {
  review: Casino;
}

export function Comparison({ review }: ComparisonProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-emerald-400";
      case "danger":
        return "text-rose-400 font-semibold";
      case "warning":
        return "text-amber-400 font-semibold";
      default:
        return "text-slate-400";
    }
  };

  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-6">{review.comparisonTitle}</h2>
      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="p-5 font-semibold text-slate-300 text-sm uppercase tracking-wider">Feature</th>
              <th className="p-5 font-bold text-blue-400 bg-blue-500/10 text-sm uppercase tracking-wider">{review.name}</th>
              <th className="p-5 font-semibold text-slate-500 text-sm uppercase tracking-wider">Regulated Standard</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-base">
            {review.comparisonRows.map((row, index) => (
              <tr key={index} className="border-b border-white/5 last:border-b-0">
                <td className="p-5 text-slate-300 font-medium">{row.feature}</td>
                <td className={`p-5 bg-blue-500/5 ${getStatusColor(row.status)}`}>{row.thisCasino}</td>
                <td className="p-5 text-slate-400">{row.regulatedStandard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
