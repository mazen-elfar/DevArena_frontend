import React from 'react';
import useCommunityStore from '../../community.store';

export function PostActions({ post }) {
  const { id, reactionCount, commentCount, saveCount } = post;
  const { toggleReaction, toggleComments, toggleSave, myReactions, savedPosts } = useCommunityStore();
  
  const myReaction = myReactions[id];
  const isSaved = !!savedPosts[id];

  const reactionTypes = [
    { id: 'like', icon: 'favorite', label: 'Like', backendId: 'LIKE' },
    { id: 'celebrate', icon: 'celebration', label: 'Celebrate', backendId: 'LOVE' },
    { id: 'insightful', icon: 'lightbulb', label: 'Insightful', backendId: 'MIND_BLOWN' },
  ];

  return (
    <div className="pa-actions">
      {/* Dynamic Reactions */}
      <div className="pa-reactions-group">
        {reactionTypes.map(rt => {
          const isActive = myReaction === rt.backendId;
          return (
            <button
              key={rt.id}
              className={`pa-btn pa-reaction-btn ${isActive ? 'active' : ''}`}
              onClick={() => toggleReaction(id, rt.id)}
              title={rt.label}
            >
              <span className={`material-symbols-outlined pa-icon ${isActive ? 'filled' : ''}`}>
                {rt.icon}
              </span>
              {/* Show total count on the first/active reaction for now simplified */}
              {isActive && reactionCount > 0 && (
                <span className="pa-count">{reactionCount}</span>
              )}
              {!isActive && rt.id === 'like' && !myReaction && reactionCount > 0 && (
                <span className="pa-count">{reactionCount}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="pa-divider" />

      {/* Static Actions */}
      <div className="pa-main-actions">
        <button
          className="pa-btn pa-comment-btn"
          onClick={() => toggleComments(id)}
          title="Comment"
        >
          <span className="material-symbols-outlined pa-icon">chat_bubble</span>
          {commentCount > 0 && <span className="pa-count">{commentCount}</span>}
        </button>

        <button className="pa-btn pa-share-btn" title="Share">
          <span className="material-symbols-outlined pa-icon">share</span>
        </button>

        <button
          className={`pa-btn pa-save-btn ${isSaved ? 'active' : ''}`}
          onClick={() => toggleSave(id)}
          title="Save"
        >
          <span className={`material-symbols-outlined pa-icon ${isSaved ? 'filled' : ''}`}>
            {isSaved ? 'bookmark' : 'bookmark'}
          </span>
          {saveCount > 0 && <span className="pa-count">{saveCount}</span>}
        </button>
      </div>
    </div>
  );
}

