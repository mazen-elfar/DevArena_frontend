import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const BattlesPage = lazy(() => import('../pages/battles/BattlesPage'));
const MatchmakingPage = lazy(() => import('../pages/battles/MatchmakingPage'));
const BattleArenaPage = lazy(() => import('../pages/battles/BattleArenaPage'));
const BattleResultPage = lazy(() => import('../pages/battles/BattleResultPage'));

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
    path: 'battles/create',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <BattlesPage />
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
  {
    path: 'battles/:battleId/results',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <BattleResultPage />
      </AccessGuard>
    ),
  },
];

export default battleRoutes;
