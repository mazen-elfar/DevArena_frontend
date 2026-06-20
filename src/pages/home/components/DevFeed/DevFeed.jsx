import { MessageSquare, Heart, Share2, Hash } from "lucide-react";
import "./DevFeed.css";

/**
 * DeveloperFeed Component
 * @param {Object} props
 * @param {Array} props.feed
 */
export function DeveloperFeed({ feed }) {
  return (
    <div className="bg-[#090d16] border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans group feed-card">
      <div className="flex items-center justify-between mb-5 z-10 text-left">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Community Feed</h2>
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-0.5 rounded-lg bg-[#1e294b]/30 text-[9px] font-bold text-gray-400 hover:text-white transition-colors">Trending</button>
          <button className="px-2 py-0.5 rounded-lg bg-[#111827] text-[9px] font-bold text-blue-400 border border-blue-500/20">Recent</button>
        </div>
      </div>

      <div className="space-y-4 z-10 feed-list">
        {feed.map((post) => (
          <div key={post.id} className="p-4 rounded-2xl bg-[#0b0f19] border border-[#1e294b]/20 hover:border-[#1e294b]/40 transition-all duration-300 post-item">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#1e294b]/40 avatar">
                <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-white truncate">{post.author}</p>
                  <span className="text-[9px] font-mono text-gray-500">{post.time}</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-1.5 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5 tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-0.5 text-[8px] font-bold text-indigo-400 bg-indigo-500/5 px-1.5 py-0.5 rounded-md tag">
                      <Hash className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1e294b]/10 actions">
                   <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-pink-500 transition-colors action-btn">
                     <Heart className="w-3.5 h-3.5" /> {post.likes}
                   </button>
                   <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-blue-400 transition-colors action-btn">
                     <MessageSquare className="w-3.5 h-3.5" /> {post.comments}
                   </button>
                   <button className="ml-auto text-gray-500 hover:text-white transition-colors action-btn">
                     <Share2 className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button id="btn-join-discussion" className="join-btn">
        JOIN GLOBAL DISCUSSION
      </button>
    </div>
  );
}
