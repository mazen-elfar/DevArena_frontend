/**
 * Community Service — API Boundary Layer
 * 
 * Migrated to Production Backend (Phases 3 & 4)
 */

import apiClient from './api.client';

/**
 * Enum Mappings
 */
export const POST_TYPE_MAP = {
  developer: 'TEXT',
  discussion: 'DISCUSSION',
  achievement: 'ACHIEVEMENT',
  victory: 'BATTLE_RESULT',
  quest: 'QUEST_COMPLETION',
  showcase: 'PROJECT_SHOWCASE',
};

// Inverse map for UI rendering
export const BACKEND_POST_TYPE_MAP = Object.fromEntries(
  Object.entries(POST_TYPE_MAP).map(([k, v]) => [v, k])
);

export const REACTION_TYPE_MAP = {
  like: 'LIKE',
  celebrate: 'FIRE',
  insightful: 'ROCKET',
};

/**
 * Normalized Error Helper
 */
const normalizeError = (error) => {
  console.error('[Community Service Error]:', error);
  const message = error.response?.data?.message || error.message || 'An unexpected community error occurred.';
  return {
    message,
    code: error.response?.data?.code || 'COMMUNITY_ERROR',
    status: error.response?.status,
    retryable: true
  };
};

// ─── Feed Methods ─────────────────────────────────────────────────────────────

/**
 * Get community feed with support for filters and pagination.
 * POST /api/posts
 */
export async function getFeed({ filter = 'all', authorId = null, page = 1, limit = 10 } = {}) {
  try {
    const params = { page, limit };
    
    // Map frontend filter to backend PostType
    if (filter !== 'all') {
      params.type = POST_TYPE_MAP[filter] || filter;
    }
    
    if (authorId) params.authorId = authorId;

    const response = await apiClient.get('/posts', { params });
    const { items, total, hasMore } = response.data.data;

    return {
      posts: items,
      hasMore,
      nextPage: page + 1,
      totalCount: total
    };
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Get a single post.
 * GET /api/posts/:id
 */
export async function getPost(postId) {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ─── Post Actions ─────────────────────────────────────────────────────────────

/**
 * Toggle reaction on a post.
 * POST /api/posts/:postId/react
 */
export async function reactToPost(postId, reactionId) {
  try {
    const backendType = REACTION_TYPE_MAP[reactionId] || reactionId;
    const response = await apiClient.post(`/posts/${postId}/react`, { type: backendType });
    return response.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Save post for later.
 * POST /api/posts/:postId/save
 */
export async function savePost(postId) {
  try {
    const response = await apiClient.post(`/posts/${postId}/save`);
    return response.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Create a new post.
 * POST /api/posts
 */
export async function createPost(payload) {
  try {
    const backendPayload = {
      content: payload.content,
      type: POST_TYPE_MAP[payload.type] || 'TEXT',
    };
    if (payload.title) backendPayload.title = payload.title;

    const response = await apiClient.post('/posts', backendPayload);
    return response.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Delete a post.
 * DELETE /api/posts/:id
 */
export async function deletePost(postId) {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ─── Social & Discovery ───────────────────────────────────────────────────────

/**
 * Follow/Unfollow user.
 * POST /api/friends/follow/:userId
 * DELETE /api/friends/follow/:userId
 */
export async function toggleFollow(userId, isFollowing) {
  try {
    if (isFollowing) {
      await apiClient.delete(`/friends/follow/${userId}`);
      return { userId, state: 'none' };
    } else {
      const response = await apiClient.post(`/friends/follow/${userId}`);
      return { userId, state: 'following', data: response.data.data };
    }
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Get trending discussions.
 * GET /api/posts/trending
 */
export async function getTrending() {
  try {
    const response = await apiClient.get('/posts/trending');
    const { items } = response.data.data;
    // Backend doesn't return MOCK_TAGS, so we return empty tags for now
    return { discussions: items, tags: [] };
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Get top developers from leaderboard.
 * GET /api/ranking/leaderboard
 */
export async function getTopDevelopers(limit = 5) {
  try {
    const response = await apiClient.get('/ranking/leaderboard', { params: { page: 1, limit } });
    return response.data.data.items;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Get friends who are currently online.
 * GET /api/friends
 */
export async function getOnlineFriends() {
  try {
    const response = await apiClient.get('/friends');
    const friends = response.data.data.items;
    return friends.filter(f => f.isOnline);
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Get community statistics (Derived).
 */
export async function getCommunityStats() {
  try {
    // Parallel requests to avoid sequential waterfall
    const [postsRes, usersRes] = await Promise.all([
      apiClient.get('/posts', { params: { limit: 1 } }),
      apiClient.get('/ranking/leaderboard', { params: { limit: 1 } })
    ]);

    return {
      members: usersRes.data.data.total || 0,
      posts: postsRes.data.data.total || 0,
      trending: 0, // Not available in backend aggregate
      activeNow: 0 // Not available in backend aggregate
    };
  } catch (err) {
    // Return empty fallback instead of throwing for sidebar stats
    return { members: 0, posts: 0, trending: 0, activeNow: 0 };
  }
}

/**
 * Search community (Partial implementation via filtering list).
 * Note: Backend lacks dedicated search endpoint.
 */
export async function searchCommunity(query) {
  try {
    // For now, we fallback to just listing posts as search is not implemented on backend
    return { posts: [] };
  } catch (err) {
    throw normalizeError(err);
  }
}

// ─── Comments ─────────────────────────────────────────────────────────────────

/**
 * Get comments for a post.
 * GET /api/posts/:id/comments
 */
export async function getComments(postId, { page = 1, limit = 50 } = {}) {
  try {
    const response = await apiClient.get(`/posts/${postId}/comments`, { params: { page, limit } });
    return response.data.data.items;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Create a new comment.
 * POST /api/posts/:id/comments
 */
export async function createComment(postId, payload) {
  try {
    const body = { content: payload.content };
    if (payload.parentId) body.parentId = payload.parentId;
    const response = await apiClient.post(`/posts/${postId}/comments`, body);
    return response.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}