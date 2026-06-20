export const initialUserStats = {
  username: "CodeNinja",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  title: "Grandmaster",
  level: 42,
  xp: 24560,
  maxXp: 36000,
  battlesWon: 1248,
  winRate: 72.4,
  globalRank: 98,
  energy: 12,
  streak: 7
};

export const initialLeaderboard = [
  { rank: 1, username: "CodeNinja", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150", title: "Grandmaster", score: 2456, isSelf: true },
  { rank: 2, username: "ByteMaster", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150", title: "Grandmaster", score: 2312 },
  { rank: 3, username: "AlgoVirtuoso", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", title: "Master", score: 2101 },
  { rank: 4, username: "SyntaxSamurai", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", title: "Master", score: 1987 },
  { rank: 5, username: "CodePhoenix", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", title: "Diamond", score: 1892 }
];

export const initialQuests = [
  { id: "q1", title: "Daily Challenge", description: "Solve 3 Medium problems", progress: 2, target: 3, rewardXp: 250, completed: false, category: "daily" },
  { id: "q2", title: "Winning Streak", description: "Win 5 battles in a row", progress: 3, target: 5, rewardXp: 500, completed: false, category: "daily" },
  { id: "q3", title: "Code Contributor", description: "Open 2 PRs in any repo", progress: 1, target: 2, rewardXp: 300, completed: false, category: "daily" }
];

export const initialCommunityFeed = [
  { id: "cf1", author: "DevMaster", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=120", time: "2h ago", content: "Just solved a Hard problem in 12:34! 🔥 Graph algorithms and memoization came in clutch.", tags: ["CP", "Graphs"], likes: 124, comments: 23 },
  { id: "cf2", author: "CodeQueen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120", time: "5h ago", content: "New to DevBattle! Excited to compete 🚀 Are there any team scrimmages happening tonight?", tags: ["Newbie", "Welcome"], likes: 89, comments: 18 },
  { id: "cf3", author: "AlgoVirtuoso", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", time: "6h ago", content: "Finally reached Grandmaster! Thanks to everyone for the helpful practice battles.", tags: ["Grandmaster", "RankUp"], likes: 153, comments: 32 }
];

export const initialDevFeed = [
  { id: "df1", author: "TechTactician", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120", time: "1h ago", content: "Sharing today's tournament solution. Binary search tree traversal reduces complexity to O(log N).", tags: ["JavaScript", "Algorithms", "BinarySearchTree"], likes: 42, comments: 12 },
  { id: "df2", author: "CodeArchitect", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120", time: "3h ago", content: "Optimized my DP solution by 40%! Turns out modular bitmasks are significantly faster than native Objects.", tags: ["DynamicProgramming", "Optimization"], likes: 38, comments: 7 },
  { id: "df3", author: "DevWarrior", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120", time: "5h ago", content: "System design discussion: How would you design a real-time multiplayer coding platform?", tags: ["SystemDesign", "WebSockets"], likes: 26, comments: 18 }
];

export const initialSkillNodes = [
  { id: "master", name: "Master", level: "Master", progress: 95, color: "#8b5cf6", icon: "Code", connections: ["system_design", "web_dev", "database", "algorithms", "data_structures"], x: 50, y: 55 },
  { id: "system_design", name: "System Design", level: "Advanced", progress: 60, color: "#06b6d4", icon: "Cpu", connections: [], x: 50, y: 15 },
  { id: "web_dev", name: "Web Development", level: "Advanced", progress: 70, color: "#ec4899", icon: "Globe", connections: [], x: 80, y: 40 },
  { id: "database", name: "Database", level: "Advanced", progress: 65, color: "#3b82f6", icon: "Database", connections: [], x: 70, y: 80 },
  { id: "algorithms", name: "Algorithms", level: "Expert", progress: 75, color: "#0ea5e9", icon: "TrendingUp", connections: [], x: 30, y: 80 },
  { id: "data_structures", name: "Data Structures", level: "Expert", progress: 80, color: "#2563eb", icon: "Layers", connections: [], x: 20, y: 40 }
];

export const initialGrindNodes = [
  { id: "g1", label: "1", completed: true, active: false, xpValue: 120, type: "debugging", title: "Closure Traps", challengeText: "Fix the closures. What will the function output when calling printer[2]()?", snippet: "function createPrinters() {\n  var printers = [];\n  for (var i = 0; i < 5; i++) {\n    printers.push(function() { return i; });\n  }\n  return printers;\n}\nconst printers = createPrinters();", correctAnswer: "5", options: ["2", "5", "undefined", "0"] },
  { id: "g2", label: "2", completed: true, active: false, xpValue: 180, type: "quiz", title: "Big O Complexity", challengeText: "What is the worst-case space complexity of Quicksort?", snippet: "// Quicksort recursion tree stack space\nfunction quicksort(arr) { ... }", correctAnswer: "O(log N)", options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"] },
  { id: "g3", label: "3", completed: false, active: true, xpValue: 240, type: "speed-run", title: "Reduce Operation", challengeText: "What will this JS reducer return?", snippet: "[1, 2, 3].reduce((acc, curr) => acc + curr, \"\")", correctAnswer: "123", options: ["6", "'123'", "123", "NaN"] },
  { id: "g4", label: "4", completed: false, active: false, xpValue: 300, type: "debugging", title: "Reference Errors", challengeText: "What value does this assignment produce?", snippet: "const obj = { x: 10 };\nconst shadow = obj;\nshadow.x = 20;\nconsole.log(obj.x);", correctAnswer: "20", options: ["10", "20", "ReferenceError", "undefined"] },
  { id: "g5", label: "5", completed: false, active: false, xpValue: 500, type: "boss", title: "Boss Challenge", challengeText: "How do you achieve shallow copying for a multidimensional object safely?", snippet: "const grid = [[1], [2]];\nconst copy = { ...grid };", correctAnswer: "Structured Clone or JSON parse/stringify", options: ["Direct Spread Operator", "Object.assign()", "Structured Clone or JSON parse/stringify", "Slice"] }
];

export const initialBattleHistory = [
  { id: "b1", type: "Victory", subType: "Ranked", opponent: "ByteMaster", opponentAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150", time: "2h ago", ratingChange: 25, score: 2056 },
  { id: "b2", type: "Victory", subType: "Ranked", opponent: "AlgoVirtuoso", opponentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", time: "4h ago", ratingChange: 18, score: 2031 },
  { id: "b3", type: "Defeat", subType: "Ranked", opponent: "CodePhoenix", opponentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", time: "Yesterday", ratingChange: -12, score: 2013 },
  { id: "b4", type: "Victory", subType: "Ranked", opponent: "SyntaxSamurai", opponentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", time: "2d ago", ratingChange: 22, score: 2025 },
  { id: "b5", type: "Victory", subType: "Ranked", opponent: "DevKing", opponentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150", time: "3d ago", ratingChange: 15, score: 2003 }
];

export const initialTournamentBracket = {
  quarterFinals: [
    { id: "tq1", player1: "CodeNinja", avatar1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150", rating1: 2056, player2: "ByteMaster", avatar2: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150", rating2: 1987, score1: 3, score2: 1, status: "completed", winner: "CodeNinja" },
    { id: "tq2", player1: "AlgoVirtuoso", avatar1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", rating1: 1932, player2: "SyntaxSamurai", avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating2: 1891, score1: 2, score2: 3, status: "completed", winner: "SyntaxSamurai" }
  ],
  semiFinals: [
    { id: "ts1", player1: "CodeNinja", avatar1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150", rating1: 2056, player2: "SyntaxSamurai", avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating2: 1891, status: "live" }
  ],
  finals: { id: "tf1", player1: "TBD", avatar1: "", rating1: 0, player2: "TBD", avatar2: "", rating2: 0, status: "pending" }
};
