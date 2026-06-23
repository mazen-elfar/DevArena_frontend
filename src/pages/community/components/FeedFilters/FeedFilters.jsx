import React from 'react';
import { FEED_FILTERS } from '../../constants';
import useCommunityStore from '../../community.store';
import './FeedFilters.css';

export function FeedFilters() {
  const { activeFilter, setFilter } = useCommunityStore();

  return (
    <div className="ff-filters">
      {FEED_FILTERS.map(filter => (
        <button
          key={filter.id}
          className={`ff-tab ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => setFilter(filter.id)}
        >
          {filter.icon && <span className="ff-icon">{filter.icon}</span>}
          {filter.label}
        </button>
      ))}
    </div>
  );
}
