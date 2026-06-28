import React from 'react';

const TrophiesTab = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="glass-card p-12 rounded-3xl text-center border-dashed border-2 border-outline-variant/40">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">military_tech</span>
        <p className="text-on-surface-variant font-label-caps">No trophies unlocked yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((item, idx) => {
        const { achievement } = item;
        return (
          <div key={idx} className="glass-card p-6 rounded-3xl flex items-center gap-6 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
            <div className={`absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-10 bg-gradient-to-r from-transparent to-primary-fixed`} />
            <div className="h-20 w-20 flex-shrink-0 bg-primary-fixed/10 rounded-2xl flex items-center justify-center border border-primary-fixed/20 shadow-[0_0_30px_rgba(98,249,238,0.1)] relative z-10">
              <span className="material-symbols-outlined text-5xl text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                {achievement.icon || 'military_tech'}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline-sm text-lg text-primary mb-1">{achievement.name}</h3>
              <p className="text-xs text-on-surface-variant mb-2">{achievement.description}</p>
              <span className={`px-3 py-1 bg-primary-fixed/20 text-primary-fixed text-[10px] font-label-caps rounded-full border border-primary-fixed/30`}>
                {achievement.rarity || 'Common'} Grade
              </span>
            </div>
          </div>
        );
      })}
      
      <button className="lg:col-span-3 w-full py-4 border-2 border-dashed border-outline-variant/40 rounded-3xl text-on-surface-variant font-label-caps text-xs hover:border-primary-fixed/40 hover:text-primary-fixed transition-all">
        + View All Badges Archive
      </button>
    </div>
  );
};

export default TrophiesTab;
