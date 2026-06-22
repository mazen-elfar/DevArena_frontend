import apiClient from "./api.client.js";

/**
 * Profile Service
 * Manages user developer profiles, statistics, and social interactions.
 */

export const getProfile = async (username) => {
  const res = await apiClient.get(`/profile/${username}`);
  return res.data.data;
};

export const updateProfile = async (data) => {
  const res = await apiClient.patch('/profile', data);
  return res.data.data;
};

export const completeOnboarding = async (data) => {
  const res = await apiClient.patch('/profile/onboarding', data);
  return res.data.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const res = await apiClient.post('/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
};

export const uploadBanner = async (file) => {
  const formData = new FormData();
  formData.append('banner', file);
  const res = await apiClient.post('/profile/banner', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
};

export const getStatistics = async (userId) => {
  const res = await apiClient.get(`/profile/${userId}/statistics`);
  return res.data.data;
};

export const getAchievements = async (userId) => {
  const res = await apiClient.get(`/profile/${userId}/achievements`);
  return res.data.data;
};

export const followUser = async (userId) => {
  const res = await apiClient.post(`/profile/${userId}/follow`);
  return res.data.data;
};

export const unfollowUser = async (userId) => {
  const res = await apiClient.delete(`/profile/${userId}/unfollow`);
  return res.data.data;
};
