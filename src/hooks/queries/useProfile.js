import { useQuery } from "@tanstack/react-query";
import * as profileService from "../../services/profile.service.js";
import useProfileStore from "../../store/profile.store.js";
import { useEffect } from "react";

/**
 * useProfile
 * Fetches the developer profile and syncs it with the Zustand ProfileStore.
 */
export function useProfile(username) {
  const setProfile = useProfileStore((s) => s.setProfile);

  const query = useQuery({
    queryKey: ["profile", username],
    queryFn: () => profileService.getProfile(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (query.data) {
      setProfile(query.data);
    }
  }, [query.data, setProfile]);

  return query;
}

/**
 * useMyProfile
 * Fetches the currently authenticated user's profile.
 */
export function useMyProfile() {
  const setProfile = useProfileStore((s) => s.setProfile);

  const query = useQuery({
    queryKey: ["profile", "me"],
    queryFn: () => profileService.getMyProfile(),
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setProfile(query.data);
    }
  }, [query.data, setProfile]);

  return query;
}
