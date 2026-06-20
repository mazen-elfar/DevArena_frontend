import { useState } from "react";
import { Brain, Send, Flame, Sparkles } from "lucide-react";
import "./AICoreModal.css";

/**
 * AICoreModal Content
 * @param {Object} props
 * @param {Array} props.chatInsights
 * @param {Function} props.onSendMessage
 */
export function AICoreModal({ chatInsights, onSendMessage }) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-[500px] font-sans ai-core-modal">
      <div className="flex-1 p-6 overflow-y-auto space-y-6 chat-container">
        {chatInsights.map((chat) => (
          <div key={chat.id} className={`flex ${chat.type === "ai" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl relative ${
              chat.type === "ai" 
                ? "bg-[#0d1222] border border-[#1e294b]/40 text-blue-100" 
                : "bg-indigo-600/20 border border-indigo-500/30 text-indigo-100"
            } message-bubble`}>
              {chat.type === "ai" && (
                <div className="flex items-center gap-2 mb-2 text-indigo-400">
                  <Brain className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">DevBattle AI</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{chat.text}</p>
              <span className="text-[9px] text-gray-500 mt-2 block font-mono">
                {chat.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-[#05070a] border-t border-[#1e294b]/30">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI Core anything about your performance..."
            className="w-full bg-[#0d1222] border border-[#1e294b]/40 rounded-2xl py-3.5 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all chat-input"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50 send-button"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-4 mt-4 px-2">
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
              <Sparkles className="w-3 h-3 text-amber-500" />
              SMART SUGGESTIONS
           </div>
           <button onClick={() => setInputValue("Analyze my binary search efficiency")} className="suggestion-pill">Analyze my efficiency</button>
           <button onClick={() => setInputValue("Compare my rank with top-tier devs")} className="suggestion-pill">Compare rank</button>
        </div>
      </div>
    </div>
  );
}
