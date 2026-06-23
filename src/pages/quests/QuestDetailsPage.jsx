import React from 'react';
import { useParams } from 'react-router-dom';

const QuestDetailsPage = () => {
  const { questId } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neon-cyan mb-6">Quest: {questId}</h1>
      <p className="text-silver-text">Objectives, Requirements, and Rewards.</p>
    </div>
  );
};

export default QuestDetailsPage;
