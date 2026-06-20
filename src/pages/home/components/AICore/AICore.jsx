import { Brain, ChevronRight } from "lucide-react";
import "./AICore.css";

/**
 * AICoreCard Component
 * @param {Object} props
 * @param {Function} props.onOpenInsights
 * @param {number} props.rating
 */
export function AICoreCard({ onOpenInsights, rating }) {
  return (
    <div className="bg-[#090d16] border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans w-full h-[370px] flex flex-col justify-between group ai-core-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-display">AI Core</h2>
        </div>
        <span className="badge-pro">GRANDMASTER</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-4">
        <div onClick={onOpenInsights} className="relative w-32 h-32 flex items-center justify-center select-none cursor-pointer core-hex-trigger">
          <div className="absolute inset-0 hex-glow" />
          <div className="hex-container flex items-center justify-center relative">
             <div className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/30 hex-shape" />
             <div className="relative p-6 bg-[#0d1020] border border-indigo-400/40 rounded-2xl inner-hex shadow-[inset_0_0_20px_rgba(99,102,241,0.2)]">
                <svg className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8M9 12h6" strokeWidth="2" strokeLinecap="round" />
                </svg>
             </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Grandmaster AI</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
             <span className="text-[11px] text-gray-500 font-bold uppercase font-mono">Rating:</span>
             <span className="text-2xl font-black text-white font-mono">{rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 z-10 pt-4 border-t border-[#1e294b]/20">
        <div className="flex items-center justify-between text-[10px] font-mono prog-header">
          <span className="label text-gray-500">Distribution Scale</span>
          <span className="highlight-text text-indigo-400 font-bold uppercase">Top 0.3% of dev</span>
        </div>
        <div className="flex items-center gap-2">
           <button
            onClick={onOpenInsights}
            id="btn-ai-insights-core"
            className="flex-1 py-2.5 bg-[#0d0f19] border border-indigo-500/20 rounded-xl text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:border-indigo-500/40 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            View AI Insights <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
