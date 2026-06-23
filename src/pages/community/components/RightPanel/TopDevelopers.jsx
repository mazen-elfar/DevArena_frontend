import React from 'react';
import { TOP_DEVELOPERS } from '../../constants';

export function TopDevelopers() {
  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Top Reputation</h3>
        <a href="#" className="rp-card-action">Leaderboard</a>
      </div>
      <div className="rp-list">
        {TOP_DEVELOPERS.map((dev, idx) => (
          <div key={dev.id} className="rp-item">
            <img src={dev.avatar} alt={dev.username} className="dev-item-avatar" />
            <div className="dev-item-info">
              <span className="dev-item-name">#{idx + 1} {dev.displayName || dev.username}</span>
              <span className="dev-item-meta">{dev.rank} · {dev.reputation.toLocaleString()} Rep</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
