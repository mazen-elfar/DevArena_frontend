import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const TeamsPage = lazy(() => import('../pages/teams/TeamsPage'));
const TeamDashboardPage = lazy(() => import('../pages/teams/TeamDashboardPage'));

const teamRoutes = [
  {
    path: 'teams',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <TeamsPage />
      </AccessGuard>
    ),
  },
  {
    path: 'teams/:teamId',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <TeamDashboardPage />
      </AccessGuard>
    ),
    children: [
      {
        path: 'members',
        element: <div>Team Members</div>, // To be lazy loaded
      },
      {
        path: 'settings',
        element: <div>Team Settings</div>, // To be lazy loaded
      },
    ],
  },
];

export default teamRoutes;
