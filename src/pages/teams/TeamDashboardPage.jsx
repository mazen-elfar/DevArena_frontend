import React from 'react';
import { useParams, Outlet } from 'react-router-dom';

const TeamDashboardPage = () => {
  const { teamId } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Team Dashboard: {teamId}</h1>
      <p className="text-silver-text">Manage your squad and upcoming matches.</p>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default TeamDashboardPage;
