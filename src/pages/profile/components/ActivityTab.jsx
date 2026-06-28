import React from 'react';

const ACTIVITY_CONFIG = {
  POST: { icon: 'sports_esports', color: 'bg-surface-container-high border-outline-variant text-on-surface-variant' },
  COMMENT: { icon: 'comment', color: 'bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed' },
  QUEST_COMPLETION: { icon: 'code', color: 'bg-secondary/20 border border-secondary/30 text-secondary' },
  BATTLE_RESULT: { icon: 'history_edu', color: 'bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed' },
  ACHIEVEMENT: { icon: 'military_tech', color: 'bg-primary-container/20 border border-primary-container/30 text-primary-container' },
  RANK_CHANGE: { icon: 'trending_up', color: 'bg-secondary-container/20 border border-secondary-container/30 text-secondary-fixed' },
  TOURNAMENT_RESULT: { icon: 'emoji_events', color: 'bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed' },
};

const ActivityTab = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="glass-card p-12 rounded-3xl text-center border-dashed border-2 border-outline-variant/40">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">history</span>
        <p className="text-on-surface-variant font-label-caps">No recent activity found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {logs.map((log, idx) => {
        const config = ACTIVITY_CONFIG[log.type] || ACTIVITY_CONFIG.POST;
        const isBattle = log.type === 'BATTLE_RESULT';
        
        return (
          <div key={log.id || idx} className="flex gap-6 group">
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform ${config.color}`}>
                <span className="material-symbols-outlined text-xl">
                  {config.icon}
                </span>
              </div>
              {idx !== logs.length - 1 && <div className="w-0.5 h-full bg-outline-variant/30 -mt-1" />}
            </div>
            <div className="pb-8 flex-1">
              <div className={`glass-card p-5 rounded-2xl ${isBattle ? 'border-l-4 border-l-primary-fixed-dim' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-lg text-primary">{log.title}</h3>
                  <span className="font-label-caps text-xs text-on-surface-variant">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {log.content && (
                  <p className="text-on-surface-variant text-sm mb-4">{log.content}</p>
                )}
                {log.xpChange > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] font-label-caps text-primary-fixed">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    +{log.xpChange} XP
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTab;
