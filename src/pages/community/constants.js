/**
 * Community Hub V3 — Mock Data Constants
 *
 * All data follows unified schemas for API-first architecture.
 * The `metadata` field carries post-type-specific data.
 * Developer identity is consistent across all surfaces.
 */

// ─── Developer Identities ─────────────────────────────────────────────────────

export const DEVELOPER_ZEUS = {
  id: 'usr_zeus_01',
  username: 'zeusdev',
  displayName: 'Zeus Nakamura',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=zeus&backgroundColor=0a0a15',
  banner: null,
  bio: 'Full-stack engineer. Open source contributor. Building at the speed of thought.',
  major: 'Software Engineering',
  university: 'MIT',
  region: '🇺🇸',
  level: 87,
  xp: 142800,
  rank: 'Diamond',
  rankColor: '#00f0ff',
  reputation: 4250,
  followers: 1240,
  following: 380,
  githubUrl: 'https://github.com/zeusdev',
  linkedinUrl: null,
  portfolioUrl: 'https://zeusdev.io',
};

export const DEVELOPER_NOVA = {
  id: 'usr_nova_02',
  username: 'vector_nova',
  displayName: 'Nova Chen',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=nova&backgroundColor=0a0a15',
  banner: null,
  bio: 'Systems programmer. Rust evangelist. Competitive coder.',
  major: 'Computer Science',
  university: 'Stanford',
  region: '🇨🇳',
  level: 95,
  xp: 198400,
  rank: 'Champion',
  rankColor: '#f59e0b',
  reputation: 8120,
  followers: 3840,
  following: 210,
  githubUrl: 'https://github.com/vectornova',
  linkedinUrl: 'https://linkedin.com/in/vectornova',
  portfolioUrl: null,
};

export const DEVELOPER_LUNA = {
  id: 'usr_luna_03',
  username: 'luna_codes',
  displayName: 'Luna Petrov',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=luna&backgroundColor=0a0a15',
  banner: null,
  bio: 'React architect. Design systems. 10x UI.',
  major: 'HCI',
  university: 'Carnegie Mellon',
  region: '🇷🇺',
  level: 73,
  xp: 94200,
  rank: 'Platinum',
  rankColor: '#c084fc',
  reputation: 3690,
  followers: 2100,
  following: 540,
  githubUrl: 'https://github.com/lunacodes',
  linkedinUrl: 'https://linkedin.com/in/lunacodes',
  portfolioUrl: null,
};

export const DEVELOPER_ZEN = {
  id: 'usr_zen_04',
  username: 'coder_zen',
  displayName: 'Zendaya Okonkwo',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=zen&backgroundColor=0a0a15',
  banner: null,
  bio: 'Open-source architect. Contributed to 50+ repos.',
  major: 'Computer Science',
  university: 'University of Lagos',
  region: '🇳🇬',
  level: 85,
  xp: 138000,
  rank: 'Diamond',
  rankColor: '#00f0ff',
  reputation: 6450,
  followers: 2940,
  following: 170,
  githubUrl: 'https://github.com/coderzen',
  linkedinUrl: null,
  portfolioUrl: null,
};

export const DEVELOPER_MARCUS = {
  id: 'usr_marcus_05',
  username: 'marcus_dev',
  displayName: 'Marcus Alves',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=marcus&backgroundColor=0a0a15',
  banner: null,
  bio: 'Backend engineer. Distributed systems. Go + Rust.',
  major: 'Software Engineering',
  university: 'USP',
  region: '🇧🇷',
  level: 62,
  xp: 71400,
  rank: 'Gold',
  rankColor: '#f59e0b',
  reputation: 2180,
  followers: 870,
  following: 430,
  githubUrl: 'https://github.com/marcusdev',
  linkedinUrl: 'https://linkedin.com/in/marcusdev',
  portfolioUrl: null,
};

export const DEVELOPER_PIXEL = {
  id: 'usr_pixel_06',
  username: 'pixel_king',
  displayName: 'Pixel King',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=pixel&backgroundColor=0a0a15',
  banner: null,
  bio: 'Game dev + WebGL. Making the browser do wild things.',
  major: 'Game Design',
  region: '🇯🇵',
  level: 55,
  xp: 48000,
  rank: 'Gold',
  rankColor: '#f59e0b',
  reputation: 1540,
  followers: 540,
  following: 280,
  githubUrl: 'https://github.com/pixelking',
  linkedinUrl: null,
  portfolioUrl: 'https://pixelk.dev',
};

