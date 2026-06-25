import React, { useState, useEffect } from 'react';
import * as communityService from '../../../../services/community.service';

export function CommunityStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await communityService.getCommunityStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load community stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="rp-card loading">
        <div className="rp-card-header">
          <h3 className="rp-card-title">Community pulse</h3>
        </div>
        <div className="cs-grid skeleton-pulse" style={{ height: '80px' }} />
      </div>
    );
  }

  const statItems = [
    { id: 'members', label: 'Members', value: stats?.members?.toLocaleString() || '0' },
    { id: 'posts', label: 'Posts', value: stats?.posts?.toLocaleString() || '0' },
    { id: 'trending', label: 'Trending', value: stats?.trending?.toLocaleString() || '0' },
    { id: 'activeNow', label: 'Active Now', value: stats?.activeNow?.toLocaleString() || '0' },
  ];

  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Community pulse</h3>
      </div>
      <div className="cs-grid">
        {statItems.map(stat => (
          <div key={stat.id} className="cs-tile">
            <span className="cs-tile-val">{stat.value}</span>
            <span className="cs-tile-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

