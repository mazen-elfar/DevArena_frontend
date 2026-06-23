import React, { useEffect, useRef } from 'react';

const RARITY_CONFIG = {
  Common:    { color: '#94a3b8', glow: 'rgba(148,163,184,0.2)' },
  Uncommon:  { color: '#34d399', glow: 'rgba(52,211,153,0.25)' },
  Rare:      { color: '#818cf8', glow: 'rgba(129,140,248,0.25)' },
  Epic:      { color: '#c084fc', glow: 'rgba(192,132,252,0.3)' },
  Legendary: { color: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
};

export function AchievementPost({ post }) {
  const { content, metadata } = post;
  const { achievement } = metadata || {};
  const rarity = RARITY_CONFIG[achievement?.rarity] || RARITY_CONFIG.Common;
  const orbitRef = useRef(null);

  return (
    <div className="ap-wrapper" style={{ '--rarity-color': rarity.color, '--rarity-glow': rarity.glow }}>
      {/* Achievement Badge */}
      <div className="ap-badge-area">
        <div className="ap-badge-ring-outer">
          <div className="ap-badge-ring-inner" />
          <div className="ap-badge-icon-wrap">
            <span className="ap-badge-emoji">{achievement?.icon || '🏆'}</span>
          </div>
        </div>
        <div className="ap-badge-xp">+{achievement?.xpAwarded?.toLocaleString() || '0'} XP</div>
        <div className="ap-rarity-label">{achievement?.rarity || 'Common'}</div>
      </div>

      {/* Info */}
      <div className="ap-info">
        <h3 className="ap-title">{achievement?.title || 'Achievement Unlocked'}</h3>
        <p className="ap-desc">{achievement?.description}</p>
        <p className="ap-content">{content}</p>
      </div>
    </div>
  );
}
