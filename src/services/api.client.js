import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Axios instance used by all service modules.
 * - Automatically attaches the accessToken from localStorage as a Bearer header.
 * - On 401, attempts a silent token refresh, then retries the original request once.
 * - On refresh failure, clears auth state and redirects to /auth.
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// ── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Read token fresh from localStorage on every request (Zustand persist stores it there)
    const raw = localStorage.getItem("auth-store");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.accessToken;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch {
        // ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────────────────────
let isRefreshing = false;
let refreshQueue = []; // queued requests waiting for a token refresh

function processQueue(error, token = null) {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only handle 401 errors that haven't already been retried
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // Don't intercept auth endpoints themselves to avoid loops
    if (
      original.url?.includes("/auth/login") ||
      original.url?.includes("/auth/register") ||
      original.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the in-flight refresh completes
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers["Authorization"] = `Bearer ${token}`;
          return apiClient(original);
        })
        .catch((err) => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      // Read refreshToken from persisted Zustand store
      const raw = localStorage.getItem("auth-store");
      let refreshToken = null;
      if (raw) {
        const parsed = JSON.parse(raw);
        refreshToken = parsed?.state?.refreshToken;
      }

      if (!refreshToken) throw new Error("No refresh token available");

      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      // Patch Zustand persisted store directly so the store picks it up on next read
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.accessToken = newAccessToken;
        parsed.state.refreshToken = newRefreshToken;
        localStorage.setItem("auth-store", JSON.stringify(parsed));
      }

      processQueue(null, newAccessToken);
      original.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return apiClient(original);
    } catch (refreshError) {
      processQueue(refreshError, null);

      // Clear auth state and redirect
      localStorage.removeItem("auth-store");
      window.location.href = "/auth";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;