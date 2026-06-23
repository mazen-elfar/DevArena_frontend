import React, { useEffect } from 'react';
import { Header } from '../home/components/Header/Header';
import { CommunitySidebar } from './components/CommunitySidebar/CommunitySidebar';
import { FeedComposer } from './components/FeedComposer/FeedComposer';
import { FeedFilters } from './components/FeedFilters/FeedFilters';
import { CommunitySearch } from './components/CommunitySearch/CommunitySearch';
import { PostCard } from './components/PostCard/PostCard';
import { RightPanel } from './components/RightPanel/RightPanel';
import useCommunityStore from './community.store';
import { initialUserStats } from '../home/constants';
import './Community.css';

export default function Community() {
  const { 
    feed, 
    isLoading, 
    hasMore, 
    setFilter, 
    appendFeed 
  } = useCommunityStore();

  const [page, setPage] = React.useState(1);

  // 1. Initial Load
  useEffect(() => {
    setFilter('all');
  }, [setFilter]);

  // 2. Intersection Observer for Infinite Scroll
  const observerRef = React.useRef();
  const lastPostRef = React.useCallback(node => {
    if (isLoading || !hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore]);

  // 3. Trigger append when page changes
  useEffect(() => {
    if (page > 1) {
      appendFeed(page);
    }
  }, [page, appendFeed]);

  return (
    <div className="comm-page">
      {/* 1. Left Navigation Sidebar */}
      <CommunitySidebar />

      <main className="comm-main">
        {/* 2. Global Header */}
        <Header
          energy={initialUserStats.energy}
          streak={initialUserStats.streak}
          onCreateBattle={() => {}}
          onJoinTournament={() => {}}
          onSearch={() => {}}
        />

        <div className="comm-content-grid">
          {/* 3. Middle Feed Column */}
          <div className="comm-feed-col">
            <div className="comm-feed-header">
              <h1 className="comm-page-title">Community Feed</h1>
              <CommunitySearch />
            </div>

            <FeedComposer />
            <FeedFilters />

            <div className="comm-feed-list">
              {isLoading && feed.length === 0 ? (
                <div className="comm-loading">
                  <div className="comm-spinner" />
                  <span>Loading your ecosystem...</span>
                </div>
              ) : feed.length === 0 ? (
                <div className="comm-empty">
                  <h3>No posts found</h3>
                  <p>Try adjusting your filters or follow more developers.</p>
                </div>
              ) : (
                feed.map((post, index) => {
                  if (feed.length === index + 1) {
                    return (
                      <div ref={lastPostRef} key={post.id}>
                        <PostCard post={post} />
                      </div>
                    );
                  }
                  return <PostCard key={post.id} post={post} />;
                })
              )}

              {/* Infinite Scroll Bottom Spinner */}
              {isLoading && feed.length > 0 && (
                <div className="comm-sentinel">
                  <span className="comm-spinner-small" />
                </div>
              )}
            </div>
          </div>

          {/* 4. Right Discovery Column */}
          <RightPanel />
        </div>
      </main>

      {/* Floating Action Button for Mobile / Quick Post */}
      <button className="comm-quick-fab" title="Quick Post">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
