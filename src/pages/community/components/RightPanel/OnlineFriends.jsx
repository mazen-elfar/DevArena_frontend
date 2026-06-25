import React, { useState, useEffect } from 'react';
import * as communityService from '../../../../services/community.service';

export function OnlineFriends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOnlineFriends() {
      try {
        const items = await communityService.getOnlineFriends();
        setFriends(items);
      } catch (err) {
        console.error('Failed to load online friends:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOnlineFriends();
  }, []);

  if (isLoading) {
    return (
      <div className="rp-card loading">
        <div className="rp-card-header">
          <h3 className="rp-card-title">Online Friends</h3>
        </div>
        <div className="rp-list skeleton-pulse" style={{ height: '100px' }} />
      </div>
    );
  }

  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Online Friends</h3>
        <span className="rp-card-action">{friends.length} online</span>
      </div>
      <div className="rp-list">
        {friends.length > 0 ? (
          friends.map(friend => (
            <div key={friend.id} className="rp-item">
              <div className="of-avatar-wrap">
                <img src={friend.avatar || '/default-avatar.png'} alt={friend.username} className="dev-item-avatar" />
                <div className="of-status online" />
              </div>
              <div className="dev-item-info">
                <span className="dev-item-name">{friend.displayName || friend.username}</span>
                <span className="dev-item-meta">Active now</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rp-empty">No friends currently online.</div>
        )}
      </div>
    </div>
  );
}

