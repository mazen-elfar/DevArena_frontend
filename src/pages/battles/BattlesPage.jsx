import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as battlesService from '../../services/battles.service';
import { Sidebar } from '../home/components/Sidebar/Sidebar';
import '../home/components/Sidebar/Sidebar.css';

const MODES = [
  { id: 'RANKED', title: 'Ranked', icon: 'emoji_events', color: '#FFD700', desc: 'Compete for rating' },
  { id: 'CLASSIC', title: 'Classic', icon: 'swords', color: '#00F0FF', desc: 'Standard 1v1 battle' },
  { id: 'PRACTICE', title: 'Practice', icon: 'fitness_center', color: '#10b981', desc: 'Practice solo' },
  { id: 'FRIEND', title: 'Friendly', icon: 'group', color: '#8b5cf6', desc: 'Challenge a friend' },
];

export default function BattlesPage() {
  const navigate = useNavigate();

  // Fetch leaderboard
  const { data: leaderboard } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => battlesService.getLeaderboard({ page: 1, limit: 10 }),
  });

  // Fetch battle history
  const { data: battlesData, isLoading } = useQuery({
    queryKey: ['battles'],
    queryFn: () => battlesService.getBattles({ page: 1, limit: 20 }),
  });

  const handleModeSelect = (mode) => {
    if (mode === 'RANKED') {
      navigate('/battles/matchmaking');
    } else if (mode === 'PRACTICE') {
      navigate('/battles/create?mode=PRACTICE');
    } else if (mode === 'FRIEND') {
      navigate('/battles/create?mode=FRIEND');
    } else {
      navigate('/battles/create?mode=CLASSIC');
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden font-sans">
      <Sidebar activeTab="battles" />
      <main className="flex-1 ml-64 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#818cf8]">
              Battle Arena
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Code. Compete. Conquer.</p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeSelect(mode.id)}
              className="glass-card p-6 rounded-2xl text-left hover:scale-[1.02] transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${mode.color}15` }}>
                <span className="material-symbols-outlined text-2xl" style={{ color: mode.color }}>{mode.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{mode.title}</h3>
              <p className="text-sm text-gray-400">{mode.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Battle History */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Recent Battles</h2>
            {isLoading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="glass-card rounded-xl p-4 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : battlesData?.data?.items?.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center">
                <span className="material-symbols-outlined text-5xl text-gray-600 mb-3">swords</span>
                <p className="text-gray-400">No battles yet. Start your first battle!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {battlesData?.data?.items?.map((battle) => (
                  <BattleHistoryCard key={battle.id} battle={battle} onClick={() => navigate(`/battles/${battle.id}`)} />
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              {leaderboard?.data?.items?.map((player, index) => (
                <div key={player.id} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
                  <span className={`w-6 text-center font-bold text-sm ${index < 3 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold overflow-hidden">
                    {player.avatar ? (
                      <img src={player.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (player.username || 'U')[0].toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{player.username}</p>
                    <p className="text-xs text-gray-500">Lv.{player.level}</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-[#00F0FF]">{player.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

function BattleHistoryCard({ battle, onClick }) {
  const players = battle.players || [];
  const isWin = players.find(p => p.isWinner)?.userId === battle.players?.[0]?.userId;

  return (
    <button onClick={onClick} className="glass-card rounded-xl p-4 w-full text-left hover:bg-white/5 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
            battle.mode === 'RANKED' ? 'bg-[#FFD700]/10 text-[#FFD700]' :
            battle.mode === 'CLASSIC' ? 'bg-[#00F0FF]/10 text-[#00F0FF]' :
            'bg-gray-700 text-gray-300'
          }`}>
            {battle.mode}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs ${
            battle.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400' :
            battle.status === 'IN_PROGRESS' ? 'bg-yellow-500/10 text-yellow-400' :
            'bg-gray-700 text-gray-400'
          }`}>
            {battle.status}
          </span>
        </div>
        <span className="text-xs text-gray-500">{new Date(battle.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span>{battle.quest?.title || 'Unknown Quest'}</span>
        <span className="text-gray-600">·</span>
        <span>{players.length} players</span>
      </div>
    </button>
  );
}
