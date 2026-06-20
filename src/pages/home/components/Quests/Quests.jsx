import { ClipboardList, ChevronRight, CheckCircle2 } from "lucide-react";
import "./Quests.css";

/**
 * QuestTracker Component 
 * @param {Object} props
 * @param {Array} props.quests
 */
export function QuestTracker({ quests }) {
  return (
    <div className="bg-[#090d16] border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans group quest-card">
      <div className="flex items-center justify-between mb-5 z-10 text-left">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Quests</h2>
        </div>
        <button id="btn-view-all-quests" className="view-all-link">View All</button>
      </div>

      <div className="space-y-3 z-10 quest-list">
        {quests.map((quest) => (
          <div key={quest.id} className={`quest-item ${quest.completed ? "completed" : "active"}`}>
            <div className="flex items-start justify-between gap-3 text-left">
              <div className="flex-1 min-w-0">
                <p className="title truncate">{quest.title}</p>
                <p className="desc truncate">{quest.description}</p>
              </div>
              {quest.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
              ) : (
                <span className="reward">{quest.rewardXp} XP</span>
              )}
            </div>

            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono prog-label">
                <span>PROGRESS</span>
                <span>{quest.progress}/{quest.target}</span>
              </div>
              <div className="prog-bar-bg">
                <div
                  className="prog-bar-fill"
                  style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button id="btn-claim-rewards" className="claim-button">
        <span>Claim Daily Rewards</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
