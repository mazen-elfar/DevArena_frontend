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

  const hasResults = searchResults?.posts?.length > 0;

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

          {!searchLoading && hasResults && (
            <div className="csearch-group">
              <p className="csearch-group-label">Posts</p>
              {searchResults.posts.map(post => (
                <a key={post.id} href={`#post-${post.id}`} className="csearch-result-item">
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#818cf8' }}>article</span>
                  <span className="csearch-result-name">{post.title || post.content?.substring(0, 50) || 'Untitled'}</span>
                  <span className="csearch-result-meta">{post.author?.username}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
