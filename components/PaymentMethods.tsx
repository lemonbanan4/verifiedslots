import { Wallet, Bitcoin, CreditCard } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface PaymentMethodsProps {
  review: Casino;
}

export function PaymentMethods({ review }: PaymentMethodsProps) {
  const getPaymentIcon = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("ideal") || lowercase.includes("mifinity")) {
      return <Wallet size={16} className="text-emerald-400" />;
    }
    if (lowercase.includes("maestro")) {
      return <Wallet size={16} className="text-indigo-400" />;
    }
    if (lowercase.includes("bitcoin") || lowercase.includes("ethereum") || lowercase.includes("tether") || lowercase.includes("crypto")) {
      return <Bitcoin size={16} className="text-amber-400" />;
    }
    return <CreditCard size={16} className="text-blue-400" />;
  };

  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg text-blue-400">
          <Wallet size={20} />
        </div>
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Banking & Payments</h2>
      </div>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed">
        {review.paymentSummary}
      </p>

      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">Method</th>
              <th className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">Type</th>
              <th className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">Processing (Deposit)</th>
              <th className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">Processing (Withdrawal)</th>
              <th className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">Fees</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {review.paymentMethods.map((method, index) => (
              <tr key={index} className="border-b border-white/5 last:border-b-0">
                <td className="p-4 text-white font-medium flex items-center gap-2">
                  {getPaymentIcon(method.name)} {method.name}
                </td>
                <td className="p-4 text-slate-400 text-xs">{method.type}</td>
                <td className="p-4 text-emerald-400 font-medium">{method.depositTime}</td>
                <td className="p-4 text-slate-300 font-medium">{method.withdrawalTime}</td>
                <td className="p-4 text-slate-400 text-xs">{method.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
