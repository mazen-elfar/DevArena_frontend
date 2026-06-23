import { useQuery } from "@tanstack/react-query";
import useAchievementStore from "../../store/achievement.store.js";
import { useEffect } from "react";
// import * as achievementService from "../../services/achievement.service.js"; // To be created

/**
 * useAchievements
 * Fetches all available achievements and the user's unlocked achievements.
 */
export function useAchievements(profileId) {
  const setUserAchievements = useAchievementStore((s) => s.setUserAchievements);

  const query = useQuery({
    queryKey: ["achievements", profileId],
    queryFn: async () => {
      // res = await achievementService.getUserAchievements(profileId);
      // return res.data;
      return []; // Placeholder
    },
    enabled: !!profileId,
  });

  useEffect(() => {
    if (query.data) {
      setUserAchievements(query.data);
    }
  }, [query.data, setUserAchievements]);

  return query;
}
