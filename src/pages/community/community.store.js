/**
 * Community Store — Zustand
 *
 * Migrated to Production Backend (Phases 3 & 4)
 */

import { create } from 'zustand';
import * as communityService from '../../services/community.service';

const useCommunityStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────────
  feed: [],
  activeFilter: 'all',
  searchQuery: '',
  searchResults: null,
  searchLoading: false,
  hasMore: true,
  isLoading: false,
  composerType: 'developer', // Default composer type

  // UI state records
  followStates: {},      // { [userId]: 'follow' | 'following' }
  expandedComments: {},  // { [postId]: boolean }
  myReactions: {},       // { [postId]: 'LIKE' | 'FIRE' | 'ROCKET' | null }
  savedPosts: {},        // { [postId]: boolean }

  // ─── Feed Actions ─────────────────────────────────────────────

  /**
   * Set the primary feed filter
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
   * Pagination: Load next page
   */
  appendFeed: async (page) => {
    const { activeFilter, feed, isLoading, hasMore } = get();
    if (isLoading || !hasMore) return;

    set({ isLoading: true });
    try {
      const result = await communityService.getFeed({ 
        filter: activeFilter, 
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
   * Set the current composer type (Status, Discussion, etc.)
   */
  setComposerType: (type) => set({ composerType: type }),

  /**
   * Submit a new post
   */
  submitPost: async (payload) => {
    const { composerType, feed } = get();
    set({ isLoading: true });

    try {
      const newPost = await communityService.createPost({
        ...payload,
        type: payload.type || composerType
      });

      // Prepend to feed immediately
      set({ 
        feed: [newPost, ...feed],
        isLoading: false 
      });
      return newPost;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  // ─── Post Actions ─────────────────────────────────────────────

  /**
   * Add a comment to a post
   */
  addComment: async (postId, content, parentId = null) => {
    try {
      const comment = await communityService.createComment(postId, { content, parentId });
      
      // Update the comment count in the feed item
      set(state => ({
        feed: state.feed.map(post => 
          post.id === postId 
            ? { ...post, commentCount: (post.commentCount || 0) + 1 } 
            : post
        )
      }));
      
      return comment;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Toggle reaction with total reactionCount logic
   */
  toggleReaction: async (postId, reactionId) => {
    const { feed, myReactions } = get();
    const currentReaction = myReactions[postId] || null;
    const targetReaction = communityService.REACTION_TYPE_MAP[reactionId];
    const isSame = currentReaction === targetReaction;
    const nextReaction = isSame ? null : targetReaction;

    // 1. Optimistic Update (Total reactionCount)
    const prevFeed = [...feed];
    const newFeed = feed.map(post => {
      if (post.id !== postId) return post;
      
      let newCount = post.reactionCount || 0;
      if (currentReaction && !nextReaction) newCount = Math.max(0, newCount - 1);
      if (!currentReaction && nextReaction) newCount = newCount + 1;
      // If switching types, count stays the same
      
      return { ...post, reactionCount: newCount };
    });

    set({ 
      feed: newFeed, 
      myReactions: { ...myReactions, [postId]: nextReaction } 
    });

    // 2. Network Call
    try {
      await communityService.reactToPost(postId, reactionId);
    } catch {
      // 3. Rollback
      set({ 
        feed: prevFeed, 
        myReactions: { ...myReactions, [postId]: currentReaction } 
      });
    }
  },

  /**
   * Toggle save post
   */
  toggleSave: async (postId) => {
    const { feed, savedPosts } = get();
    const isSaved = !!savedPosts[postId];

    // Optimistic
    set(state => ({
      savedPosts: { ...state.savedPosts, [postId]: !isSaved },
      feed: state.feed.map(p => 
        p.id === postId 
          ? { ...p, saveCount: isSaved ? Math.max(0, (p.saveCount || 0) - 1) : (p.saveCount || 0) + 1 } 
          : p
      )
    }));

    try {
      await communityService.savePost(postId);
    } catch {
      // Rollback
      set(state => ({
        savedPosts: { ...state.savedPosts, [postId]: isSaved },
        feed: state.feed.map(p => 
          p.id === postId 
            ? { ...p, saveCount: isSaved ? (p.saveCount || 0) : Math.max(0, (p.saveCount || 0) - 1) } 
            : p
        )
      }));
    }
  },

  /**
   * Follow/Unfollow user
   */
  toggleFollow: async (userId) => {
    const { followStates } = get();
    const isFollowing = followStates[userId] === 'following';

    // Optimistic
    set(state => ({
      followStates: { ...state.followStates, [userId]: isFollowing ? 'follow' : 'following' }
    }));

    try {
      const result = await communityService.toggleFollow(userId, isFollowing);
      set(state => ({
        followStates: { ...state.followStates, [userId]: result.state }
      }));
    } catch {
      set(state => ({
        followStates: { ...state.followStates, [userId]: isFollowing ? 'following' : 'follow' }
      }));
    }
  },

  // ─── UI Helpers ──────────────────────────────────────────────

  toggleComments: (postId) => {
    set(state => ({
      expandedComments: { 
        ...state.expandedComments, 
        [postId]: !state.expandedComments[postId] 
      }
    }));
  },

  setSearch: async (query) => {
    set({ searchQuery: query });
    if (!query.trim()) {
      set({ searchResults: null, searchLoading: false });
      return;
    }
    set({ searchLoading: true });
    try {
      const results = await communityService.searchCommunity(query);
      set({ searchResults: results, searchLoading: false });
    } catch {
      set({ searchResults: null, searchLoading: false });
    }
  },

  resetFeed: () => set({ 
    feed: [], 
    activeFilter: 'all', 
    hasMore: true,
    isLoading: false,
    searchQuery: '',
    searchResults: null,
    searchLoading: false,
    expandedComments: {},
    myReactions: {},
    savedPosts: {}
  }),

  // Socket updates
  prependPost: (post) => set(state => ({ feed: [post, ...state.feed] })),
  updatePostInFeed: (postId, updates) => set(state => ({
    feed: state.feed.map(p => p.id === postId ? { ...p, ...updates } : p)
  })),
}));

export default useCommunityStore;
