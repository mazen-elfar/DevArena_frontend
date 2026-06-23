import { create } from "zustand";

/**
 * Seasonal Store
 * Manages active seasons and the user's seasonal performance.
 */
const useSeasonalStore = create((set) => ({
  activeSeason: null,
  allSeasons: [],
  userSeasonalStats: null, // { seasonId, seasonXP, seasonRating, rank... }
  
  loading: false,

  setActiveSeason: (season) => set({ activeSeason: season }),
  setAllSeasons: (seasons) => set({ allSeasons: seasons }),
  setUserSeasonalStats: (stats) => set({ userSeasonalStats: stats }),

  isSeasonActive: () => {
    const active = get().activeSeason;
    if (!active) return false;
    return new Date() >= new Date(active.startDate) && new Date() <= new Date(active.endDate);
  }
}));

export default useSeasonalStore;
