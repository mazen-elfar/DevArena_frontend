import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as battlesService from '../../services/battles.service';

export default function BattleResultPage() {
  const { battleId } = useParams();
  const navigate = useNavigate();

  const { data: battleData, isLoading } = useQuery({
    queryKey: ['battle', battleId],
    queryFn: () => battlesService.getBattle(battleId),
  });

  const { data: resultsData } = useQuery({
    queryKey: ['battleResults', battleId],
    queryFn: () => battlesService.getBattleResults(battleId),
  });

  const battle = battleData?.data;
  const results = resultsData?.data;
  const players = battle?.players || [];
  const winner = players.find(p => p.isWinner);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!battle) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-white">
        <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">error</span>
        <h2 className="text-xl font-bold mb-2">Battle Not Found</h2>
        <button onClick={() => navigate('/battles')} className="text-[#00F0FF] hover:underline">Back to Arena</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Victory Header */}
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-7xl text-[#FFD700] mb-4 block">emoji_events</span>
          <h1 className="text-4xl font-bold mb-2">
            {winner ? `${winner.user?.username} Wins!` : 'Battle Complete'}
          </h1>
          <p className="text-gray-400">{battle.quest?.title}</p>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {players.map((p) => (
            <div key={p.id} className={`glass-card rounded-xl p-5 ${p.isWinner ? 'border-[#FFD700]/30' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold overflow-hidden">
                  {p.user?.avatar ? (
                    <img src={p.user.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (p.user?.username || 'U')[0].toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-bold text-white">{p.user?.username}</p>
                  {p.isWinner && <span className="text-xs text-[#FFD700]">👑 Winner</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* XP / Rating Changes */}
        {results?.xpLogs && results.xpLogs.length > 0 && (
          <div className="glass-card rounded-xl p-5 mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">XP Earned</h3>
            {results.xpLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-gray-300">{log.description || log.source}</span>
                <span className="text-sm font-bold text-green-400">+{log.amount} XP</span>
              </div>
            ))}
          </div>
        )}

        {results?.rankHistory && results.rankHistory.length > 0 && (
          <div className="glass-card rounded-xl p-5 mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Rating Changes</h3>
            {results.rankHistory.map((rh, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-gray-300">Rating</span>
                <span className={`text-sm font-bold ${rh.newRating > rh.oldRating ? 'text-green-400' : 'text-red-400'}`}>
                  {rh.oldRating} → {rh.newRating} ({rh.newRating > rh.oldRating ? '+' : ''}{rh.newRating - rh.oldRating})
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            to="/battles"
            className="px-6 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Back to Arena
          </Link>
          <Link
            to={`/battles?rematch=${battleId}`}
            className="px-6 py-3 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] font-medium hover:bg-[#00F0FF]/20 transition-colors"
          >
            Rematch
          </Link>
        </div>
      </div>
    </div>
  );
}
