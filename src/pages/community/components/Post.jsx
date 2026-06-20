import React from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';

export function Post({ post }) {
  const { author, timestamp, content, type, data } = post;

  return (
    <article className={`post-card ${type === 'victory' ? 'border-l-4 border-indigo-500' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high overflow-hidden border border-white/5">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{author.username}</span>
                <span className={author.level >= 40 ? 'badge-champion' : 'badge-level'}>
                  {author.rank || `Level ${author.level}`}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">{timestamp}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {type === 'text' && (
          <>
            <p className="text-lg text-gray-200 mb-4 leading-relaxed">
              {content}
            </p>
            {data?.hashtags && (
              <div className="bg-[#0b0e16]/50 rounded-xl p-4 border border-white/5 font-mono text-sm text-indigo-400 mb-6 font-medium">
                {data.hashtags.join(' ')}
              </div>
            )}
          </>
        )}

        {type === 'victory' && (
          <div className="battle-victory-card mb-4 group">
            <div className="relative z-10 text-center">
              <h4 className="font-mono text-[10px] text-indigo-400 mb-2 uppercase tracking-widest">Victory Achieved</h4>
              <h2 className="text-2xl font-bold mb-6 text-white">{data.matchTitle}</h2>
              <div className="flex justify-center items-center gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-indigo-500 p-1 mb-2 bg-[#0b0e16]">
                    <img src={data.winnerLogo} alt="Winner" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{data.winnerLabel}</span>
                </div>
                <div className="text-2xl font-black text-gray-700 italic">VS</div>
                <div className="flex flex-col items-center opacity-50">
                  <div className="w-16 h-16 rounded-full border border-white/10 p-1 mb-2 grayscale bg-[#0b0e16]">
                    <img src={data.loserLogo} alt="Loser" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{data.loserLabel}</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-gray-400 max-w-sm mx-auto">
                {content}
              </p>
            </div>
          </div>
        )}

        {type === 'achievement' && (
          <div className="flex items-center gap-8 bg-[#1c2028]/30 p-6 rounded-2xl border border-white/5 mb-4">
            <div className="w-24 h-24 shrink-0 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin-slow"></div>
              <span className="text-3xl font-black text-indigo-500 italic">{data.milestone}</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">{data.title}</h4>
              <p className="text-gray-400 text-sm">{content}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 pt-4 border-t border-white/5">
          <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors group">
            <Heart size={18} className={data?.liked ? 'fill-indigo-500 text-indigo-500' : ''} />
            <span className="text-xs font-mono">{data?.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors">
            <MessageSquare size={18} />
            <span className="text-xs font-mono">{data?.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors ml-auto">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
