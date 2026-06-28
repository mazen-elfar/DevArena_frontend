import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import useAuthStore from "../../store/auth.store";
import { HologramProjection } from "./components/Hologram/Hologram";

import { AICoreCard } from "./components/AICore/AICore";
import { GrindProgression } from "./components/Grind/Grind";
import { SkillTrees } from "./components/Skills/Skills";
import { DailyTournaments } from "./components/Tournaments/Tournaments";
import { QuestTracker } from "./components/Quests/Quests";
import { LeaderboardsCard } from "./components/Leaderboards/Leaderboards";
import { DeveloperFeed } from "./components/DevFeed/DevFeed";
import { BattleHistoryCard } from "./components/BattleHistory/BattleHistory";
import { Modal } from "./components/Shared/Modal";

// Interactive Modal Contents
import { IDEPlayground } from "./components/Modals/IDEPlayground/IDEPlayground";
import { AICoreModal } from "./components/Modals/AICoreModal/AICoreModal";
import { UpgradeModal } from "./components/Modals/UpgradeModal/UpgradeModal";
import { MatchSimulatorModal } from "./components/Modals/MatchSimulatorModal/MatchSimulatorModal";

// Data
import {
  initialUserStats,
  initialLeaderboard,
  initialQuests,
  initialCommunityFeed,
  initialSkillNodes,
  initialGrindNodes,
  initialBattleHistory,
  initialTournamentBracket
} from "./constants";

// Assets & Styles
import "./home.css";
import "./components/Sidebar/Sidebar.css";
import "./components/Header/Header.css";
import "./components/Hologram/Hologram.css";
import "./components/AICore/AICore.css";
import "./components/Grind/Grind.css";
import "./components/Skills/Skills.css";
import "./components/Tournaments/Tournaments.css";
import "./components/Quests/Quests.css";
import "./components/Leaderboards/Leaderboards.css";
import "./components/DevFeed/DevFeed.css";
import "./components/BattleHistory/BattleHistory.css";
import "./components/Shared/Modal.css";
import "./components/Modals/IDEPlayground/IDEPlayground.css";
import "./components/Modals/AICoreModal/AICoreModal.css";
import "./components/Modals/UpgradeModal/UpgradeModal.css";
import "./components/Modals/MatchSimulatorModal/MatchSimulatorModal.css";