export const DEVELOPER_DAVE = {
  id: 'usr_dave_07',
  username: 'dave_script',
  displayName: 'Dave Schmidt',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=dave&backgroundColor=0a0a15',
  banner: null,
  bio: 'JavaScript wizard. Node.js core contributor wannabe.',
  major: 'Computer Science',
  university: 'TU Berlin',
  region: '🇩🇪',
  level: 78,
  xp: 108500,
  rank: 'Platinum',
  rankColor: '#c084fc',
  reputation: 5120,
  followers: 1820,
  following: 390,
  githubUrl: 'https://github.com/davescript',
  linkedinUrl: null,
  portfolioUrl: null,
};

export const DEVELOPER_SARAH = {
  id: 'usr_sarah_08',
  username: 'dev_sarah',
  displayName: 'Sarah Kim',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=sarah&backgroundColor=0a0a15',
  banner: null,
  bio: 'ML engineer building the future.',
  major: 'AI & Machine Learning',
  university: 'Yonsei',
  region: '🇰🇷',
  level: 69,
  xp: 82000,
  rank: 'Platinum',
  rankColor: '#c084fc',
  reputation: 3210,
  followers: 1340,
  following: 510,
  githubUrl: 'https://github.com/devsarah',
  linkedinUrl: 'https://linkedin.com/in/devsarah',
  portfolioUrl: null,
};

// ─── Unified Post Feed ────────────────────────────────────────────────────────

