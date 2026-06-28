import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as profileService from '../../services/profile.service';
import useAuthStore from '../../store/auth.store';
import useProfileStore from '../../store/profile.store';
import { Sidebar } from '../home/components/Sidebar/Sidebar';
import '../home/components/Sidebar/Sidebar.css';

// Components
import ProfileHero from './components/ProfileHero';
import ProfileTabs from './components/ProfileTabs';
import StatsTab from './components/StatsTab';
import TrophiesTab from './components/TrophiesTab';
import ActivityTab from './components/ActivityTab';
import SettingsTab from './components/SettingsTab';

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);
  const { setProfile } = useProfileStore();
  const [activeTab, setActiveTab] = useState('stats');

  const currentUsername = currentUser?.profile?.username;
  const isOwnProfile = !username || username === currentUsername;
  const targetUsername = username || currentUsername;

  // Fetch Profile Data
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['profile', targetUsername],
    queryFn: () => profileService.getProfile(targetUsername),
    enabled: !!targetUsername,
  });

  // Fetch Stats
  const { data: stats } = useQuery({
    queryKey: ['stats', targetUsername],
    queryFn: () => profileService.getStatistics(targetUsername),
    enabled: !!targetUsername,
  });

  // Fetch Trophies
  const { data: achievements } = useQuery({
    queryKey: ['achievements', targetUsername],
    queryFn: () => profileService.getAchievements(targetUsername),
    enabled: !!targetUsername,
  });

  // Fetch Activity Feed
  const { data: activityData } = useQuery({
    queryKey: ['activity', targetUsername],
    queryFn: () => profileService.getActivity(targetUsername),
    enabled: !!targetUsername,
  });

  // Update Profile Mutation
  const updateMutation = useMutation({
    mutationFn: (data) => profileService.updateProfile(data),
    onSuccess: (newProfile) => {
      queryClient.invalidateQueries({ queryKey: ['profile', targetUsername] });
      setProfile(newProfile);
    },
  });

  // Avatar Upload Mutation
  const avatarMutation = useMutation({
    mutationFn: (file) => profileService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', targetUsername] });
    },
  });

  // Banner Upload Mutation
  const bannerMutation = useMutation({
    mutationFn: (file) => profileService.uploadBanner(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', targetUsername] });
    },
  });

  // Follow Mutation
  const followMutation = useMutation({
    mutationFn: (userId) => profileService.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', targetUsername] });
    },
  });

  // Unfollow Mutation
  const unfollowMutation = useMutation({
    mutationFn: (userId) => profileService.unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', targetUsername] });
    },
  });

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsTab stats={stats} />;
      case 'trophies':
        return <TrophiesTab achievements={achievements} />;
      case 'activity':
        return <ActivityTab logs={activityData?.data?.items || []} />;
      case 'settings':
        return isOwnProfile ? (
          <SettingsTab profile={profile} onUpdate={(data) => updateMutation.mutate(data)} />
        ) : (
          <div className="text-center py-12 text-on-surface-variant italic">You cannot view settings for other users.</div>
        );
      default:
        return <StatsTab stats={stats} />;
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans">
        <Sidebar activeTab="profile" />
        <main className="flex-1 ml-64 overflow-y-auto flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-sm text-gray-500 font-mono">Loading profile…</p>
          </div>
        </main>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans">
        <Sidebar activeTab="profile" />
        <main className="flex-1 ml-64 overflow-y-auto flex flex-col items-center justify-center p-8">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">person_off</span>
          <h2 className="text-xl font-semibold text-white mb-2">Profile Not Found</h2>
          <p className="text-gray-500 text-sm">The developer you are looking for does not exist in the Arena.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans">
      <Sidebar activeTab="profile" />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
          <ProfileHero
            profile={profile}
            isOwnProfile={isOwnProfile}
            onAvatarUpload={(file) => avatarMutation.mutate(file)}
            onBannerUpload={(file) => bannerMutation.mutate(file)}
            isUploading={avatarMutation.isPending || bannerMutation.isPending}
            onFollow={() => followMutation.mutate(profile.id)}
            onUnfollow={() => unfollowMutation.mutate(profile.id)}
            isFollowPending={followMutation.isPending || unfollowMutation.isPending}
          />

          <div className="flex flex-col gap-8">
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="transition-all duration-300">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
