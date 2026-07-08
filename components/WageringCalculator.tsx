"use client";

import React, { useState } from "react";
import { Calculator, HelpCircle, ShieldAlert, BadgeDollarSign } from "lucide-react";

interface WageringCalculatorProps {
  wageringMultiplier: string; // e.g. "30x", "40x"
  bonusText: string;
}

export function WageringCalculator({ wageringMultiplier, bonusText }: WageringCalculatorProps) {
  // Parse wagering multiplier (e.g. "40x" -> 40)
  const defaultMultiplier = parseInt(wageringMultiplier.replace(/[^0-9]/g, "")) || 35;

  const [deposit, setDeposit] = useState<number>(100);
  const [matchPercentage, setMatchPercentage] = useState<number>(100);
  const [multiplier, setMultiplier] = useState<number>(defaultMultiplier);

  // Calculate values
  const bonusAmount = (deposit * matchPercentage) / 100;
  const wagerBonusOnly = bonusAmount * multiplier;
  const wagerDepositAndBonus = (deposit + bonusAmount) * multiplier;

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 optimize-gpu">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
          <Calculator size={16} />
        </div>
        <h3 className="text-xs font-display font-bold text-blue-400 uppercase tracking-tight">Playthrough Wager Calculator</h3>
      </div>

      <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
        Verify the wagering threshold required to release bonus funds into cash payouts.
      </p>

      {/* Input Fields */}
      <div className="space-y-3.5 mb-5 text-[11px]">
        {/* Deposit Input */}
        <div>
          <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wide">Deposit Amount (€)</label>
          <input
            type="number"
            value={deposit || ""}
            onChange={(e) => setDeposit(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-950/60 border border-white/10 focus:border-blue-500 rounded-xl px-3 py-2 text-white font-mono outline-none transition-colors"
            placeholder="Enter deposit amount..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Match % Input */}
          <div>
            <label className="block text-slate-400 font-bold min-h-[32px] flex items-end pb-1.5 uppercase tracking-wide">Bonus Match %</label>
            <input
              type="number"
              value={matchPercentage || ""}
              onChange={(e) => setMatchPercentage(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-950/60 border border-white/10 focus:border-blue-500 rounded-xl px-3 py-2 text-white font-mono outline-none transition-colors"
              placeholder="Match %..."
            />
          </div>

          {/* Wagering Multiplier Input */}
          <div>
            <label className="block text-slate-400 font-bold min-h-[32px] flex items-end pb-1.5 uppercase tracking-wide">Playthrough Multiplier</label>
            <input
              type="number"
              value={multiplier || ""}
              onChange={(e) => setMultiplier(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-950/60 border border-white/10 focus:border-blue-500 rounded-xl px-3 py-2 text-white font-mono outline-none transition-colors"
              placeholder="Multiplier..."
            />
          </div>
        </div>
      </div>

      {/* Math Results */}
      <div className="bg-slate-950/40 border border-white/5 rounded-xl p-3.5 space-y-3.5 mb-4 text-[11px]">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Bonus Received:</span>
          <span className="font-mono font-bold text-white">{formatCurrency(bonusAmount)}</span>
        </div>

        {/* Calculation A: Bonus Only */}
        <div className="flex justify-between items-center border-t border-white/5 pt-2.5">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">A. Wagering (Bonus Only):</span>
            <span className="group relative cursor-pointer text-slate-500">
              <HelpCircle size={11} />
              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:block w-40 bg-slate-900 border border-white/10 p-2 rounded text-[8px] text-slate-350 leading-relaxed shadow-xl">
                Wagering applies ONLY to the bonus funds (e.g. €{bonusAmount} × {multiplier}x).
              </span>
            </span>
          </div>
          <span className="font-mono font-extrabold text-emerald-400">{formatCurrency(wagerBonusOnly)}</span>
        </div>

        {/* Calculation B: Deposit + Bonus */}
        <div className="flex justify-between items-center border-t border-white/5 pt-2.5">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">B. Wagering (Deposit + Bonus):</span>
            <span className="group relative cursor-pointer text-slate-500">
              <HelpCircle size={11} />
              <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:block w-40 bg-slate-900 border border-white/10 p-2 rounded text-[8px] text-slate-350 leading-relaxed shadow-xl">
                Wagering applies to BOTH deposit and bonus funds (e.g. (€{deposit} + €{bonusAmount}) × {multiplier}x).
              </span>
            </span>
          </div>
          <span className="font-mono font-extrabold text-amber-400">{formatCurrency(wagerDepositAndBonus)}</span>
        </div>
      </div>

      <div className="flex items-start gap-1.5 text-[9px] text-slate-450 leading-relaxed">
        <ShieldAlert size={12} className="text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Reality Check:</strong> If the terms specify wagering applies to (Deposit + Bonus), you must wager a total of <strong className="text-white">{formatCurrency(wagerDepositAndBonus)}</strong> before withdrawal options are unlocked.
        </span>
      </div>
    </div>
  );
}
