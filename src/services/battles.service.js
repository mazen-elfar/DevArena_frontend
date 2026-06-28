import apiClient from "./api.client";

// ── Battle CRUD ──────────────────────────────────────────────────────────────

export async function createBattle(data) {
  const response = await apiClient.post("/battles", data);
  return response.data;
}

export async function getBattles(params) {
  const response = await apiClient.get("/battles", { params });
  return response.data;
}

export async function getBattle(battleId) {
  const response = await apiClient.get(`/battles/${battleId}`);
  return response.data;
}

export async function joinBattle(battleId) {
  const response = await apiClient.post(`/battles/${battleId}/join`);
  return response.data;
}

export async function leaveBattle(battleId) {
  const response = await apiClient.post(`/battles/${battleId}/leave`);
  return response.data;
}

export async function submitCode(battleId, data) {
  const response = await apiClient.post(`/battles/${battleId}/submit`, data);
  return response.data;
}

export async function completeBattle(battleId) {
  const response = await apiClient.post(`/battles/${battleId}/complete`);
  return response.data;
}

export async function cancelBattle(battleId) {
  const response = await apiClient.post(`/battles/${battleId}/cancel`);
  return response.data;
}

export async function getBattleResults(battleId) {
  const response = await apiClient.get(`/battles/${battleId}/results`);
  return response.data;
}

export async function getLeaderboard(params) {
  const response = await apiClient.get("/battles/leaderboard", { params });
  return response.data;
}

// ── Matchmaking ──────────────────────────────────────────────────────────────

export async function joinMatchmaking() {
  const response = await apiClient.post("/matchmaking/join");
  return response.data;
}

export async function leaveMatchmaking() {
  const response = await apiClient.delete("/matchmaking/leave");
  return response.data;
}

export async function getMatchmakingStatus() {
  const response = await apiClient.get("/matchmaking/status");
  return response.data;
}