export default function Home() {
  const { user } = useAuthStore();
  
  // --- UI States ---
  const [activeTab, setActiveTab] = useState("home");
  
  // Local user stats state derived from Auth Store
  const [userStats, setUserStats] = useState({
    ...initialUserStats,
    username: user?.username || initialUserStats.username,
    avatar: user?.avatarUrl || initialUserStats.avatar,
    level: user?.level || initialUserStats.level,
    xp: Number(user?.xp) || initialUserStats.xp,
    battlesWon: user?.profile?.battlesWon || initialUserStats.battlesWon,
    globalRank: user?.profile?.rank?.order || initialUserStats.globalRank,
    title: user?.profile?.rank?.name || initialUserStats.title,
  });

  useEffect(() => {
    if (user) {
      setUserStats(prev => ({
        ...prev,
        username: user.username,
        avatar: user.avatarUrl || prev.avatar,
        level: user.level,
        xp: Number(user.xp),
        battlesWon: user.profile?.battlesWon || prev.battlesWon,
        globalRank: user.profile?.rank?.order || prev.globalRank,
        title: user.profile?.rank?.name || prev.title,
      }));
    }
  }, [user]);

  // --- Data States ---

  const [leaderboard] = useState(initialLeaderboard);
  const [quests] = useState(initialQuests);
  const [feed] = useState(initialCommunityFeed);
  const [skillNodes] = useState(initialSkillNodes);
  const [grindNodes] = useState(initialGrindNodes);
  const [battleHistory] = useState(initialBattleHistory);
  const [bracket] = useState(initialTournamentBracket);

  // --- Modal States ---
  const [modalState, setModalState] = useState({
    profile: false,
    upgrade: false,
    ide: false,
    ai: false,
    simulator: false,
    selectedMatch: null,
    selectedNode: null
  });

  // --- Interactive Content States ---
  const [ideAnswer, setIdeAnswer] = useState("");
  const [ideSuccess, setIdeSuccess] = useState(null);
  const [chatInsights, setChatInsights] = useState([
    { id: 1, type: "ai", text: "Welcome back, Ninja. Your binary search efficiency in tournaments increased by 14% this week. Ready to optimize further?", timestamp: "Just now" }
  ]);

  // --- Handlers ---
  const toggleModal = (key, value, extra = {}) => {
    setModalState(prev => ({ ...prev, [key]: value, ...extra }));
    if (key === 'ide' && !value) {
      setIdeAnswer("");
      setIdeSuccess(null);
    }
  };

  const handleNodeClick = (node) => {
    if (node.active || node.completed) {
      toggleModal('ide', true, { selectedNode: node });
    }
  };

  const handleSimulateMatch = (matchId) => {
    const match = bracket.quarterFinals.concat(bracket.semiFinals).find(m => m.id === matchId);
    toggleModal('simulator', true, { selectedMatch: match });
  };

  const handleSendMessage = (text) => {
    const newUserMsg = { id: Date.now(), type: "user", text, timestamp: "Just now" };
    setChatInsights(prev => [...prev, newUserMsg]);
    
    // Simple AI Response Mock
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        type: "ai", 
        text: `Analysis complete: "${text}" indicates a focus on optimization. I recommend checking the "System Design" node in your Skill Tree.`, 
        timestamp: "Just now" 
      };
      setChatInsights(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSubmitIDE = () => {
    const node = modalState.selectedNode;
    if (ideAnswer === node.correctAnswer) {
      setIdeSuccess(true);
      setUserStats(prev => ({ ...prev, xp: prev.xp + node.xpValue }));
    } else {
      setIdeSuccess(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* 
        CRITICAL: Main Left Sidebar. 
        As per user requirements, this is the primary navigation hub and should never be changed or moved.
      */}
      <Sidebar 
        userStats={userStats} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onUpgradeClick={() => toggleModal('upgrade', true)}
        onProfileClick={() => navigate('/profile')}
      />

      <main className="flex-1 ml-64 overflow-y-auto main-wrapper scroll-smooth">
        <Header 
          energy={userStats.energy} 
          streak={userStats.streak}
          onCreateBattle={() => {}} 
          onJoinTournament={() => {}}
          onSearch={() => {}}
        />

        <div className="p-8 max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Main Grid Layout - 4 Column Logic */}
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Top Row: Hero, AI Core, Tournaments, Leaderboards */}
            <div className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-8">
              <div className="col-span-12 xl:col-span-5">
                <HologramProjection />
              </div>
              <div className="col-span-12 md:col-span-4 xl:col-span-2">
                <AICoreCard 
                  rating={2056} 
                  onOpenInsights={() => toggleModal('ai', true)} 
                />
              </div>
              <div className="col-span-12 md:col-span-4 xl:col-span-2.5">
                 <div className="flex flex-col gap-8">
                    <DailyTournaments 
                      bracket={bracket} 
                      onViewBracket={() => {}} 
                      onSimulateMatch={handleSimulateMatch}
                    />
                    <QuestTracker quests={quests} />
                 </div>
              </div>
              <div className="col-span-12 md:col-span-4 xl:col-span-2.5">
                 <div className="flex flex-col gap-8">
                    <LeaderboardsCard users={leaderboard} />
                    <DeveloperFeed feed={feed} />
                 </div>
              </div>
            </div>

            {/* Middle Row: Grind, Skill Trees, Social */}
            <div className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-8">
              <div className="col-span-12 xl:col-span-7">
                 <div className="flex flex-col gap-8">
                    <GrindProgression nodes={grindNodes} onNodeClick={handleNodeClick} />
                    <SkillTrees nodes={skillNodes} />
                 </div>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-5">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                      <BattleHistoryCard history={battleHistory} />
                    </div>
                    <div className="col-span-1">
                       <div className="h-full bg-[#090d16]/40 border border-[#1e294b]/20 rounded-3xl p-6 flex flex-col justify-center text-center items-center">
                          <p className="text-gray-500 font-mono text-[10px] uppercase font-bold mb-2">Extended Stats</p>
                          <div className="w-12 h-12 rounded-full border border-indigo-500/30 flex items-center justify-center animate-spin-slow">
                             <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                          </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals Container */}
      <Modal 
        isOpen={modalState.ide} 
        onClose={() => toggleModal('ide', false)} 
        title="Arena IDE Playground"
        maxWidth="max-w-5xl"
      >
        <IDEPlayground 
          node={modalState.selectedNode}
          answer={ideAnswer}
          setAnswer={setIdeAnswer}
          isCorrect={ideSuccess}
          onSubmit={handleSubmitIDE}
        />
      </Modal>

      <Modal 
        isOpen={modalState.ai} 
        onClose={() => toggleModal('ai', false)} 
        title="AI Insights Core"
        maxWidth="max-w-2xl"
      >
        <AICoreModal 
          chatInsights={chatInsights}
          onSendMessage={handleSendMessage}
        />
      </Modal>

      <Modal 
        isOpen={modalState.upgrade} 
        onClose={() => toggleModal('upgrade', false)} 
        title="Upgrade DevBattle Account"
        maxWidth="max-w-5xl"
      >
        <UpgradeModal />
      </Modal>

      <Modal 
        isOpen={modalState.simulator} 
        onClose={() => toggleModal('simulator', false)} 
        title="Match Simulation Terminal"
        maxWidth="max-w-2xl"
      >
        <MatchSimulatorModal match={modalState.selectedMatch} />
      </Modal>

      <Modal 
        isOpen={modalState.profile} 
        onClose={() => toggleModal('profile', false)} 
        title="Developer Profile"
      >
        <div className="p-8 text-center text-gray-500 font-mono text-sm">
          Profile management module loading... [GRID_V3_AUTH]
        </div>
      </Modal>
    </div>
  );
}
