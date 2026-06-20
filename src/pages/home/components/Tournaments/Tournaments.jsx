import { Trophy, Tv, ExternalLink } from "lucide-react";
import "./Tournaments.css";

/**
 * DailyTournaments Component
 * @param {Object} props
 * @param {Object} props.bracket
 * @param {Function} props.onViewBracket
 * @param {Function} props.onSimulateMatch
 */
export function DailyTournaments({ bracket, onViewBracket, onSimulateMatch }) {
  return (
    <div className="bg-[#090d16] border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans w-full h-[370px] flex flex-col justify-between tournament-card">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between z-10 text-left">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> Daily Tournaments
          </h2>
          <p className="text-[10px] text-gray-500 mt-1 font-mono sub-title">Bracket: Single Elimination</p>
        </div>
        <span className="live-badge animate-pulse">
          <span className="dot" /> Live Now
        </span>
      </div>

      <div className="flex-1 my-3 overflow-y-auto pr-1 space-y-2 match-list">
        {bracket.quarterFinals.concat(bracket.semiFinals).map((match) => {
          const isLive = match.status === "live";
          const isCompleted = match.status === "completed";

          return (
            <div key={match.id} className={`match-item ${isLive ? "live" : "pending"}`}>
              <div className="flex items-center justify-between text-left">
                <div className="players-info flex-1 min-w-0">
                  <div className="player-row">
                    <span className="name truncate">{match.player1}</span>
                    <span className="rating">{match.rating1}</span>
                  </div>
                  <div className="player-row">
                    <span className="name truncate">{match.player2}</span>
                    <span className="rating">{match.rating2}</span>
                  </div>
                </div>

                <div className="divider" />

                <div className="action-area">
                  {isLive ? (
                    <button
                      onClick={() => onSimulateMatch(match.id)}
                      id={`btn-simulate-${match.id}`}
                      className="sim-button"
                    >
                      <Tv className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span className="text-[8px] font-bold uppercase">Sim</span>
                    </button>
                  ) : isCompleted ? (
                    <div className="score-display">
                      <span className="score">{match.score1} : {match.score2}</span>
                    </div>
                  ) : (
                    <span className="status-tbd">TBD</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onViewBracket}
        id="btn-view-bracket-modal"
        className="footer-button"
      >
        <span>View In-depth Bracket</span>
        <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
      </button>
    </div>
  );
}
