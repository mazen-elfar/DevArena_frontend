import React, { useState, useEffect } from 'react';
import * as communityService from '../../../../services/community.service';
import useCommunityStore from '../../community.store';

export function SuggestedDevelopers() {
  const { followStates, toggleFollow } = useCommunityStore();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSuggestions() {
      try {
        // Fallback to top developers for suggestions
        const items = await communityService.getTopDevelopers(10);
        setSuggestions(items);
      } catch (err) {
        console.error('Failed to load suggestions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSuggestions();
  }, []);

  if (isLoading) {
    return (
      <div className="rp-card loading">
        <div className="rp-card-header">
          <h3 className="rp-card-title">Suggested for you</h3>
        </div>
        <div className="rp-list skeleton-pulse" style={{ height: '180px' }} />
      </div>
    );
  }

  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Suggested for you</h3>
        <button 
          className="rp-card-action btn-link" 
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
      <div className="rp-list">
        {suggestions.length > 0 ? (
          suggestions.map(dev => {
            const state = followStates[dev.id] || 'follow';

            return (
              <div key={dev.id} className="rp-item">
                <img src={dev.avatar || '/default-avatar.png'} alt={dev.username} className="dev-item-avatar" />
                <div className="dev-item-info">
                  <span className="dev-item-name">{dev.displayName || dev.username}</span>
                  <span className="dev-item-meta">{dev.reputation?.toLocaleString() || 0} Rep</span>
                </div>
                <button
                  className={`dev-item-btn ${state === 'following' ? 'following' : ''}`}
                  onClick={() => toggleFollow(dev.id)}
                >
                  {state === 'follow' ? 'Follow' : state === 'following' ? 'Following' : 'Requested'}
                </button>
              </div>
            );
          })
        ) : (
          <div className="rp-empty">No suggestions at the moment.</div>
        )}
      </div>
    </div>
  );
}

