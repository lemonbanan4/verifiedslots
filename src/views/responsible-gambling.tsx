"use client";

import React, { useState } from "react";
import { useCompliance } from "@/src/context/ComplianceContext";
import { HeartPulse, CheckSquare, Phone, ShieldAlert, Award } from "lucide-react";

export function ResponsibleGamblingPage() {
  const { isDutch } = useCompliance();
  const isNl = isDutch;

  // Self assessment state
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = isNl ? [
    "Speelt u wel eens langer of met meer geld dan u vooraf had gepland?",
    "Heeft u wel eens gelogen over de hoeveelheid geld of tijd die u besteedt aan gokken?",
    "Heeft u wel eens geld geleend of bezittingen verkocht om te kunnen gokken?",
    "Gokt u wel eens om te ontsnappen aan stress, verveling, zorgen of verdriet?",
    "Heeft gokken wel eens geleid tot ruzie met familie, vrienden of partners?",
    "Heeft u wel eens geprobeerd uw gokverliezen direct terug te winnen (chasing losses)?"
  ] : [
    "Have you ever gambled for longer or spent more money than you planned?",
    "Have you ever lied to cover up the amount of money or time you spend gambling?",
    "Have you ever borrowed money or sold assets to finance your gambling?",
    "Do you gamble to escape stress, boredom, anxiety, or depression?",
    "Has gambling ever caused arguments, financial strain, or relationship issues?",
    "Have you ever tried to win back lost money immediately (chasing losses)?"
  ];

  const handleAnswer = (index: number, value: boolean) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter(v => v === true).length;
    return yesCount;
  };

  const getVerdict = (score: number) => {
    if (isNl) {
      if (score === 0) return "Geen indicatie van gokproblemen. Speel bewust en houd uw limieten aan.";
      if (score <= 2) return "Laag risico. Wees voorzichtig en overweeg om lagere limieten in te stellen.";
      if (score <= 4) return "Matig risico. Uw speelgedrag vertoont zorgwekkende signalen. We adviseren een speelpauze en contact met Loket Kansspel.";
      return "Hoog risico. Het is zeer waarschijnlijk dat u gokproblemen ervaart. We raden u ten zeerste aan om u direct in te schrijven in het CRUKS-register en professionele hulp te zoeken.";
    } else {
      if (score === 0) return "No indicators of problem gambling. Continue playing responsibly and monitor your limits.";
      if (score <= 2) return "Low risk. Be cautious and consider setting strict time and spending controls.";
      if (score <= 4) return "Moderate risk. Your habits show warnings. We strongly suggest taking a timeout and seeking support.";
      return "High risk. You are displaying strong indicators of gambling addiction. We recommend self-exclusion and seeking professional therapy.";
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto my-6 text-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center justify-center gap-3">
          <HeartPulse className="text-rose-500" size={32} />
          {isNl ? "Verantwoord Spelen" : "Responsible Gambling"}
        </h1>
        <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full"></div>
        <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          {isNl 
            ? "Gokken moet entertainment blijven. Als het een probleem wordt, zijn wij er om u te helpen de controle terug te krijgen."
            : "Gambling should always remain a source of entertainment. If you feel you are losing control, confidential support is available."}
        </p>
      </div>

      {/* Interactive Self-Assessment */}
      <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl mb-10">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CheckSquare className="text-rose-400" size={20} />
          {isNl ? "Zelftest Speelgedrag" : "Interactive Self-Assessment"}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          {isNl 
            ? "Beantwoord de volgende vragen eerlijk om inzicht te krijgen in uw risicoprofiel."
            : "Answer the following questions honestly to evaluate your current gambling profile."}
        </p>

        <div className="space-y-4 mb-6">
          {questions.map((question, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-xs text-slate-300 pr-4">{question}</span>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleAnswer(idx, true)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    answers[idx] === true 
                      ? "bg-rose-500 text-white" 
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {isNl ? "Ja" : "Yes"}
                </button>
                <button
                  onClick={() => handleAnswer(idx, false)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    answers[idx] === false 
                      ? "bg-slate-600 text-white" 
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {isNl ? "Nee" : "No"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {allAnswered && !showResult && (
          <button
            onClick={() => setShowResult(true)}
            className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {isNl ? "Bekijk Resultaat" : "See Assessment Results"}
          </button>
        )}

        {showResult && (
          <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl mt-6 animate-pulse">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">
              {isNl ? "Zelftest Resultaat" : "Assessment Verdict"}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {getVerdict(calculateScore())}
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setShowResult(false);
              }}
              className="mt-4 text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
            >
              {isNl ? "Opnieuw testen" : "Test Again"}
            </button>
          </div>
        )}
      </div>

      {/* Helplines and Resources */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Phone className="text-emerald-400" size={18} />
            {isNl ? "Hulplijnen Nederland" : "Netherlands Resources"}
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <p className="font-bold text-slate-200">Loket Kansspel</p>
              <p className="text-slate-400 mt-1">24/7 Gratis en vertrouwelijk advies en begeleiding.</p>
              <p className="text-emerald-400 font-semibold mt-1">Telefoon: 0800-2400022</p>
              <a href="https://www.loketkansspel.nl" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 block">www.loketkansspel.nl</a>
            </div>
            <div className="border-t border-white/5 pt-3">
              <p className="font-bold text-slate-200">CRUKS Register</p>
              <p className="text-slate-400 mt-1">Centraal Register Uitsluiting Kansspelen. Blokkeer uzelf direct voor alle fysieke en online casino's in NL.</p>
              <a href="https://www.cruksregister.nl" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 block">www.cruksregister.nl</a>
            </div>
            <div className="border-t border-white/5 pt-3">
              <p className="font-bold text-slate-200">Stichting AGOG</p>
              <p className="text-slate-400 mt-1">Zelfhulpgroepen voor gokverslaafden en hun naasten.</p>
              <a href="https://www.agog.nl" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 block">www.agog.nl</a>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Phone className="text-blue-400" size={18} />
            {isNl ? "Internationale Hulporganisaties" : "International Resources"}
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <p className="font-bold text-slate-200">Gamblers Anonymous</p>
              <p className="text-slate-400 mt-1">Global fellowship of individuals sharing experiences to recover from gambling problems.</p>
              <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 block">www.gamblersanonymous.org</a>
            </div>
            <div className="border-t border-white/5 pt-3">
              <p className="font-bold text-slate-200">Gambling Therapy</p>
              <p className="text-slate-400 mt-1">Free online support, helpline chats, and forums in multiple languages.</p>
              <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 block">www.gamblingtherapy.org</a>
            </div>
            <div className="border-t border-white/5 pt-3">
              <p className="font-bold text-slate-200">BeGambleAware</p>
              <p className="text-slate-400 mt-1">UK-based independent charity offering free, confidential help and resources online.</p>
              <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 block">www.begambleaware.org</a>
            </div>
          </div>
        </div>
      </div>

      {/* Enforcement warning banner */}
      <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex gap-3 items-start">
        <ShieldAlert className="text-rose-400 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
            {isNl ? "Wettelijk Toezicht" : "Age Restriction Notice"}
          </h4>
          <p className="text-[10px] text-slate-450 leading-relaxed">
            {isNl 
              ? "Overeenkomstig de regelgeving van de Kansspelautoriteit (KSA) is deelname aan online kansspelen verboden voor personen onder de 18 jaar. Onze reviews zijn uitsluitend bestemd voor meerderjarigen."
              : "Participation in real-money online gaming is strictly restricted to individuals aged 18 or older. Affiliated review indexes are designed exclusively for adult audiences."}
          </p>
        </div>
      </div>
    </div>
  );
}
