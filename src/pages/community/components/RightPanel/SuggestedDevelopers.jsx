import React from 'react';
import { SUGGESTED_DEVELOPERS } from '../../constants';
import useCommunityStore from '../../community.store';

export function SuggestedDevelopers() {
  const { followStates, toggleFollow } = useCommunityStore();

  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Suggested for you</h3>
        <a href="#" className="rp-card-action">Refresh</a>
      </div>
      <div className="rp-list">
        {SUGGESTED_DEVELOPERS.map(dev => {
          const state = followStates[dev.id] || 'follow';

          return (
            <div key={dev.id} className="rp-item">
              <img src={dev.avatar} alt={dev.username} className="dev-item-avatar" />
              <div className="dev-item-info">
                <span className="dev-item-name">{dev.displayName || dev.username}</span>
                <span className="dev-item-meta">{dev.mutualsCount} mutuals</span>
              </div>
              <button
                className={`dev-item-btn ${state === 'following' ? 'following' : ''}`}
                onClick={() => toggleFollow(dev.id)}
              >
                {state === 'follow' ? 'Follow' : state === 'following' ? 'Following' : 'Requested'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
