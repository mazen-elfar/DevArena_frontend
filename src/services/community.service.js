/**
 * Community Service — API Boundary Layer
 * 
 * Refactored to V3.1: React Query Ready & Socket.IO Compatible.
 * All methods follow a consistent contract for server-state management.
 */

import { 
  MOCK_FEED, MOCK_TRENDING, MOCK_SUGGESTIONS, MOCK_TOP_DEVELOPERS,
  MOCK_ONLINE_FRIENDS, MOCK_SPACES, MOCK_TAGS, MOCK_COMMENTS, MOCK_STATS,
} from '../pages/community/constants';

const SIMULATE_DELAY = (ms = 400) => new Promise(r => setTimeout(r, ms));

/**
 * Normalized Error Helper
 */
const normalizeError = (error) => {
  console.error('[Community Service Error]:', error);
  return {
    message: error.message || 'An unexpected community error occurred.',
    code: error.code || 'COMMUNITY_ERROR',
    retryable: true
  };
};

// ─── Feed Methods (React Query Ready) ────────────────────────────────────────

/**
 * Get community feed with support for filters, spaces, and pagination.
 */
export async function getFeed({ filter = 'all', space = null, page = 1, pageSize = 10 } = {}) {
  try {
    await SIMULATE_DELAY();
    
    let posts = [...MOCK_FEED];

    // Apply Filter
    if (filter !== 'all') {
      const typeMap = {
        achievements: 'achievement',
        battles: 'victory',
        quests: 'quest',
        projects: 'showcase',
      };
      const targetType = typeMap[filter];
      if (targetType) posts = posts.filter(p => p.type === targetType);
    }

    // Apply Space
    if (space) {
      posts = posts.filter(p => p.tags.includes(space.toLowerCase()));
    }

    // Pagination
    const start = (page - 1) * pageSize;
    const slice = posts.slice(start, start + pageSize);
    
    return {
      posts: slice,
      hasMore: start + pageSize < posts.length,
      nextPage: page + 1,
      totalCount: posts.length
    };
  } catch (err) {
    throw normalizeError(err);
  }
}

// ─── Post Actions (Optimistic Update Ready) ──────────────────────────────────

/**
 * Toggle reaction on a post.
 */
export async function reactToPost(postId, reaction) {
  try {
    await SIMULATE_DELAY(150);
    // Future: POST /api/posts/:postId/react
    return { success: true, postId, reaction };
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Save post for later.
 */
export async function savePost(postId) {
  try {
    await SIMULATE_DELAY(150);
    return { success: true, postId };
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Create a new post.
 */
export async function createPost(payload) {
  try {
    await SIMULATE_DELAY(600);
    return {
      id: `post_${Date.now()}`,
      authorId: 'current_user',
      type: payload.type || 'developer',
      content: payload.content,
      tags: payload.tags || [],
      metadata: payload.metadata || {},
      reactions: { like: 0, celebrate: 0, insightful: 0 },
      myReaction: null,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    throw normalizeError(err);
  }
}

// ─── Social & Discovery ──────────────────────────────────────────────────────

/**
 * Follow/Unfollow user.
 */
export async function toggleFollow(userId, action) {
  try {
    await SIMULATE_DELAY(300);
    return { 
      userId, 
      state: action === 'follow' ? 'following' : 'none' 
    };
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function getTrending() {
  try { await SIMULATE_DELAY(200); return { discussions: MOCK_TRENDING, tags: MOCK_TAGS }; }
  catch (err) { throw normalizeError(err); }
}

export async function getTopDevelopers() {
  try { await SIMULATE_DELAY(200); return MOCK_TOP_DEVELOPERS; }
  catch (err) { throw normalizeError(err); }
}

export async function getOnlineFriends() {
  try { await SIMULATE_DELAY(150); return MOCK_ONLINE_FRIENDS; }
  catch (err) { throw normalizeError(err); }
}

export async function getSuggestions() {
  try { await SIMULATE_DELAY(300); return MOCK_SUGGESTIONS; }
  catch (err) { throw normalizeError(err); }
}

export async function getCommunityStats() {
  try { await SIMULATE_DELAY(150); return MOCK_STATS; }
  catch (err) { throw normalizeError(err); }
}

// ─── Search ──────────────────────────────────────────────────────────────────

export async function searchCommunity(query) {
  try {
    await SIMULATE_DELAY(300);
    // Mocking search by content matching
    const results = MOCK_FEED.filter(p => 
      p.content.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );
    return { posts: results };
  } catch (err) {
    throw normalizeError(err);
  }
}

// ─── Comments ────────────────────────────────────────────────────────────────

export async function getComments(postId) {
  try {
    await SIMULATE_DELAY(400);
    return MOCK_COMMENTS[postId] || [];
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function createComment(postId, payload) {
  try {
    await SIMULATE_DELAY(500);
    return {
      id: `comment_${Date.now()}`,
      postId,
      parentId: payload.parentId || null,
      authorId: 'current_user',
      content: payload.content,
      reactions: { like: 0 },
      replies: [],
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    throw normalizeError(err);
  }
}