import { Flame, ChevronRight, CheckCircle2, Zap } from "lucide-react";
import "./Grind.css";

/**
 * GrindProgression Component
 * @param {Object} props
 * @param {Array} props.nodes
 * @param {Function} props.onNodeClick
 */
export function GrindProgression({ nodes, onNodeClick }) {
  return (
    <div className="bg-[#090d16] border border-[#1e294b]/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans group grind-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 z-10 text-left">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">The Grind</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-orange-400/80 font-bold uppercase tracking-widest">WINSTREAK: 0</span>
          <div className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-500 flex items-center gap-1">
            2.5x XP
          </div>
        </div>
      </div>

      <div className="relative h-20 flex items-center justify-between px-10 mb-2 z-10 path-container">
        <div className="absolute left-12 right-12 h-[2px] bg-[#1e294b]/30 top-1/2 -translate-y-1/2 path-line" />
        <div 
          className="absolute left-12 h-[2px] bg-gradient-to-r from-orange-500 to-indigo-500 top-1/2 -translate-y-1/2 transition-all duration-1000 path-line-active" 
          style={{ width: "40%" }} 
        />

        {nodes.map((node, i) => (
          <div key={node.id} className="relative z-10">
            <button
              onClick={() => onNodeClick(node)}
              id={`grind-node-${node.id}`}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform group/node node-button ${
                node.completed ? "completed" : node.active ? "active" : "locked"
              }`}
            >
              {node.completed ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className={`text-sm font-black font-mono ${node.active ? "text-white" : "text-gray-600"}`}>
                  {node.label}
                </span>
              )}

              {node.active && (
                <div className="absolute -inset-1 rounded-2xl border-2 border-orange-500/50 animate-ping pointer-events-none" />
              )}
            </button>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap label-container">
               <p className={`text-[10px] font-bold uppercase tracking-tighter ${node.active ? "text-orange-500" : "text-gray-500"}`}>
                 {node.type}
               </p>
               <p className="text-[9px] font-mono text-gray-600 mt-0.5">{node.xpValue} XP</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between p-4 bg-[#0d1222] border border-[#1e294b]/30 rounded-2xl font-mono banner-compact">
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold">Current Target</p>
            <p className="text-xs text-white font-bold uppercase tracking-tight">Objective: Tier IV Debugging</p>
          </div>
        </div>
        <button 
          onClick={() => onNodeClick(nodes.find(n => n.active))}
          id="btn-resume-grind"
          className="resume-button"
        >
          <span>Resume Path</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
