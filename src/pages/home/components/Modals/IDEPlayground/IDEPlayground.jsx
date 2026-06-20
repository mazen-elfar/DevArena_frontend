import { Play, Send, RefreshCw, Code, Check } from "lucide-react";
import "./IDEPlayground.css";

/**
 * IDEPlayground Modal Content
 * @param {Object} props
 * @param {Object} props.node
 * @param {string} props.answer
 * @param {Function} props.setAnswer
 * @param {boolean} props.isCorrect
 * @param {Function} props.onSubmit
 */
export function IDEPlayground({ node, answer, setAnswer, isCorrect, onSubmit }) {
  if (!node) return null;

  return (
    <div className="flex flex-col h-full font-mono ide-playground">
      <div className="grid grid-cols-2 flex-1 border-b border-[#1e294b]/30 min-h-[400px]">
        <div className="p-6 bg-[#05070a] border-r border-[#1e294b]/20 text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Challenge</h3>
          </div>
          <h2 className="text-lg font-bold text-white mb-4">{node.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {node.challengeText}
          </p>
          <div className="bg-[#0f172a] rounded-xl p-4 border border-[#1e294b]/40 font-mono text-[13px] relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                <Code className="w-4 h-4 text-blue-400" />
             </div>
             <pre className="text-indigo-300">
               <code>{node.snippet}</code>
             </pre>
          </div>
        </div>

        <div className="p-6 bg-[#070a13] flex flex-col text-left">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Compiler Output</h3>
              </div>
              <span className="text-[10px] text-gray-500 font-bold">RUNTIME: NODE_V20_JS</span>
           </div>

           <div className="flex-1 space-y-4">
              <p className="text-sm text-white/80">Select the correct return value:</p>
              <div className="grid grid-cols-1 gap-2.5">
                {node.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(opt)}
                    id={`opt-${opt}`}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-300 group/opt ${
                      answer === opt 
                        ? "border-blue-500 bg-blue-500/10 text-blue-400" 
                        : "border-[#1e294b]/30 bg-[#0d1222] text-gray-400 hover:border-[#3b82f6]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {answer === opt && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />}
                    </div>
                  </button>
                ))}
              </div>
           </div>

           <div className={`mt-6 p-4 rounded-xl border transition-all duration-500 ${
             isCorrect === true ? "bg-emerald-500/10 border-emerald-500/30" : 
             isCorrect === false ? "bg-rose-500/10 border-rose-500/30" : 
             "bg-white/5 border-white/5"
           }`}>
              {isCorrect === true && (
                <div className="flex items-center gap-3 text-emerald-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-bold">SUCCESS! Execution verified successfully. +{node.xpValue} XP</span>
                </div>
              )}
              {isCorrect === false && (
                <div className="flex items-center gap-3 text-rose-400">
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-sm font-bold">ERROR: Return value mismatch. Try again.</span>
                </div>
              )}
              {isCorrect === null && (
                <div className="flex items-center gap-3 text-gray-500">
                  <Play className="w-5 h-5" />
                  <span className="text-sm font-bold">READY: Awaiting execution...</span>
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="p-6 bg-[#05070a] flex items-center justify-between font-sans">
        <div className="flex items-center gap-6">
           <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Difficulty</span>
              <span className="text-xs text-orange-500 font-bold uppercase">{node.type === "boss" ? "EXTREME" : "MEDIUM"}</span>
           </div>
           <div className="flex flex-col border-l border-[#1e294b]/40 pl-6">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Rewards</span>
              <span className="text-xs text-blue-400 font-bold font-mono">+{node.xpValue} XP</span>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setAnswer("")}
             className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
           >
             Reset
           </button>
           <button
             onClick={onSubmit}
             id="btn-run-compiler"
             disabled={!answer}
             className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
           >
             <Play className="w-4 h-4" /> Run Compiler
           </button>
        </div>
      </div>
    </div>
  );
}
