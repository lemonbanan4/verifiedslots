import { HeartPulse, Clock, Euro, ShieldBan, ShieldAlert } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface ResponsibleGamblingProps {
  review: Casino;
}

export function ResponsibleGambling({ review }: ResponsibleGamblingProps) {
  const getIcon = (iconName: string, status: string) => {
    const colorClass =
      status === "success" || status === "supported"
        ? "text-emerald-400"
        : status === "warning"
        ? "text-amber-400"
        : "text-rose-455";

    switch (iconName) {
      case "euro":
        return <Euro size={16} className={colorClass} />;
      case "clock":
        return <Clock size={16} className={colorClass} />;
      case "ban":
        return <ShieldBan size={16} className={colorClass} />;
      default:
        return <ShieldAlert size={16} className={colorClass} />;
    }
  };

  return (
    <section className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
            <HeartPulse size={20} />
          </div>
          <h2 className="text-sm font-display font-bold text-rose-455 uppercase tracking-tight">Responsible Gambling</h2>
        </div>

        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          {review.rgSummary || "No detailed responsible gambling tools reported. Players are advised to manually configure self-exclusion via regional helplines."}
        </p>

        {review.rgTools && review.rgTools.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {review.rgTools.map((tool, index) => (
              <div 
                key={index} 
                className={`bg-slate-950/40 border rounded-2xl p-5 flex flex-col justify-between min-h-[140px] ${
                  tool.status === "success" || tool.status === "supported"
                    ? "border-emerald-500/20"
                    : tool.status === "warning"
                    ? "border-amber-500/20"
                    : "border-rose-500/20"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {getIcon(tool.iconName, tool.status)}
                    <h3 className="text-xs font-display font-bold text-white">{tool.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
