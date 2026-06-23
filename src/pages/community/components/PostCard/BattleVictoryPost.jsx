import React from 'react';

const DIFFICULTY_CONFIG = {
  Easy:   { color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  Hard:   { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  Expert: { color: '#c084fc', bg: 'rgba(192,132,252,0.12)' },
};

export function BattleVictoryPost({ post }) {
  const { content, metadata } = post;
  const { opponent, problem, ratingChange, xpEarned, myLanguage, opponentLanguage, duration } = metadata || {};
  const diff = DIFFICULTY_CONFIG[problem?.difficulty] || DIFFICULTY_CONFIG.Medium;
  const ratingPositive = ratingChange >= 0;

  return (
    <div className="bv-wrapper">
      {/* VS Card */}
      <div className="bv-vs-card">
        {/* My Side */}
        <div className="bv-side bv-winner">
          <div className="bv-side-avatar-ring">
            <div className="bv-side-avatar bv-side-avatar--winner">
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#00f0ff' }}>
                emoji_events
              </span>
            </div>
          </div>
          <span className="bv-side-lang">{myLanguage || 'Rust'}</span>
          <span className="bv-side-label">Winner</span>
        </div>

        {/* VS */}
        <div className="bv-vs-center">
          <span className="bv-vs-text">VS</span>
          {problem && (
            <span
              className="bv-difficulty"
              style={{ color: diff.color, background: diff.bg }}
            >
              {problem.difficulty}
            </span>
          )}
        </div>

        {/* Opponent Side */}
        <div className="bv-side bv-loser">
          <div className="bv-side-avatar bv-side-avatar--loser">
            {opponent?.avatar ? (
              <img src={opponent.avatar} alt={opponent.username} />
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#6b7280' }}>person</span>
            )}
          </div>
          <span className="bv-side-lang">{opponentLanguage || 'Python'}</span>
          <span className="bv-side-label">@{opponent?.username || 'opponent'}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bv-stats-row">
        {problem && (
          <div className="bv-stat">
            <span className="material-symbols-outlined bv-stat-icon" style={{ color: '#818cf8' }}>task</span>
            <div>
              <p className="bv-stat-label">Problem</p>
              <p className="bv-stat-value">{problem.title}</p>
            </div>
          </div>
        )}
        {ratingChange !== undefined && (
          <div className="bv-stat">
            <span className="material-symbols-outlined bv-stat-icon" style={{ color: ratingPositive ? '#34d399' : '#f87171' }}>
              {ratingPositive ? 'trending_up' : 'trending_down'}
            </span>
            <div>
              <p className="bv-stat-label">Rating</p>
              <p className="bv-stat-value" style={{ color: ratingPositive ? '#34d399' : '#f87171' }}>
                {ratingPositive ? '+' : ''}{ratingChange}
              </p>
            </div>
          </div>
        )}
        {xpEarned && (
          <div className="bv-stat">
            <span className="material-symbols-outlined bv-stat-icon" style={{ color: '#f59e0b' }}>bolt</span>
            <div>
              <p className="bv-stat-label">XP Earned</p>
              <p className="bv-stat-value" style={{ color: '#f59e0b' }}>+{xpEarned.toLocaleString()}</p>
            </div>
          </div>
        )}
        {duration && (
          <div className="bv-stat">
            <span className="material-symbols-outlined bv-stat-icon" style={{ color: '#94a3b8' }}>timer</span>
            <div>
              <p className="bv-stat-label">Duration</p>
              <p className="bv-stat-value">{duration}</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {content && <p className="bv-content">{content}</p>}
    </div>
  );
}
