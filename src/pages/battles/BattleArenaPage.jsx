import React from 'react';
import { useParams } from 'react-router-dom';

const BattleArenaPage = () => {
  const { battleId } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neon-purple mb-6">ARENA: {battleId}</h1>
      <p className="text-silver-text">Code, Solve, and Conquer.</p>
    </div>
  );
};

export default BattleArenaPage;
