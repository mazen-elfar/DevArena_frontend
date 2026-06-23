/**
 * Community Store — Zustand
 *
 * Scalable state management for the DevArena social ecosystem.
 * Architected for Socket.IO readiness and Optimistic Updates.
 * Refactored to V3.1 strict schema.
 */

import { create } from 'zustand';
import * as communityService from '../../services/community.service';

const useCommunityStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────────
  feed: [],
  activeFilter: 'all',
  selectedSpace: null,
  searchQuery: '',
  hasMore: true,
  isLoading: false,

  // Records for O(1) lookups
  followStates: {},      // { [userId]: 'follow' | 'following' | 'requested' }
  expandedComments: {},  // { [postId]: boolean }
  activeReactions: {},   // { [postId]: 'like' | 'celebrate' | 'insightful' | null }

  // ─── Actions ──────────────────────────────────────────────────

  /**
   * Set the primary feed filter (Trending, Following, etc.)
   */
  setFilter: async (filter) => {
    set({ activeFilter: filter, isLoading: true, feed: [], hasMore: true });
    try {
      const result = await communityService.getFeed({ filter, page: 1 });
      set({
        feed: result.posts,
        hasMore: result.hasMore,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  /**
   * Filter feed by developer space
   */
  setSpace: async (spaceId) => {
    set({ selectedSpace: spaceId, isLoading: true, feed: [], hasMore: true });
    try {
      const result = await communityService.getFeed({ space: spaceId, page: 1 });
      set({
        feed: result.posts,
        hasMore: result.hasMore,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  /**
   * Global community search
   */
  setSearch: async (query) => {
    set({ searchQuery: query });
    if (!query.trim()) return;

    set({ isLoading: true });
    try {
      const results = await communityService.searchCommunity(query);
      // For simplicity, search results replace the current feed in this view
      set({ feed: results.posts || [], hasMore: false, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  /**
   * Pagination: Append more posts to the end of the current feed
   */
  appendFeed: async (page) => {
    const { activeFilter, selectedSpace, feed, isLoading, hasMore } = get();
    if (isLoading || !hasMore) return;

    set({ isLoading: true });
    try {
      const result = await communityService.getFeed({ 
        filter: activeFilter, 
        space: selectedSpace, 
        page 
      });
      set({
        feed: [...feed, ...result.posts],
        hasMore: result.hasMore,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  /**
   * Socket.IO / Force Refresh: Replace entire feed
   */
  replaceFeed: (posts) => set({ feed: posts, hasMore: true }),

  /**
   * Optimistic Reaction Logic
   */
  toggleReaction: async (postId, reaction) => {
    const { feed, activeReactions } = get();
    const currentReaction = activeReactions[postId] || null;
    const newReaction = currentReaction === reaction ? null : reaction;

    // 1. Optimistic Update
    const prevFeed = [...feed];
    const newFeed = feed.map(post => {
      if (post.id !== postId) return post;
      
      const reactions = { ...post.reactions };
      if (currentReaction) {
        reactions[currentReaction] = Math.max(0, (reactions[currentReaction] || 0) - 1);
      }
      if (newReaction) {
        reactions[newReaction] = (reactions[newReaction] || 0) + 1;
      }
      
      return { ...post, reactions, myReaction: newReaction };
    });

    set({ 
      feed: newFeed, 
      activeReactions: { ...activeReactions, [postId]: newReaction } 
    });

    // 2. Network Call
    try {
      await communityService.reactToPost(postId, newReaction);
    } catch {
      // 3. Rollback on failure
      set({ 
        feed: prevFeed, 
        activeReactions: { ...activeReactions, [postId]: currentReaction } 
      });
    }
  },

  /**
   * Optimistic Save Logic
   */
  toggleSave: async (postId) => {
    set(state => ({
      feed: state.feed.map(p => p.id === postId ? { ...p, savedByMe: !p.savedByMe } : p)
    }));
    await communityService.savePost(postId);
  },

  /**
   * Optimistic Follow Logic
   */
  toggleFollow: async (userId) => {
    const current = get().followStates[userId] || 'follow';
    const next = current === 'following' || current === 'requested' ? 'follow' : 'following';

    set(state => ({
      followStates: { ...state.followStates, [userId]: next }
    }));

    try {
      const result = await communityService.toggleFollow(userId, next === 'following' ? 'follow' : 'unfollow');
      set(state => ({
        followStates: { ...state.followStates, [userId]: result.state }
      }));
    } catch {
      set(state => ({
        followStates: { ...state.followStates, [userId]: current }
      }));
    }
  },

  /**
   * Toggle Comments Section (Store-driven expansion)
   */
  toggleComments: (postId) => {
    set(state => ({
      expandedComments: { 
        ...state.expandedComments, 
        [postId]: !state.expandedComments[postId] 
      }
    }));
  },

  /**
   * Reset feed state (e.g., when leaving community tab)
   */
  resetFeed: () => set({ 
    feed: [], 
    activeFilter: 'all', 
    selectedSpace: null, 
    hasMore: true 
  }),

  // ─── Socket Helpers ──────────────────────────────────────────

  prependPost: (post) => set(state => ({
    feed: [post, ...state.feed]
  })),

  updatePostInFeed: (postId, updates) => set(state => ({
    feed: state.feed.map(p => p.id === postId ? { ...p, ...updates } : p)
  })),
}));

export default useCommunityStore;
