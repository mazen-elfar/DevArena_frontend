import { GitFork, Code, Cpu, Globe, Database, TrendingUp, Layers } from "lucide-react";
import "./Skills.css";

/**
 * SkillTrees Component
 * @param {Object} props
 * @param {Array} props.nodes
 */
export function SkillTrees({ nodes }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Code": return Code;
      case "Cpu": return Cpu;
      case "Globe": return Globe;
      case "Database": return Database;
      case "TrendingUp": return TrendingUp;
      case "Layers": return Layers;
      default: return Code;
    }
  };

  return (
    <div className="bg-[#090d16] border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans group skills-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 z-10 text-left">
        <div className="flex items-center gap-2">
          <GitFork className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Skill Architect</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">Mastery: 72%</span>
          <div className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
            Node Tier: V
          </div>
        </div>
      </div>

      <div className="relative h-64 w-full bg-[#05070e]/50 rounded-2xl border border-[#1e294b]/20 overflow-hidden canvas-area">
        <div className="absolute inset-0 grid-dots pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {nodes.map((node) => 
            node.connections.map((targetId) => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(99, 102, 241, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })
          )}
        </svg>

        {nodes.map((node) => {
          const Icon = getIcon(node.icon);
          const isMaster = node.id === "master";
          return (
            <div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group/skill skill-node ${isMaster ? "master" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="relative cursor-pointer node-container">
                <div 
                  className="w-10 h-10 rounded-xl bg-[#0d1222] border border-[#1e294b]/60 flex items-center justify-center transition-all duration-300 group-hover/skill:border-indigo-400/50 shadow-lg shadow-black/40 node-icon"
                  style={{ borderColor: isMaster ? `${node.color}50` : undefined }}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover/skill:scale-110" style={{ color: node.color }} />
                </div>
                
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none z-20 node-tooltip">
                   <div className="bg-[#0f172a] border border-white/10 rounded-lg p-2 shadow-2xl min-w-[120px] text-left">
                      <p className="text-[10px] font-bold text-white uppercase">{node.name}</p>
                      <p className="text-[9px] text-gray-400 font-mono mt-1">{node.level} • {node.progress}%</p>
                      <div className="w-full h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${node.progress}%` }} />
                      </div>
                   </div>
                </div>

                {isMaster && (
                   <div className="absolute -inset-2 rounded-xl border border-indigo-500/20 animate-pulse pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] font-mono p-1 footer-labels">
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-indigo-500" />
             <span className="text-gray-500">Unlocked</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-gray-700" />
             <span className="text-gray-500">Locked</span>
           </div>
        </div>
        <button id="btn-deep-dive-skills" className="footer-link">Deep Dive Analysis</button>
      </div>
    </div>
  );
}
