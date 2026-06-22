import apiClient from "./api.client.js";

/**
 * Frontend Auth Service
 * All methods communicate with the real backend. No mocks.
 */

/**
 * Register a new user.
 * @param {{ username: string, email: string, password: string }} data
 */
export async function register(data) {
  const res = await apiClient.post("/auth/register", data);
  return res.data.data; // { user, accessToken, refreshToken }
}

/**
 * Log in with email + password.
 * @param {{ email: string, password: string }} data
 */
export async function login(data) {
  const res = await apiClient.post("/auth/login", data);
  return res.data.data; // { user, accessToken, refreshToken }
}

/**
 * Log out the current user.
 * Sends the refreshToken in the body so the backend can invalidate it.
 * @param {string} refreshToken
 */
export async function logout(refreshToken) {
  const res = await apiClient.post("/auth/logout", { refreshToken });
  return res.data;
}

/**
 * Exchange a refresh token for a new token pair.
 * @param {string} refreshToken
 */
export async function refresh(refreshToken) {
  const res = await apiClient.post("/auth/refresh", { refreshToken });
  return res.data.data; // { accessToken, refreshToken }
}

/**
 * Fetch the currently authenticated user.
 * Requires a valid accessToken in the Authorization header (injected by api.client.js).
 */
export async function getMe() {
  const res = await apiClient.get("/auth/me");
  return res.data.data; // user object
}

/**
 * Exchange a one-time social auth temp code for real JWT tokens.
 * @param {string} code - Temp code received in the OAuth redirect query param
 */
export async function exchangeCode(code) {
  const res = await apiClient.post("/auth/exchange", { code });
  return res.data.data; // { user, accessToken, refreshToken }
}