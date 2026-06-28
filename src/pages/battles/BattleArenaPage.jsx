import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as battlesService from '../../services/battles.service';
import { useSocket } from '../../hooks/useSocket';
import useBattleStore from '../../store/battle.store';

const LANGUAGES = [
  { id: 'JAVASCRIPT', label: 'JavaScript', icon: 'JS' },
  { id: 'PYTHON', label: 'Python', icon: 'PY' },
  { id: 'JAVA', label: 'Java', icon: 'JV' },
  { id: 'CPP', label: 'C++', icon: 'C+' },
  { id: 'GO', label: 'Go', icon: 'GO' },
];

export default function BattleArenaPage() {
  const { battleId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { emit, on } = useSocket();
  const { timeRemaining, startTimer, stopTimer, addMessage, messages, mySubmissions, addSubmission } = useBattleStore();

  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState('JAVASCRIPT');
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // Fetch battle data
  const { data: battleData, isLoading } = useQuery({
    queryKey: ['battle', battleId],
    queryFn: () => battlesService.getBattle(battleId),
    refetchInterval: (data) => data?.data?.status === 'IN_PROGRESS' ? 5000 : false,
  });

  // Submit code mutation
  const submitMutation = useMutation({
    mutationFn: (data) => battlesService.submitCode(battleId, data),
    onSuccess: (response) => {
      addSubmission(response.data, true);
    },
  });

  // Complete battle mutation
  const completeMutation = useMutation({
    mutationFn: () => battlesService.completeBattle(battleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['battle', battleId]);
      navigate(`/battles/${battleId}/results`);
    },
  });

  const battle = battleData?.data;
  const quest = battle?.quest;
  const players = battle?.players || [];
  const isPlayer = players.some(p => p.userId === battle?.players?.[0]?.userId);
  const isCompleted = battle?.status === 'COMPLETED';

  // Socket events
  useEffect(() => {
    if (!battleId) return;

    const unsubs = [];

    unsubs.push(on('battle:start', ({ timeLimit }) => {
      startTimer(timeLimit || 300);
    }));

    unsubs.push(on('battle:progress', ({ userId, submissionCount, status }) => {
      // Handle opponent submission
    }));

    unsubs.push(on('battle:result', ({ battleId: id, winner, results }) => {
      if (id === battleId) {
        queryClient.invalidateQueries(['battle', battleId]);
        stopTimer();
      }
    }));

    unsubs.push(on('battle:chat', (msg) => {
      addMessage(msg);
    }));

    unsubs.push(on('battle:playerLeft', ({ userId }) => {
      // Handle opponent leaving
    }));

    return () => unsubs.forEach(u => u?.());
  }, [battleId]);

  // Start timer if battle is in progress
  useEffect(() => {
    if (battle?.status === 'IN_PROGRESS' && battle?.startedAt) {
      const elapsed = Math.floor((Date.now() - new Date(battle.startedAt).getTime()) / 1000);
      const remaining = Math.max(0, (battle.timeLimitSec || 300) - elapsed);
      startTimer(remaining);
    }
    return () => stopTimer();
  }, [battle?.status]);

  const handleSubmit = () => {
    if (!sourceCode.trim() || submitMutation.isPending) return;
    submitMutation.mutate({ sourceCode, language });
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    emit('battle:chat', { battleId, message: chatInput });
    setChatInput('');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!battle) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-white">
        <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
        <h2 className="text-xl font-bold mb-2">Battle Not Found</h2>
        <button onClick={() => navigate('/battles')} className="text-[#00F0FF] hover:underline">Back to Arena</button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
      {/* Battle Header */}
      <div className="h-14 bg-[#111317] border-b border-white/5 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/battles')} className="text-gray-400 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-sm font-bold text-white truncate max-w-[200px]">{quest?.title || 'Battle'}</h1>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
            battle.status === 'IN_PROGRESS' ? 'bg-green-500/10 text-green-400' :
            battle.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-400' :
            'bg-yellow-500/10 text-yellow-400'
          }`}>
            {battle.status}
          </span>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg ${
          timeRemaining < 60 ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-white'
        }`}>
          <span className="material-symbols-outlined text-lg">timer</span>
          <span className="font-mono font-bold text-lg">{formatTime(timeRemaining)}</span>
        </div>

        {/* Players */}
        <div className="flex items-center gap-3">
          {players.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold overflow-hidden">
                {p.user?.avatar ? (
                  <img src={p.user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  (p.user?.username || 'U')[0].toUpperCase()
                )}
              </div>
              <span className="text-xs font-medium text-gray-300">{p.user?.username}</span>
              {p.isWinner && <span className="text-yellow-400 text-xs">👑</span>}
            </div>
          ))}
        </div>

        {/* Complete Button (for demo) */}
        {isPlayer && battle.status === 'IN_PROGRESS' && (
          <button
            onClick={() => completeMutation.mutate()}
            disabled={completeMutation.isPending}
            className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-bold hover:bg-[#00F0FF]/20 disabled:opacity-50"
          >
            {completeMutation.isPending ? 'Judging...' : 'Complete Battle'}
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem */}
        <div className="w-[30%] border-r border-white/5 overflow-y-auto p-4">
          <h2 className="text-lg font-bold text-white mb-3">{quest?.title}</h2>
          <div className="text-sm text-gray-300 whitespace-pre-wrap mb-4">{quest?.description}</div>
          
          {quest?.examples && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Examples</h3>
              {(Array.isArray(quest.examples) ? quest.examples : []).map((ex, i) => (
                <div key={i} className="bg-black/30 rounded-lg p-3 mb-2 text-xs font-mono">
                  <div className="text-gray-500 mb-1">Input:</div>
                  <div className="text-[#00F0FF]">{ex.input}</div>
                  <div className="text-gray-500 mt-2 mb-1">Output:</div>
                  <div className="text-green-400">{ex.output}</div>
                </div>
              ))}
            </div>
          )}

          {quest?.constraints && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Constraints</h3>
              <p className="text-xs text-gray-400 whitespace-pre-wrap">{quest.constraints}</p>
            </div>
          )}
        </div>

        {/* Center: Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Language Selector */}
          <div className="h-10 bg-[#111317] border-b border-white/5 flex items-center px-3 gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                  language === lang.id
                    ? 'bg-[#00F0FF]/10 text-[#00F0FF]'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {lang.icon}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 relative">
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder="// Write your solution here..."
              className="w-full h-full bg-[#0d0f14] text-[#e2e2e8] font-mono text-sm p-4 resize-none outline-none"
              spellCheck={false}
            />
          </div>

          {/* Submit Bar */}
          <div className="h-12 bg-[#111317] border-t border-white/5 flex items-center justify-between px-4">
            <span className="text-xs text-gray-500">{sourceCode.length} characters</span>
            <button
              onClick={handleSubmit}
              disabled={!sourceCode.trim() || submitMutation.isPending || isCompleted}
              className="px-4 py-2 rounded-lg bg-[#00F0FF] text-black text-sm font-bold hover:bg-[#00F0FF]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitMutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-[280px] border-l border-white/5 flex flex-col">
          {/* Submissions */}
          <div className="p-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">My Submissions</h3>
            {mySubmissions.length === 0 ? (
              <p className="text-xs text-gray-600">No submissions yet</p>
            ) : (
              <div className="space-y-1">
                {mySubmissions.map((sub, i) => (
                  <div key={sub.id || i} className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${
                      sub.status === 'ACCEPTED' ? 'bg-green-400' :
                      sub.status === 'PENDING' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <span className="text-gray-300">#{i + 1}</span>
                    <span className="text-gray-500">{sub.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold text-gray-500 uppercase px-3 pt-3 pb-2">Battle Chat</h3>
            <div className="flex-1 overflow-y-auto px-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className="text-xs">
                  <span className="font-bold text-[#00F0FF]">{msg.username}: </span>
                  <span className="text-gray-300">{msg.message}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleChatSend} className="p-3 border-t border-white/5 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-white outline-none border border-white/10 focus:border-[#00F0FF]/30"
              />
              <button type="submit" className="text-[#00F0FF] hover:text-[#00F0FF]/80">
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
