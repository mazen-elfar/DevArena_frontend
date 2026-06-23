import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const BattlesPage = lazy(() => import('../pages/battles/BattlesPage'));
const MatchmakingPage = lazy(() => import('../pages/battles/MatchmakingPage'));
const BattleArenaPage = lazy(() => import('../pages/battles/BattleArenaPage'));

const battleRoutes = [
  {
    path: 'battles',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <BattlesPage />
      </AccessGuard>
    ),
  },
  {
    path: 'battles/matchmaking',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <MatchmakingPage />
      </AccessGuard>
    ),
  },
  {
    path: 'battles/:battleId',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <BattleArenaPage />
      </AccessGuard>
    ),
  },
];

export default battleRoutes;
