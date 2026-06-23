import React from 'react';
import { TRENDING_TOPICS } from '../../constants';

export function TrendingDiscussions() {
  return (
    <div className="rp-card">
      <div className="rp-card-header">
        <h3 className="rp-card-title">Trending Discussions</h3>
        <a href="#" className="rp-card-action">View all</a>
      </div>
      <div className="rp-list">
        {TRENDING_TOPICS.map(topic => (
          <a key={topic.id} href="#" className="rp-item td-item">
            <span className="td-tag">#{topic.tag}</span>
            <span className="td-meta">{topic.postsCount.toLocaleString()} posts · {topic.isNew ? 'New' : topic.trend}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
