import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "../services/auth.service.js";

/**
 * Zustand Auth Store with localStorage persistence.
 *
 * Persisted state: user, accessToken, refreshToken, isAuthenticated
 * Transient state: loading, error
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // ── State ────────────────────────────────────────────────────
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      authInitialized: false, // NEW: Tracks if the initial hydration check is complete
      loading: false,
      error: null,


      // ── Actions ──────────────────────────────────────────────────

      /**
       * Log in: calls the API, stores tokens & user, marks authenticated.
       */
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.login(credentials);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return data;
        } catch (err) {
          const message =
            err.response?.data?.message || "Login failed. Please try again.";
          set({ loading: false, error: message });
          throw err;
        }
      },

      /**
       * Register: calls the API, stores tokens & user, marks authenticated.
       */
      register: async (formData) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.register(formData);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return data;
        } catch (err) {
          const message =
            err.response?.data?.message || "Registration failed. Please try again.";
          set({ loading: false, error: message });
          throw err;
        }
      },

      /**
       * Log out: notifies the backend, then clears all local state.
       */
      logout: async () => {
        set({ loading: true });
        try {
          const { refreshToken } = get();
          if (refreshToken) {
            await authService.logout(refreshToken);
          }
        } catch {
          // Ignore server-side errors — still clear local state
        } finally {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      },

      /**
       * Exchange a one-time social auth temp code for real JWT tokens.
       * Called by SocialCallback.jsx after the OAuth redirect.
       */
      exchangeSocialCode: async (code) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.exchangeCode(code);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return data;
        } catch (err) {
          const message =
            err.response?.data?.message || "Social login failed. Please try again.";
          set({ loading: false, error: message });
          throw err;
        }
      },

      /**
       * Set user data (e.g. after fetching /auth/me).
       */
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      /**
       * Mark the profile as completed (updates the stored user object).
       */
      markProfileComplete: () =>
        set((state) => ({
          user: state.user ? { ...state.user, profileCompleted: true } : state.user,
        })),

      /**
       * Silently refresh the session using the stored refreshToken.
       * Called by the interceptor automatically; exposed here for manual use.
       */
      refreshSession: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return false;

        try {
          const tokens = await authService.refresh(refreshToken);
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          return true;
        } catch {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          return false;
        }
      },

      /**
       * On app startup, validate the persisted accessToken by calling /auth/me.
       * If the token is expired, attempts a silent refresh.
       * Prevents stale state from keeping the user "authenticated" when they're not.
       */
      initializeAuth: async () => {
        const { accessToken, refreshToken } = get();

        if (!accessToken) {
          set({ isAuthenticated: false, authInitialized: true, loading: false });
          return;
        }

        set({ loading: true });
        try {
          const user = await authService.getMe();
          set({ user, isAuthenticated: true, loading: false });
        } catch (err) {
          // Access token likely expired — try refresh
          if (err.response?.status === 401 && refreshToken) {
            try {
              const tokens = await authService.refresh(refreshToken);
              set({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
              });
              // Retry getMe with new token
              const user = await authService.getMe();
              set({ user, isAuthenticated: true, loading: false });
            } catch {
              // Refresh also failed — clear everything
              set({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                loading: false,
              });
            }
          } else {
            set({
              user: null,
              accessToken: null,
              refreshToken: null,
              isAuthenticated: false,
              loading: false,
            });
          }
        } finally {
          set({ authInitialized: true, loading: false });
        }
      },


      /**
       * Manually clear any error in the store.
       */
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({
        // Only persist tokens and user — not transient loading/error state
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Selector: returns true when the authenticated user has completed onboarding.
 * Usage: const isProfileComplete = useProfileComplete();
 */
export const useProfileComplete = () =>
  useAuthStore((s) => s.user?.profileCompleted ?? false);

export default useAuthStore;