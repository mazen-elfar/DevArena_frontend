import { useState, useEffect } from "react";
import { Tv, Zap, Swords, Trophy, Activity, AlertTriangle } from "lucide-react";
import "./MatchSimulatorModal.css";

/**
 * MatchSimulatorModal Content
 * @param {Object} props
 * @param {Object} props.match
 */
export function MatchSimulatorModal({ match }) {
  const [simulationLog, setSimulationLog] = useState([
    { time: "00:00", text: "Match initialization... Bracket check." },
    { time: "00:05", text: "Syncing environment... Arena Ready." }
  ]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!match) return;

    const logs = [
      `Challenge set: ${match.player1} vs ${match.player2}.`,
      "Problem: Maximum Subarray Sum (O(N) restriction).",
      `${match.player1} starts implementation...`,
      `${match.player2} uses DP approach.`,
      "Critical Section: Handling negative integers.",
      `${match.player1} submitting... TLE detected!`,
      `${match.player2} optimized space complexity.`,
      "Result calculated. Closing simulation."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setSimulationLog((prev) => [
          ...prev, 
          { time: `00:${(currentLog + 1) * 7}`.padEnd(5, "0"), text: logs[currentLog] }
        ]);
        setProgress((currentLog + 1) * (100 / logs.length));
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [match]);

  if (!match) return null;

  return (
    <div className="flex flex-col h-[500px] font-mono match-simulator">
      <div className="p-8 bg-gradient-to-b from-[#0d1222] to-[#04060a] border-b border-[#1e294b]/30">
        <div className="flex items-center justify-between mb-8">
           <div className="flex flex-col items-center gap-3 flex-1 text-center">
              <div className="w-16 h-16 rounded-2xl border-2 border-blue-500/30 overflow-hidden avatar">
                <img src={match.avatar1} alt={match.player1} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase">{match.player1}</p>
                <p className="text-[10px] text-blue-400 font-bold">{match.rating1} PTS</p>
              </div>
           </div>

           <div className="flex flex-col items-center gap-2 px-8">
              <Swords className="w-8 h-8 text-rose-500 animate-pulse" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">VS</span>
           </div>

           <div className="flex flex-col items-center gap-3 flex-1 text-center">
              <div className="w-16 h-16 rounded-2xl border-2 border-indigo-500/30 overflow-hidden avatar">
                <img src={match.avatar2} alt={match.player2} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase">{match.player2}</p>
                <p className="text-[10px] text-indigo-400 font-bold">{match.rating2} PTS</p>
              </div>
           </div>
        </div>

        <div className="space-y-2">
           <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-blue-500" />
                SIMULATION PROGRESS
              </div>
              <span>{Math.round(progress)}%</span>
           </div>
           <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
           </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-[#05070a] space-y-3 log-container">
        {simulationLog.map((log, i) => (
          <div key={i} className="flex gap-4 text-xs animate-in slide-in-from-left-2 duration-300">
            <span className="text-gray-600 font-bold flex-shrink-0">{log.time}</span>
            <span className="text-blue-100/80 leading-snug">{log.text}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#0d1222] border-t border-[#1e294b]/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-orange-500 font-bold">
           <AlertTriangle className="w-3.5 h-3.5" />
           REAL-TIME HEURISTICS ACTIVE
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             SERVER: US-EAST
           </div>
        </div>
      </div>
    </div>
  );
}
