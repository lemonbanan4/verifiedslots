import { Gamepad2, PlaySquare, Dice5, UserRound } from "lucide-react";
import { Casino } from "@/src/data/casinos";

interface GameVarietyProps {
  review: Casino;
}

export function GameVariety({ review }: GameVarietyProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "slots":
        return <PlaySquare size={16} className="text-indigo-400" />;
      case "dice":
        return <Dice5 size={16} className="text-amber-400" />;
      default:
        return <UserRound size={16} className="text-emerald-400" />;
    }
  };

  return (
    <section className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg text-emerald-400">
            <Gamepad2 size={20} />
          </div>
          <h2 className="text-sm font-display font-bold text-blue-400 uppercase tracking-tight">Game Library & Variety</h2>
        </div>
        
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          {review.gameSummary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {review.gameCategories.map((category, index) => (
            <div key={index} className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[180px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {getIcon(category.iconName)}
                  <h3 className="text-xs font-display font-bold text-white">{category.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {category.description}
                </p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-2 border-t border-white/5 pt-2">
                Notable: {category.notable}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
