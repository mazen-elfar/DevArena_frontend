import React from 'react';
import useCommunityStore from '../../community.store';

export function PostActions({ post }) {
  const { reactions, myReaction, commentsCount, sharesCount, savedByMe } = post;
  const { toggleReaction, toggleComments, toggleSave } = useCommunityStore();

  const reactionTypes = [
    { id: 'like', icon: 'favorite', label: 'Like' },
    { id: 'celebrate', icon: 'celebration', label: 'Celebrate' },
    { id: 'insightful', icon: 'lightbulb', label: 'Insightful' },
  ];

  return (
    <div className="pa-actions">
      {/* Dynamic Reactions */}
      <div className="pa-reactions-group">
        {reactionTypes.map(rt => (
          <button
            key={rt.id}
            className={`pa-btn pa-reaction-btn ${myReaction === rt.id ? 'active' : ''}`}
            onClick={() => toggleReaction(post.id, rt.id)}
            title={rt.label}
          >
            <span className={`material-symbols-outlined pa-icon ${myReaction === rt.id ? 'filled' : ''}`}>
              {rt.icon}
            </span>
            {reactions[rt.id] > 0 && (
              <span className="pa-count">{reactions[rt.id]}</span>
            )}
          </button>
        ))}
      </div>

      <div className="pa-divider" />

      {/* Static Actions */}
      <div className="pa-main-actions">
        <button
          className="pa-btn pa-comment-btn"
          onClick={() => toggleComments(post.id)}
          title="Comment"
        >
          <span className="material-symbols-outlined pa-icon">chat_bubble</span>
          {commentsCount > 0 && <span className="pa-count">{commentsCount}</span>}
        </button>

        <button className="pa-btn pa-share-btn" title="Share">
          <span className="material-symbols-outlined pa-icon">share</span>
          {sharesCount > 0 && <span className="pa-count">{sharesCount}</span>}
        </button>

        <button
          className={`pa-btn pa-save-btn ${savedByMe ? 'active' : ''}`}
          onClick={() => toggleSave(post.id)}
          title="Save"
        >
          <span className={`material-symbols-outlined pa-icon ${savedByMe ? 'filled' : ''}`}>
            {savedByMe ? 'bookmark' : 'bookmark'}
          </span>
        </button>
      </div>
    </div>
  );
}
