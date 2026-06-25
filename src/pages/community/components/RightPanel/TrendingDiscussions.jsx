import React, { useState, useEffect } from 'react';
import * as communityService from '../../../../services/community.service';
import { BACKEND_POST_TYPE_MAP } from '../../../../services/community.service';

export function TrendingDiscussions() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await communityService.getTrending();
        setTrending(data.discussions || []);
      } catch (err) {
        console.error('Failed to load trending discussions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTrending();
  }, []);

  if (isLoading) {
    return (
      <div className="rp-card loading">
        <div className="rp-card-header">
          <h3 className="rp-card-title">Trending Discussions</h3>
        </div>
        <div className="rp-list skeleton-pulse" style={{ height: '120px' }} />
      </div>
    );
  }

  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Trending Discussions</h3>
        <a href="#" className="rp-card-action">View all</a>
      </div>
      <div className="rp-list">
        {trending.length > 0 ? (
          trending.slice(0, 5).map(post => (
            <a key={post.id} href={`#post-${post.id}`} className="rp-item td-item">
              <span className="td-tag">#{BACKEND_POST_TYPE_MAP[post.type] || 'discussion'}</span>
              <span className="td-meta">
                {post.reactionCount || 0} reactions · {post.commentCount || 0} comments
              </span>
              <div className="td-content-preview">
                {post.content.length > 60 ? post.content.substring(0, 60) + '...' : post.content}
              </div>
            </a>
          ))
        ) : (
          <div className="rp-empty">No trending discussions yet.</div>
        )}
      </div>
    </div>
  );
}

