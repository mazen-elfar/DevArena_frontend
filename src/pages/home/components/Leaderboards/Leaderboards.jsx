import { Crown, Medal } from "lucide-react";
import "./Leaderboards.css";

/**
 * LeaderboardsCard Component
 * @param {Object} props
 * @param {Array} props.users
 */
export function LeaderboardsCard({ users }) {
  return (
    <div className="bg-[#090d16]/80 backdrop-blur-xl border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans group leaderboard-card">
      <div className="flex items-center justify-between mb-5 z-10 text-left">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Top Performers</h2>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400">
          GLOBAL
        </div>
      </div>

      <div className="space-y-2 z-10 user-list">
        {users.map((user, i) => (
          <div
            key={user.username}
            className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-300 user-item ${
              user.isSelf ? "self" : "others"
            }`}
          >
            <div className="relative rank-container">
              <span className={`text-[10px] font-black font-mono rank-number ${
                i === 0 ? "text-amber-500" : i === 1 ? "text-slate-300" : i === 2 ? "text-orange-400" : "text-gray-500"
              }`}>
                {user.rank < 10 ? `0${user.rank}` : user.rank}
              </span>
              {i < 3 && (
                <Medal className={`absolute -top-1 -right-1 w-2.5 h-2.5 ${
                  i === 0 ? "text-amber-500" : i === 1 ? "text-slate-300" : "text-orange-400"
                }`} />
              )}
            </div>

            <div className={`w-8 h-8 rounded-lg overflow-hidden border ${user.isSelf ? "border-blue-500/40" : "border-[#1e294b]/40"} avatar`}>
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-white truncate">{user.username}</p>
                <span className="text-[10px] font-mono text-gray-400 font-bold">{user.score}</span>
              </div>
              <p className="text-[9px] text-indigo-400/70 font-bold uppercase tracking-tight">{user.title}</p>
            </div>
          </div>
        ))}
      </div>

      <button id="btn-view-full-leaderboards" className="full-link">
        VIEW FULL RANKINGS
      </button>
    </div>
  );
}
