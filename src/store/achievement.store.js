import { create } from "zustand";

/**
 * Achievement Store
 * Tracks unlocked achievements and progress towards new ones.
 */
const useAchievementStore = create((set) => ({
  achievements: [],
  userAchievements: [], // [{ achievementId, unlockedAt }]
  recentUnlocks: [],
  
  loading: false,

  setAchievements: (achievements) => set({ achievements }),
  setUserAchievements: (userAchievements) => set({ 
    userAchievements,
    recentUnlocks: userAchievements
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
      .slice(0, 5)
  }),
  
  addUnlock: (unlock) => set((state) => ({
    userAchievements: [unlock, ...state.userAchievements],
    recentUnlocks: [unlock, ...state.recentUnlocks.slice(0, 4)]
  }))
}));

export default useAchievementStore;
