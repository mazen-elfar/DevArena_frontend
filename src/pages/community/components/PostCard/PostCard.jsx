import React, { useState } from 'react';
import { RANK_CONFIG, POST_TYPE_CONFIG } from '../../constants';
import { BACKEND_POST_TYPE_MAP } from '../../../../services/community.service';
import useCommunityStore from '../../community.store';
import { PostActions } from './PostActions';
import { CommentsSection } from './CommentsSection';
import { DeveloperPost } from './DeveloperPost';
import { AchievementPost } from './AchievementPost';
import { BattleVictoryPost } from './BattleVictoryPost';
import { QuestCompletionPost } from './QuestCompletionPost';
import { ProjectShowcasePost } from './ProjectShowcasePost';
import './PostCard.css';

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function getRankFromReputation(rep = 0) {
  if (rep >= 10000) return 'Diamond';
  if (rep >= 5000) return 'Platinum';
  if (rep >= 2500) return 'Gold';
  if (rep >= 1000) return 'Silver';
  return 'Bronze';
}

const POST_RENDERERS = {
  developer: DeveloperPost,
  discussion: DeveloperPost,
  achievement: AchievementPost,
  victory: BattleVictoryPost,
  quest: QuestCompletionPost,
  showcase: ProjectShowcasePost,
};

export function PostCard({ post }) {
  const { author, type: backendType, createdAt } = post;
  const [showOptions, setShowOptions] = useState(false);

  const type = BACKEND_POST_TYPE_MAP[backendType] || 'developer';
  const rankName = author?.rank || getRankFromReputation(author?.reputation);
  const rankCfg = RANK_CONFIG[rankName] || RANK_CONFIG.Bronze;
  const typeCfg = POST_TYPE_CONFIG[type] || POST_TYPE_CONFIG.developer;
  const Renderer = POST_RENDERERS[type] || DeveloperPost;

  return (
    <article className={`pc-card pc-type-${type}`} style={{ '--type-color': typeCfg.color }}>
      {/* Type Indicator Strip */}
      {(type === 'victory' || type === 'achievement' || type === 'quest' || type === 'showcase') && (
        <div className="pc-type-strip">
          <span className="material-symbols-outlined pc-type-strip-icon">{typeCfg.icon}</span>
          {typeCfg.label}
        </div>
      )}

      <div className="pc-body">
        {/* Author Header */}
        <div className="pc-header">
          <div className="pc-author-row">
            {/* Avatar */}
            <div className="pc-avatar-wrap" style={{ '--rank-color': rankCfg.color }}>
              <img
                src={author?.avatar}
                alt={author?.username}
                className="pc-avatar"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="pc-avatar-ring" />
            </div>

            {/* Identity */}
            <div className="pc-author-info">
              <div className="pc-author-top">
                <span className="pc-author-name">{author?.displayName || author?.username}</span>
                <span
                  className="pc-rank-badge"
                  style={{ color: rankCfg.color, background: rankCfg.bg }}
                >
                  {author?.rank}
                </span>
                {author?.region && (
                  <span className="pc-region">{author.region}</span>
                )}
              </div>
              <div className="pc-author-sub">
                <span className="pc-username">@{author?.username}</span>
                <span className="pc-dot">·</span>
                <span className="pc-time">{timeAgo(createdAt)}</span>
                {author?.major && (
                  <>
                    <span className="pc-dot">·</span>
                    <span className="pc-major">{author.major}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="pc-options-wrap">
            <button
              className="pc-options-btn"
              onClick={() => setShowOptions(v => !v)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_horiz</span>
            </button>
            {showOptions && (
              <div className="pc-options-dropdown">
                <button className="pc-option-item">
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>bookmark</span>
                  Save post
                </button>
                <button className="pc-option-item">
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>person_off</span>
                  Unfollow @{author?.username}
                </button>
                <button className="pc-option-item pc-option-danger">
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>flag</span>
                  Report post
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="pc-tags">
            {post.tags.map(tag => (
              <span key={tag} className="pc-tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Post Type Content */}
        <Renderer post={post} />

        {/* Post Actions */}
        <PostActions post={post} />
      </div>

      {/* Comments Section */}
      <CommentsSection postId={post.id} commentsCount={post.commentsCount} />
    </article>
  );
}
