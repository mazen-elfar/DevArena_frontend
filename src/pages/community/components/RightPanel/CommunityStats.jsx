import React from 'react';
import { COMMUNITY_STATS } from '../../constants';

export function CommunityStats() {
  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Community pulse</h3>
      </div>
      <div className="cs-grid">
        {COMMUNITY_STATS.map(stat => (
          <div key={stat.id} className="cs-tile">
            <span className="cs-tile-val">{stat.value}</span>
            <span className="cs-tile-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
