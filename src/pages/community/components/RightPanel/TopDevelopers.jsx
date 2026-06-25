import React, { useState, useEffect } from 'react';
import * as communityService from '../../../../services/community.service';

export function TopDevelopers() {
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDevelopers() {
      try {
        const items = await communityService.getTopDevelopers(5);
        setDevelopers(items);
      } catch (err) {
        console.error('Failed to load top developers:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDevelopers();
  }, []);

  if (isLoading) {
    return (
      <div className="rp-card loading">
        <div className="rp-card-header">
          <h3 className="rp-card-title">Top Reputation</h3>
        </div>
        <div className="rp-list skeleton-pulse" style={{ height: '150px' }} />
      </div>
    );
  }

  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Top Reputation</h3>
        <a href="/ranking" className="rp-card-action">Leaderboard</a>
      </div>
      <div className="rp-list">
        {developers.length > 0 ? (
          developers.map((dev, idx) => (
            <div key={dev.id} className="rp-item">
              <img src={dev.avatar || '/default-avatar.png'} alt={dev.username} className="dev-item-avatar" />
              <div className="dev-item-info">
                <span className="dev-item-name">#{idx + 1} {dev.displayName || dev.username}</span>
                <span className="dev-item-meta">{dev.reputation?.toLocaleString() || 0} Rep</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rp-empty">No data available.</div>
        )}
      </div>
    </div>
  );
}

