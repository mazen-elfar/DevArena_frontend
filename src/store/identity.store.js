import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "../services/auth.service.js";

/**
 * Identity Store
 * Manages Authentication, Roles, and Permissions.
 * Focuses on 'Who the user is' and 'What they can do'.
 */
const useIdentityStore = create(
  persist(
    (set, get) => ({
      user: null, // Basic identity: { id, email, status }
      roles: [],
      permissions: [],
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitialized: false,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const { user, accessToken, refreshToken } = await authService.login(credentials);
          set({
            user: { id: user.id, email: user.email, status: user.status },
            roles: user.roles,
            permissions: user.permissions,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            loading: false
          });
        } catch (err) {
          set({ error: err.response?.data?.message || "Login failed", loading: false });
          throw err;
        }
      },

      logout: async () => {
        const { refreshToken } = get();
        if (refreshToken) await authService.logout(refreshToken);
        set({
          user: null,
          roles: [],
          permissions: [],
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null
        });
      },

      hasPermission: (permission) => {
        return get().permissions.includes(permission);
      },

      hasRole: (role) => {
        return get().roles.includes(role);
      },

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken })
    }),
    {
      name: "devarena-identity",
      partialize: (state) => ({
        user: state.user,
        roles: state.roles,
        permissions: state.permissions,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useIdentityStore;
