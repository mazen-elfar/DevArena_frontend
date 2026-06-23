import React from 'react';

export function QuestCompletionPost({ post }) {
  const { content, metadata } = post;
  const { quest } = metadata || {};

  return (
    <div className="qp-wrapper">
      <div className="qp-quest-card">
        <div className="qp-quest-header">
          <div className="qp-badge" style={{ backgroundColor: quest?.difficultyColor }}>
            {quest?.badge || '🗺️'}
          </div>
          <div className="qp-quest-title-wrap">
            <h3 className="qp-quest-title">{quest?.title}</h3>
            <span className="qp-difficulty" style={{ color: quest?.difficultyColor || '#a78bfa' }}>
              {quest?.difficulty}
            </span>
          </div>
        </div>

        <div className="qp-quest-stats">
          <div className="qp-stat">
            <span className="qp-stat-label">Completion Time</span>
            <span className="qp-stat-value">{quest?.completionTime}</span>
          </div>
          <div className="qp-stat">
            <span className="qp-stat-label">Chain Progress</span>
            <span className="qp-stat-value">{quest?.questChainPosition}</span>
          </div>
          <div className="qp-stat">
            <span className="qp-stat-label">XP Gained</span>
            <span className="qp-stat-value" style={{ color: '#f59e0b' }}>+{quest?.xpEarned?.toLocaleString()}</span>
          </div>
        </div>

        {content && <p className="qp-content">{content}</p>}
      </div>
    </div>
  );
}
