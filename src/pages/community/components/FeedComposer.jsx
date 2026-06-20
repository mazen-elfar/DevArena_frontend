import React from 'react';
import { Image, Terminal, BarChart2 } from 'lucide-react';

export function FeedComposer({ userAvatar }) {
  return (
    <div className="glass-panel p-6 rounded-2xl mb-8">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-high shrink-0 overflow-hidden border border-white/5">
          <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
        </div>
        <textarea 
          className="composer-textarea" 
          placeholder="Share your latest build or challenge..."
        ></textarea>
      </div>
      <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-4">
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-indigo-400 flex items-center gap-2 transition-colors">
            <Image size={20} />
          </button>
          <button className="text-gray-500 hover:text-indigo-400 flex items-center gap-2 transition-colors">
            <Terminal size={20} />
          </button>
          <button className="text-gray-500 hover:text-indigo-400 flex items-center gap-2 transition-colors">
            <BarChart2 size={20} />
          </button>
        </div>
        <button className="bg-indigo-500/10 text-indigo-400 px-6 py-1.5 rounded-full font-mono text-sm hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
          Post
        </button>
      </div>
    </div>
  );
}
