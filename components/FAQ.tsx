import { HelpCircle } from "lucide-react";
import { FAQItem } from "@/src/data/casinos";

interface FAQProps {
  faqs: FAQItem[];
}

export function FAQ({ faqs }: FAQProps) {
  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/10 border border-purple-500/20 p-2 rounded-lg text-purple-400">
          <HelpCircle size={20} />
        </div>
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-slate-900/50 border border-white/5 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-2">{faq.question}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
