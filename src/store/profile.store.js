import { create } from "zustand";

/**
 * Profile Store
 * Manages Public Developer Identity, Reputation, Stats, and Skills.
 * Focuses on 'What the developer has achieved'.
 * Works in tandem with React Query for server-state synchronization.
 */
const useProfileStore = create((set, get) => ({
  profile: null, // Detailed profile: { id, username, level, xp, rating, skills, stats... }
  reputation: {
    community: 0,
    battle: 0,
    quest: 0,
    tournament: 0,
    openSource: 0,
    total: 0
  },
  
  loading: false,
  error: null,

  setProfile: (profile) => set({ 
    profile, 
    reputation: profile?.reputationScores || get().reputation 
  }),

  updateStats: (newStats) => set((state) => ({
    profile: state.profile ? { ...state.profile, ...newStats } : state.profile
  })),

  clearProfile: () => set({ profile: null, reputation: { community: 0, battle: 0, quest: 0, tournament: 0, openSource: 0, total: 0 } })
}));

export default useProfileStore;
