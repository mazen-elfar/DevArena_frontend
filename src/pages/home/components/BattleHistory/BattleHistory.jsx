import { Swords, Zap, ExternalLink } from "lucide-react";
import "./BattleHistory.css";

/**
 * BattleHistoryCard Component
 * @param {Object} props
 * @param {Array} props.history
 */
export function BattleHistoryCard({ history }) {
  return (
    <div className="bg-[#090d16]/80 backdrop-blur-xl border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans group history-card">
      <div className="flex items-center justify-between mb-5 z-10 text-left">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Battle Log</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-500 font-bold">W-L: 4-1</span>
        </div>
      </div>

      <div className="space-y-2 z-10 history-list">
        {history.map((battle) => (
          <div key={battle.id} className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#0b0f19] border border-[#1e294b]/20 hover:border-indigo-500/20 transition-all duration-300 battle-item">
            <div className={`w-1 rounded-full self-stretch ${battle.type === "Victory" ? "bg-emerald-500" : "bg-rose-500"}`} />
            
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#1e294b]/40 avatar">
              <img src={battle.opponentAvatar} alt={battle.opponent} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-white truncate">vs {battle.opponent}</p>
                <span className={`text-[10px] font-mono font-bold ${battle.type === "Victory" ? "text-emerald-500" : "text-rose-500"}`}>
                  {battle.type === "Victory" ? `+${battle.ratingChange}` : battle.ratingChange}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[9px] text-gray-500 uppercase tracking-tight">{battle.subType} • {battle.time}</p>
                <div className="flex items-center gap-1 text-[9px] text-gray-600 font-mono">
                  <Zap className="w-2.5 h-2.5" /> {battle.score}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button id="btn-view-replays" className="replays-btn">
        <span>View Match Replays</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
