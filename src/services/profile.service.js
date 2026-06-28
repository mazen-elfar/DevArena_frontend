import apiClient from "./api.client.js";

/**
 * Profile Service
 * All endpoints match the backend profile module.
 */

export const getProfile = async (username) => {
  const res = await apiClient.get(`/profile/${username}`);
  return res.data.data;
};

export const getMyProfile = async () => {
  const res = await apiClient.get("/profile/me");
  return res.data.data;
};

export const updateProfile = async (data) => {
  const res = await apiClient.patch("/profile", data);
  return res.data.data;
};

export const completeOnboarding = async (data) => {
  const res = await apiClient.patch("/profile/onboarding", data);
  return res.data.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await apiClient.post("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const uploadBanner = async (file) => {
  const formData = new FormData();
  formData.append("banner", file);
  const res = await apiClient.post("/profile/banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const getStatistics = async (username) => {
  const res = await apiClient.get(`/profile/${username}/statistics`);
  return res.data.data;
};

export const getAchievements = async (username) => {
  const res = await apiClient.get(`/profile/${username}/achievements`);
  return res.data.data;
};

export const getActivity = async (username, page = 1, limit = 20) => {
  const res = await apiClient.get(`/profile/${username}/activity`, {
    params: { page, limit },
  });
  return res.data;
};

export const getFollowers = async (username, page = 1, limit = 20) => {
  const res = await apiClient.get(`/profile/${username}/followers`, {
    params: { page, limit },
  });
  return res.data;
};

export const getFollowing = async (username, page = 1, limit = 20) => {
  const res = await apiClient.get(`/profile/${username}/following`, {
    params: { page, limit },
  });
  return res.data;
};

export const followUser = async (userId) => {
  const res = await apiClient.post(`/profile/${userId}/follow`);
  return res.data.data;
};

export const unfollowUser = async (userId) => {
  const res = await apiClient.delete(`/profile/${userId}/unfollow`);
  return res.data.data;
};
