import { useLocation, useNavigate } from "react-router-dom";
import { 
  Sparkles, Trophy, Flame, Swords, Home as HomeIcon, ClipboardList, 
  Crown, GitFork, Users2, Brain, Gem, Grid, Settings, Zap, LogOut 
} from "lucide-react";
import useAuthStore from "../../../../store/auth.store";


/**
 * Sidebar Component - CRITICAL: This is the main application sidebar.
 * DO NOT CHANGE its core structure or position as per user architectural requirements.
 * 
 * @param {Object} props
 * @param {Object} props.userStats 
 * @param {string} props.activeTab
 * @param {Function} props.setActiveTab
 * @param {Function} props.onUpgradeClick
 * @param {Function} props.onProfileClick
 */
export function Sidebar({ userStats, activeTab, setActiveTab, onUpgradeClick, onProfileClick }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const menuItems = [

    { id: "home", label: "Home", icon: HomeIcon, path: "/home" },
    { id: "tournaments", label: "Tournaments", icon: Trophy, path: "/tournaments" },
    { id: "battles", label: "Battles", icon: Swords, path: "/battles" },
    { id: "quests", label: "Quests", icon: ClipboardList, path: "/quests" },
    { id: "leaderboards", label: "Leaderboards", icon: Crown, path: "/leaderboards" },
    { id: "skills", label: "Skill Trees", icon: GitFork, path: "/skills" },
    { id: "community", label: "Community", icon: Users2, path: "/community" }
  ];

  const subItems = [
    { id: "ai-core", label: "AI Core", icon: Brain },
    { id: "grind", label: "Grind", icon: Zap },
    { id: "premium", label: "Premium", icon: Gem },
    { id: "apps", label: "Apps", icon: Grid },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };


  return (
    <aside className="w-64 bg-surface-dim border-r border-outline-variant flex flex-col justify-between h-screen fixed top-0 left-0 z-20 overflow-y-auto font-sans sidebar-container">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 logo-container">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold font-display tracking-tight text-white">DevBattle</h1>
        </div>
      </div>

      <div className="px-4 py-4 flex-1 space-y-6">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  id={`nav-${item.id}`}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 nav-button ${
                    isActive ? "active" : ""
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-outline-variant/30 my-4" />

        <ul className="space-y-1.5">
          {subItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-${item.id}`}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 nav-button ${
                    isActive ? "active" : ""
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 nav-button hover:bg-red-500/10 hover:text-red-400 group/logout"
            >
              <LogOut className="w-4 h-4 text-gray-400 group-hover/logout:text-red-400" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>


      <div className="p-4 space-y-4">
        <div 
          onClick={onProfileClick}
          className="p-4 bg-[#090d16] rounded-2xl border border-[#1e294b]/40 shadow-xl cursor-pointer hover:border-[#3b82f6]/40 transition-all duration-300 group profile-card"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-500/40 p-0.5 group-hover:border-indigo-400 transition-colors">
                <img src={userStats.avatar} alt={userStats.username} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full text-[10px] font-bold px-1">GM</div>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white truncate">{userStats.username}</p>
                <span className="text-[10px] text-indigo-400 font-mono font-bold">Lv.{userStats.level}</span>
              </div>
              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                {userStats.title}
              </p>
            </div>
          </div>

          <div className="mt-3.5 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>XP Progressive</span>
              <span>{userStats.xp.toLocaleString()} / {userStats.maxXp.toLocaleString()}</span>
            </div>
            <div className="xp-bar-container">
              <div
                className="xp-bar-fill"
                style={{ width: `${(userStats.xp / userStats.maxXp) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-4 pt-3.5 border-t border-[#1e294b]/20 text-center font-mono stats-grid">
            <div>
              <p className="label">Battles</p>
              <p className="value">{userStats.battlesWon}</p>
            </div>
            <div>
              <p className="label">Win Rate</p>
              <p className="value highlight">{userStats.winRate}%</p>
            </div>
            <div>
              <p className="label">Rank</p>
              <p className="value accent">#{userStats.globalRank}</p>
            </div>
          </div>
        </div>

        <div className="relative p-4 bg-gradient-to-b from-surface-elevated/40 to-surface-dim/40 border border-outline-variant/30 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between text-left pro-banner">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[11px] font-bold tracking-widest text-[#a5b4fc] uppercase flex items-center gap-1 text-indigo-400">
              DevBattle <span className="text-white font-black text-xs">PRO</span>
            </span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed mb-3.5">
            Unlock all features, live coding scrims, and dominate the arena.
          </p>
          <button
            onClick={onUpgradeClick}
            id="btn-upgrade-sidebar"
            className="w-full upgrade-button"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
