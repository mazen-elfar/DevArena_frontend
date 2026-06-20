import React from 'react';
import { TrendingUp, Award, UserPlus } from 'lucide-react';

export function RightPanel({ trending, topDevelopers, onlineFriends }) {
  return (
    <aside className="hidden lg:flex flex-col gap-8 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-2">
      {/* Trending Discussions */}
      <section className="glass-panel p-6 rounded-2xl">
        <h3 className="font-mono text-[10px] text-gray-500 mb-6 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={16} />
          Trending
        </h3>
        <div className="flex flex-col gap-5">
          {trending.map((topic, i) => (
            <a key={i} className="group cursor-pointer" href="#">
              <p className="text-indigo-400 font-bold text-sm group-hover:underline">#{topic.tag}</p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">{topic.posts} active discussions</p>
            </a>
          ))}
        </div>
        <button className="w-full mt-6 text-indigo-400 text-[10px] font-mono text-center hover:opacity-80 transition-opacity">
          View All
        </button>
      </section>

      {/* Leaderboard/Top Developers */}
      <section className="glass-panel p-6 rounded-2xl">
        <h3 className="font-mono text-[10px] text-gray-500 mb-6 uppercase tracking-widest flex items-center gap-2">
          <Award size={16} />
          Top Developers
        </h3>
        <div className="flex flex-col gap-4">
          {topDevelopers.map((dev, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg font-black text-indigo-500/20 italic w-6">0{i + 1}</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-white/5">
                <img src={dev.avatar} alt={dev.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{dev.username}</p>
                <p className="text-[10px] text-gray-500 font-mono">{dev.xp} XP This Week</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Friends */}
      <section className="glass-panel p-6 rounded-2xl">
        <h3 className="font-mono text-[10px] text-gray-500 mb-6 uppercase tracking-widest flex items-center justify-between">
          <span>Online Friends</span>
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
        </h3>
        <div className="flex flex-col gap-4">
          {onlineFriends.map((friend, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-white/5">
                  <img src={friend.avatar} alt={friend.username} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#10131b]"></div>
              </div>
              <span className="text-sm text-gray-300 font-medium">{friend.username}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested For You */}
      <section className="p-2">
        <h3 className="font-mono text-[10px] text-gray-500 mb-6 uppercase tracking-widest">Suggested For You</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high overflow-hidden border border-white/5">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7-48E048DEuFiYM1vqXtAQyhIjBlzodbjjiIrGwb7un6JShdaPuvuco7U1cJM_xHNAspearjqaf3fGBzg8kX3ksABqRBJvt7mzzYwkpPgT0VpiNcrjiKgJDQ1Hk-BZrlG79fXUZceFH9quNaMjFnWXXHv13s4Ts1V7RCzi1RzBwp2nQeg7BK5Ivo83eYbsgKnH34XwUhyNZ5OaJHV49t4BzivWK_tJXxaaop9nKyJyNtfoJdIzuwrtBF20xayDImzUJdhSYi1Q" alt="Suggestion" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm text-white">jason_flow</span>
            </div>
            <button className="text-indigo-400 text-[10px] font-mono hover:underline">Follow</button>
          </div>
        </div>
      </section>
    </aside>
  );
}