export const MOCK_FEED = [
  // ── Discussion Post ──
  {
    id: 'post_d1',
    authorId: DEVELOPER_MARCUS.id,
    author: DEVELOPER_MARCUS,
    type: 'discussion',
    visibility: 'public',
    content: '🔥 Hot take: React 19 concurrent features are actually more intuitive than I expected. Just refactored a massive dashboard — cut LOC by 30% and eliminated most of my prop-drilling nightmares. Anyone else experiencing this?\n\nKey things that clicked for me: `useOptimistic`, `use()` with Suspense, and the new `<form action>` pattern. The mental model is finally consistent.',
    tags: ['react', 'frontend', 'webdev', 'javascript'],
    metadata: {},
    reactions: { like: 128, celebrate: 14, insightful: 47 },
    myReaction: null,
    commentsCount: 45,
    sharesCount: 18,
    savedByMe: false,
    engagementScore: 189,
    reputationWeight: DEVELOPER_MARCUS.reputation,
    recencyScore: 0.95,
    followingWeight: 0,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },

  // ── Battle Victory Post ──
  {
    id: 'post_b1',
    authorId: DEVELOPER_NOVA.id,
    author: DEVELOPER_NOVA,
    type: 'victory',
    visibility: 'public',
    content: 'Memory optimization battle — took it to the limit. 89% reduction by switching to arena allocators and removing all unnecessary clones. Rust makes you think about every byte.',
    tags: ['rust', 'systems', 'algorithms', 'battle'],
    metadata: {
      opponent: { username: 'runtime_king', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=rk', rank: 'Gold' },
      problem: { title: 'Parallel Compute Optimizer', difficulty: 'Hard', slug: 'parallel-compute' },
      ratingChange: +42,
      xpEarned: 850,
      myLanguage: 'Rust',
      opponentLanguage: 'Python',
      duration: '38:22',
    },
    reactions: { like: 892, celebrate: 214, insightful: 67 },
    myReaction: 'celebrate',
    commentsCount: 34,
    sharesCount: 89,
    savedByMe: false,
    engagementScore: 1173,
    reputationWeight: DEVELOPER_NOVA.reputation,
    recencyScore: 0.88,
    followingWeight: 0,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },

  // ── Achievement Post ──
  {
    id: 'post_a1',
    authorId: DEVELOPER_ZEN.id,
    author: DEVELOPER_ZEN,
    type: 'achievement',
    visibility: 'public',
    content: 'The grind pays off. Formally verified as an Arch-Architect after contributing to 50+ open-source repositories. This took 14 months of consistent work. For anyone doubting themselves: consistency > intensity.',
    tags: ['opensource', 'milestone', 'achievement'],
    metadata: {
      achievement: {
        id: 'arch_architect',
        title: 'Arch-Architect',
        description: '50+ open-source repository contributions verified',
        icon: '🏛️',
        rarity: 'Legendary',
        xpAwarded: 5000,
        unlockedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      },
    },
    reactions: { like: 2400, celebrate: 890, insightful: 130 },
    myReaction: 'celebrate',
    commentsCount: 156,
    sharesCount: 234,
    savedByMe: true,
    engagementScore: 3420,
    reputationWeight: DEVELOPER_ZEN.reputation,
    recencyScore: 0.82,
    followingWeight: 0,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },

  // ── Quest Completion Post ──
  {
    id: 'post_q1',
    authorId: DEVELOPER_LUNA.id,
    author: DEVELOPER_LUNA,
    type: 'quest',
    visibility: 'public',
    content: 'Just wrapped the "System Design Master" quest chain. 8 system design challenges, 3 architecture reviews, and 2 peer evaluations — done. The distributed caching problem was genuinely humbling.',
    tags: ['systemdesign', 'quest', 'architecture'],
    metadata: {
      quest: {
        id: 'system_design_master',
        title: 'System Design Master',
        difficulty: 'Expert',
        difficultyColor: '#ef4444',
        xpEarned: 3200,
        completionTime: '6d 14h',
        questChainPosition: '8/8',
        badge: '⚙️',
      },
    },
    reactions: { like: 340, celebrate: 78, insightful: 92 },
    myReaction: null,
    commentsCount: 28,
    sharesCount: 41,
    savedByMe: false,
    engagementScore: 510,
    reputationWeight: DEVELOPER_LUNA.reputation,
    recencyScore: 0.78,
    followingWeight: 1,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },

  // ── Project Showcase Post ──
  {
    id: 'post_s1',
    authorId: DEVELOPER_ZEUS.id,
    author: DEVELOPER_ZEUS,
    type: 'showcase',
    visibility: 'public',
    content: 'Shipping: DevMap — a visual dependency graph for monorepos. Drag, filter, trace any module\'s full import chain. Built because I was losing my mind in a 400-package workspace. Zero deps, pure canvas.',
    tags: ['typescript', 'tooling', 'opensource', 'dx'],
    metadata: {
      project: {
        title: 'DevMap',
        description: 'Visual dependency graph explorer for monorepos',
        coverImage: null,
        githubUrl: 'https://github.com/zeusdev/devmap',
        demoUrl: 'https://devmap.zeusdev.io',
        technologies: ['TypeScript', 'Canvas API', 'Vite', 'Turborepo'],
        stars: 847,
        forks: 112,
      },
    },
    reactions: { like: 612, celebrate: 145, insightful: 289 },
    myReaction: 'insightful',
    commentsCount: 73,
    sharesCount: 128,
    savedByMe: true,
    engagementScore: 1046,
    reputationWeight: DEVELOPER_ZEUS.reputation,
    recencyScore: 0.72,
    followingWeight: 0,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },

  // ── Developer Text Post ──
  {
    id: 'post_dev1',
    authorId: DEVELOPER_DAVE.id,
    author: DEVELOPER_DAVE,
    type: 'developer',
    visibility: 'public',
    content: 'Spent 3 hours debugging a race condition in my event loop today.\n\nRoot cause: I was await-ing inside a forEach. This has been documented for years and I still fell for it. The fix was 1 line. The debugging was 3 hours.\n\nThis is software engineering.',
    tags: ['javascript', 'nodejs', 'debugging', 'async'],
    metadata: {},
    reactions: { like: 1840, celebrate: 290, insightful: 540 },
    myReaction: 'insightful',
    commentsCount: 212,
    sharesCount: 387,
    savedByMe: false,
    engagementScore: 2670,
    reputationWeight: DEVELOPER_DAVE.reputation,
    recencyScore: 0.65,
    followingWeight: 0,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },

  // ── Achievement Post ──
  {
    id: 'post_a2',
    authorId: DEVELOPER_ZEUS.id,
    author: DEVELOPER_ZEUS,
    type: 'achievement',
    visibility: 'public',
    content: 'Diamond rank achieved. 3 months of daily battles. The consistency is the strategy.',
    tags: ['milestone', 'battle', 'ranked'],
    metadata: {
      achievement: {
        id: 'diamond_rank',
        title: 'Diamond Rank Unlocked',
        description: 'Reached Diamond rank through competitive battles',
        icon: '💎',
        rarity: 'Epic',
        xpAwarded: 2500,
        unlockedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      },
    },
    reactions: { like: 540, celebrate: 198, insightful: 32 },
    myReaction: null,
    commentsCount: 47,
    sharesCount: 55,
    savedByMe: false,
    engagementScore: 770,
    reputationWeight: DEVELOPER_ZEUS.reputation,
    recencyScore: 0.60,
    followingWeight: 0,
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Trending Discussions ─────────────────────────────────────────────────────

export const MOCK_TRENDING = [
  { id: 't1', title: 'React 19 vs SolidJS — Which wins in 2026?', space: 'Frontend', engagement: 2840, trend: '+18%' },
  { id: 't2', title: 'AI Agents are replacing juniors. True or false?', space: 'Career', engagement: 5120, trend: '+42%' },
  { id: 't3', title: 'PostgreSQL 17 performance tips nobody talks about', space: 'Backend', engagement: 1680, trend: '+11%' },
  { id: 't4', title: 'Resume for FAANG — what actually matters in 2026', space: 'Career', engagement: 3240, trend: '+29%' },
  { id: 't5', title: 'Rust vs Go for microservices — real benchmarks', space: 'Systems', engagement: 920, trend: '+7%' },
];

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const MOCK_TAGS = [
  { id: 'tag_react', name: 'React', slug: 'react', color: '#61DAFB', icon: '⚛️', followersCount: 14200 },
  { id: 'tag_rust', name: 'Rust', slug: 'rust', color: '#F74C00', icon: '🦀', followersCount: 8750 },
  { id: 'tag_ai', name: 'AI', slug: 'ai', color: '#8B5CF6', icon: '🤖', followersCount: 22100 },
  { id: 'tag_systemdesign', name: 'System Design', slug: 'system-design', color: '#10B981', icon: '🏗️', followersCount: 11300 },
  { id: 'tag_career', name: 'Career', slug: 'career', color: '#F59E0B', icon: '🚀', followersCount: 9840 },
  { id: 'tag_os', name: 'Open Source', slug: 'open-source', color: '#6EE7B7', icon: '🌍', followersCount: 7620 },
];

// ─── Spaces ───────────────────────────────────────────────────────────────────

export const MOCK_SPACES = [
  { id: 'sp_react', name: 'React', icon: '⚛️', color: '#61DAFB', members: 14200, postsToday: 142 },
  { id: 'sp_ai', name: 'AI & ML', icon: '🤖', color: '#8B5CF6', members: 22100, postsToday: 318 },
  { id: 'sp_career', name: 'Career Hub', icon: '🚀', color: '#F59E0B', members: 9840, postsToday: 87 },
  { id: 'sp_os', name: 'Open Source', icon: '🌍', color: '#6EE7B7', members: 7620, postsToday: 64 },
  { id: 'sp_sys', name: 'Systems', icon: '⚙️', color: '#F74C00', members: 5480, postsToday: 39 },
  { id: 'sp_devops', name: 'DevOps', icon: '🔧', color: '#60A5FA', members: 6130, postsToday: 51 },
];

// ─── Top Developers (Weekly Leaderboard) ─────────────────────────────────────

export const MOCK_TOP_DEVELOPERS = [
  { ...DEVELOPER_NOVA,  weeklyXp: 9420, weeklyRank: 1, weeklyChange: +0 },
  { ...DEVELOPER_DAVE,  weeklyXp: 8115, weeklyRank: 2, weeklyChange: +1 },
  { ...DEVELOPER_ZEN,   weeklyXp: 7890, weeklyRank: 3, weeklyChange: -1 },
  { ...DEVELOPER_ZEUS,  weeklyXp: 7240, weeklyRank: 4, weeklyChange: +2 },
  { ...DEVELOPER_LUNA,  weeklyXp: 6780, weeklyRank: 5, weeklyChange: -1 },
];

// ─── Online Friends ───────────────────────────────────────────────────────────

export const MOCK_ONLINE_FRIENDS = [
  { ...DEVELOPER_SARAH, status: 'Coding Now', statusColor: '#22c55e' },
  { ...DEVELOPER_PIXEL, status: 'In a Battle ⚔️', statusColor: '#f59e0b' },
  { ...DEVELOPER_MARCUS, status: 'Idle', statusColor: '#6b7280' },
];

// ─── Suggested Developers ─────────────────────────────────────────────────────

export const MOCK_SUGGESTIONS = [
  { ...DEVELOPER_LUNA,  sharedSkills: ['React', 'TypeScript'], reason: 'Popular in your spaces' },
  { ...DEVELOPER_PIXEL, sharedSkills: ['WebGL', 'Canvas'], reason: 'Similar major' },
  { ...DEVELOPER_ZEUS,  sharedSkills: ['TypeScript', 'Open Source'], reason: 'Active this week' },
];

// ─── Community Stats ──────────────────────────────────────────────────────────

export const MOCK_STATS = {
  activeDevelopers: 12480,
  postsToday: 1842,
  battlesToday: 734,
  questsCompleted: 2190,
};

// ─── Mock Comments ────────────────────────────────────────────────────────────

export const MOCK_COMMENTS = {
  post_d1: [
    {
      id: 'c1',
      postId: 'post_d1',
      parentId: null,
      author: DEVELOPER_LUNA,
      content: 'The `useOptimistic` hook alone made it worth upgrading. Being able to assume the happy path and rollback on error changes how I think about forms entirely.',
      reactions: { like: 34 },
      myReaction: null,
      createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      replies: [
        {
          id: 'c1r1',
          postId: 'post_d1',
          parentId: 'c1',
          author: DEVELOPER_MARCUS,
          content: 'Agreed — though I\'d argue Remix had this pattern first with their action/loader model. React just formalized it.',
          reactions: { like: 12 },
          myReaction: null,
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          replies: [],
        },
      ],
    },
    {
      id: 'c2',
      postId: 'post_d1',
      parentId: null,
      author: DEVELOPER_ZEUS,
      content: 'The prop-drilling relief is real. Combining the new context API with Zustand for server state changed everything for my architecture.',
      reactions: { like: 19 },
      myReaction: 'like',
      createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
      replies: [],
    },
  ],
};

// ─── Aliases for RightPanel Components ───────────────────────────────────────

export const TRENDING_TOPICS = MOCK_TRENDING.map(t => ({
  id: t.id,
  tag: t.title.split('—')[0].trim().toLowerCase().replace(/[^a-z0-9]/g, ''),
  title: t.title,
  postsCount: t.engagement,
  trend: t.trend,
  isNew: parseInt(t.trend) > 20,
}));

export const TOP_DEVELOPERS = MOCK_TOP_DEVELOPERS.map(d => ({
  id: d.id,
  username: d.username,
  displayName: d.displayName,
  avatar: d.avatar,
  rank: d.rank,
  reputation: d.reputation,
}));

export const ONLINE_FRIENDS = MOCK_ONLINE_FRIENDS.map(f => ({
  id: f.id,
  username: f.username,
  displayName: f.displayName,
  avatar: f.avatar,
  status: f.status,
  statusColor: f.statusColor,
}));

export const SUGGESTED_DEVELOPERS = MOCK_SUGGESTIONS.map(s => ({
  id: s.id,
  username: s.username,
  displayName: s.displayName,
  avatar: s.avatar,
  sharedSkills: s.sharedSkills,
  reason: s.reason,
  mutualsCount: Math.floor(Math.random() * 20) + 1,
}));

export const COMMUNITY_STATS = [
  { id: 'stat_devs', label: 'Active Devs', value: MOCK_STATS.activeDevelopers.toLocaleString() },
  { id: 'stat_posts', label: 'Posts Today', value: MOCK_STATS.postsToday.toLocaleString() },
  { id: 'stat_battles', label: 'Battles Today', value: MOCK_STATS.battlesToday.toLocaleString() },
  { id: 'stat_quests', label: 'Quests Done', value: MOCK_STATS.questsCompleted.toLocaleString() },
];

// ─── Navigation Structure ─────────────────────────────────────────────────────

export const COMMUNITY_NAV = [
  {
    section: 'Main',
    items: [
      { id: 'home', label: 'Home Feed', icon: 'home', badge: null },
      { id: 'trending', label: 'Trending', icon: 'local_fire_department', badge: null },
      { id: 'following', label: 'Following', icon: 'group', badge: 3 },
      { id: 'saved', label: 'Saved Posts', icon: 'bookmark', badge: null },
    ],
  },
  {
    section: 'Social',
    items: [
      { id: 'friends', label: 'Friends', icon: 'people', badge: null },
      { id: 'messages', label: 'Messages', icon: 'chat', badge: 5 },
      { id: 'notifications', label: 'Notifications', icon: 'notifications', badge: 12 },
    ],
  },
  {
    section: 'Community',
    items: [
      { id: 'discussions', label: 'Discussions', icon: 'forum', badge: null },
      { id: 'showcases', label: 'Showcases', icon: 'deployed_code', badge: null },
      { id: 'learning', label: 'Learning', icon: 'school', badge: null },
      { id: 'career', label: 'Career', icon: 'work', badge: null },
      { id: 'opensource', label: 'Open Source', icon: 'code', badge: null },
      { id: 'help', label: 'Help & Support', icon: 'help', badge: null },
    ],
  },
  {
    section: 'Competitive',
    items: [
      { id: 'battles', label: 'Battle Highlights', icon: 'swords', badge: null },
      { id: 'tournaments', label: 'Tournament News', icon: 'emoji_events', badge: null },
      { id: 'quests', label: 'Quest Achievements', icon: 'map', badge: null },
    ],
  },
  {
    section: 'Personal',
    items: [
      { id: 'myprofile', label: 'My Profile', icon: 'person', badge: null },
      { id: 'myposts', label: 'My Posts', icon: 'article', badge: null },
      { id: 'myachievements', label: 'My Achievements', icon: 'military_tech', badge: null },
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
