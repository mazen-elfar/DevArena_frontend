import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import useBattleStore from '../../store/battle.store';

export default function MatchmakingPage() {
  const navigate = useNavigate();
  const { emit, on } = useSocket();
  const { isQueued, setQueued } = useBattleStore();
  const [waitTime, setWaitTime] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // Join matchmaking queue
    emit('matchmaking:join', {});
    setQueued(true);

    const timer = setInterval(() => setWaitTime(w => w + 1), 1000);

    // Listen for match found
    const unsubFound = on('matchmaking:found', ({ battleId }) => {
      setQueued(false);
      navigate(`/battles/${battleId}`);
    });

    const unsubQueued = on('matchmaking:queued', ({ position: pos, estimatedWait }) => {
      setPosition(pos);
    });

    return () => {
      clearInterval(timer);
      unsubFound?.();
      unsubQueued?.();
    };
  }, []);

  const handleCancel = () => {
    emit('matchmaking:leave', {});
    setQueued(false);
    navigate('/battles');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
      <div className="text-center">
        {/* Pulsing ring animation */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-[#00F0FF]/30 animate-ping" />
          <div className="absolute inset-4 rounded-full border-2 border-[#00F0FF]/50 animate-pulse" />
          <div className="absolute inset-8 rounded-full border-2 border-[#00F0FF]/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-[#00F0FF]">swords</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Searching for Opponent</h2>
        <p className="text-gray-400 mb-2">Finding a worthy challenger...</p>

        {position > 0 && (
          <p className="text-sm text-gray-500 mb-1">Position in queue: #{position}</p>
        )}

        <p className="text-sm text-[#00F0FF] font-mono mb-8">
          Wait time: {formatTime(waitTime)}
        </p>

        <button
          onClick={handleCancel}
          className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
        >
          Cancel Search
        </button>
      </div>
    </div>
  );
}
