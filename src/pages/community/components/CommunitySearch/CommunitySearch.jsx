import React, { useState, useRef, useEffect } from 'react';
import useCommunityStore from '../../community.store';
import './CommunitySearch.css';

export function CommunitySearch() {
  const [focused, setFocused] = useState(false);
  const { searchQuery, searchResults, searchLoading, setSearch } = useCommunityStore();
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const debounceRef = useRef(null);

  function handleChange(e) {
    const q = e.target.value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(q), 350);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasResults = searchResults && (
    searchResults.tags?.length > 0 ||
    searchResults.spaces?.length > 0 ||
    searchResults.developers?.length > 0
  );

  return (
    <div className="csearch-wrap" ref={wrapRef}>
      <div className={`csearch-input-row ${focused ? 'focused' : ''}`}>
        <span className="material-symbols-outlined csearch-icon">search</span>
        <input
          ref={inputRef}
          className="csearch-input"
          placeholder="Search developers, posts, tags..."
          onFocus={() => setFocused(true)}
          onChange={handleChange}
          defaultValue={searchQuery}
        />
        {searchLoading && <span className="csearch-spinner" />}
        {searchQuery && (
          <button className="csearch-clear" onClick={() => { setSearch(''); if (inputRef.current) inputRef.current.value = ''; }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {focused && searchQuery && (
        <div className="csearch-dropdown">
          {searchLoading && (
            <div className="csearch-loading-row">Searching...</div>
          )}

          {!searchLoading && !hasResults && (
            <div className="csearch-empty">No results for "<strong>{searchQuery}</strong>"</div>
          )}

          {!searchLoading && searchResults?.tags?.length > 0 && (
            <div className="csearch-group">
              <p className="csearch-group-label">Tags</p>
              {searchResults.tags.map(tag => (
                <button key={tag.id} className="csearch-result-item">
                  <span style={{ color: tag.color }}>{tag.icon}</span>
                  <span className="csearch-result-name">#{tag.name}</span>
                  <span className="csearch-result-meta">{tag.followersCount.toLocaleString()} followers</span>
                </button>
              ))}
            </div>
          )}

          {!searchLoading && searchResults?.spaces?.length > 0 && (
            <div className="csearch-group">
              <p className="csearch-group-label">Spaces</p>
              {searchResults.spaces.map(space => (
                <button key={space.id} className="csearch-result-item">
                  <span>{space.icon}</span>
                  <span className="csearch-result-name">{space.name}</span>
                  <span className="csearch-result-meta">{space.members.toLocaleString()} devs</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
