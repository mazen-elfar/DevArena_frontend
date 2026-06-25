/**
 * Community Hub — UI Configuration
 *
 * This file contains only UI-related configurations. 
 * All data is now fetched from the production backend.
 */

// ─── Navigation Structure ─────────────────────────────────────────────────────

export const COMMUNITY_NAV = [
  {
    section: 'Main',
    items: [
      { id: 'home', label: 'Home Feed', icon: 'home', badge: null },
      { id: 'trending', label: 'Trending', icon: 'local_fire_department', badge: null },
      { id: 'following', label: 'Following', icon: 'group', badge: null },
      { id: 'saved', label: 'Saved Posts', icon: 'bookmark', badge: null },
    ],
  },
  {
    section: 'Social',
    items: [
      { id: 'friends', label: 'Friends', icon: 'people', badge: null },
      { id: 'notifications', label: 'Notifications', icon: 'notifications', badge: null },
    ],
  },
  {
    section: 'Community',
    items: [
      { id: 'discussions', label: 'Discussions', icon: 'forum', badge: null },
      { id: 'showcases', label: 'Showcases', icon: 'deployed_code', badge: null },
      { id: 'opensource', label: 'Open Source', icon: 'code', badge: null },
    ],
  },
  {
    section: 'Competitive',
    items: [
      { id: 'battles', label: 'Battle Highlights', icon: 'swords', badge: null },
      { id: 'quests', label: 'Quest Achievements', icon: 'map', badge: null },
    ],
  },
];

// ─── Feed Filters ─────────────────────────────────────────────────────────────

export const FEED_FILTERS = [
  { id: 'all', label: 'All', icon: null },
  { id: 'following', label: 'Following', icon: null },
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'battles', label: 'Battles', icon: '⚔️' },
  { id: 'quests', label: 'Quests', icon: '🗺️' },
  { id: 'projects', label: 'Projects', icon: '🛠️' },
];

// ─── Post Type Config ─────────────────────────────────────────────────────────

export const POST_TYPE_CONFIG = {
  developer: { label: 'Developer Post', color: '#00f0ff', icon: 'person' },
  discussion: { label: 'Discussion', color: '#818cf8', icon: 'forum' },
  achievement: { label: 'Achievement', color: '#f59e0b', icon: 'military_tech' },
  victory: { label: 'Battle Victory', color: '#00f0ff', icon: 'swords' },
  quest: { label: 'Quest Complete', color: '#a78bfa', icon: 'map' },
  showcase: { label: 'Project Showcase', color: '#34d399', icon: 'deployed_code' },
};

// ─── Rank Config ─────────────────────────────────────────────────────────────

export const RANK_CONFIG = {
  Bronze:   { color: '#cd7f32', bg: 'rgba(205,127,50,0.12)', glow: 'rgba(205,127,50,0.25)' },
  Silver:   { color: '#c0c0c0', bg: 'rgba(192,192,192,0.12)', glow: 'rgba(192,192,192,0.25)' },
  Gold:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', glow: 'rgba(245,158,11,0.25)' },
  Platinum: { color: '#c084fc', bg: 'rgba(192,132,252,0.12)', glow: 'rgba(192,132,252,0.25)' },
  Diamond:  { color: '#00f0ff', bg: 'rgba(0,240,255,0.12)', glow: 'rgba(0,240,255,0.25)' },
  Champion: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', glow: 'rgba(245,158,11,0.35)' },
};

