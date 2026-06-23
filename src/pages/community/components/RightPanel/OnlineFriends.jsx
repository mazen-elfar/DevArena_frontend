import React from 'react';
import { ONLINE_FRIENDS } from '../../constants';

export function OnlineFriends() {
  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Online Friends</h3>
        <span className="rp-card-action">{ONLINE_FRIENDS.length} online</span>
      </div>
      <div className="rp-list">
        {ONLINE_FRIENDS.map(friend => (
          <div key={friend.id} className="rp-item">
            <div className="of-avatar-wrap">
              <img src={friend.avatar} alt={friend.username} className="dev-item-avatar" />
              <div className="of-status" />
            </div>
            <div className="dev-item-info">
              <span className="dev-item-name">{friend.displayName || friend.username}</span>
              <span className="dev-item-meta">{friend.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
