import React from 'react';

const statConfig = [
  { key: 'questsSolved',    label: 'Quests Solved',    icon: 'task_alt',      color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { key: 'battlesWon',      label: 'Battle Wins',      icon: 'swords',        color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
  { key: 'winRate',         label: 'Win Rate',         icon: 'percent',       color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { key: 'tournamentsWon',  label: 'Tournaments Won',  icon: 'emoji_events',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
];

const StatsTab = ({ stats }) => {
  return (
    <div>
      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {statConfig.map((s) => {
          const raw = stats?.[s.key];
          const value = s.key === 'winRate'
            ? (raw ? `${raw}%` : '0%')
            : (raw ?? '0');

          return (
            <div
              key={s.key}
              style={{
                background: '#0a0f1e',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex', flexDirection: 'column', gap: '12px',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: s.color, fontVariationSettings: "'FILL' 1" }}>
                  {s.icon}
                </span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#e2e8f0', lineHeight: 1.2 }}>{value}</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#475569', fontWeight: '500' }}>{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {!stats && (
        <div style={{
          textAlign: 'center', padding: '3rem 0',
          color: '#334155', fontSize: '14px',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '12px', color: '#1e293b' }}>monitoring</span>
          No stats available yet. Start battling to earn your record!
        </div>
      )}
    </div>
  );
};

export default StatsTab;
