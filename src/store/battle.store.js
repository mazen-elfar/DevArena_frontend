import { create } from 'zustand';

const useBattleStore = create((set, get) => ({
  // Current battle state
  currentBattle: null,
  battleStatus: null, // WAITING, IN_PROGRESS, COMPLETED, CANCELLED

  // Players
  players: [],
  opponent: null,
  isSpectator: false,

  // Timer
  timeRemaining: 300,
  timerInterval: null,

  // Submissions
  mySubmissions: [],
  opponentSubmissions: [],
  submissionCount: 0,

  // Chat
  messages: [],

  // Matchmaking
  isQueued: false,
  queuePosition: 0,
  estimatedWait: 0,

  // Battle history
  battleHistory: [],
  historyPage: 1,
  hasMoreHistory: true,

  // Actions
  setCurrentBattle: (battle) => set({ currentBattle: battle, battleStatus: battle?.status }),
  setBattleStatus: (status) => set({ battleStatus: status }),
  setPlayers: (players) => set({ players }),
  setOpponent: (opponent) => set({ opponent }),
  setIsSpectator: (isSpectator) => set({ isSpectator }),

  startTimer: (seconds) => {
    const existing = get().timerInterval;
    if (existing) clearInterval(existing);

    set({ timeRemaining: seconds });
    const interval = setInterval(() => {
      const remaining = get().timeRemaining;
      if (remaining <= 0) {
        clearInterval(interval);
        set({ timerInterval: null });
        return;
      }
      set({ timeRemaining: remaining - 1 });
    }, 1000);
    set({ timerInterval: interval });
  },

  stopTimer: () => {
    const interval = get().timerInterval;
    if (interval) clearInterval(interval);
    set({ timerInterval: null });
  },

  addSubmission: (submission, isMe) => set((state) => ({
    mySubmissions: isMe ? [...state.mySubmissions, submission] : state.mySubmissions,
    opponentSubmissions: isMe ? state.opponentSubmissions : [...state.opponentSubmissions, submission],
    submissionCount: state.submissionCount + 1,
  })),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),

  setQueued: (isQueued, position = 0, wait = 0) => set({ isQueued: isQueued, queuePosition: position, estimatedWait: wait }),

  setBattleHistory: (history, page, hasMore) => set({ battleHistory: history, historyPage: page, hasMoreHistory: hasMore }),
  appendBattleHistory: (moreBattles, page, hasMore) => set((state) => ({
    battleHistory: [...state.battleHistory, ...moreBattles],
    historyPage: page,
    hasMoreHistory: hasMore,
  })),

  resetBattle: () => {
    const interval = get().timerInterval;
    if (interval) clearInterval(interval);
    set({
      currentBattle: null,
      battleStatus: null,
      players: [],
      opponent: null,
      isSpectator: false,
      timeRemaining: 300,
      timerInterval: null,
      mySubmissions: [],
      opponentSubmissions: [],
      submissionCount: 0,
      messages: [],
    });
  },
}));

export default useBattleStore;
