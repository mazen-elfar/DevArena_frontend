import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const QuestsPage = lazy(() => import('../pages/quests/QuestsPage'));
const QuestDetailsPage = lazy(() => import('../pages/quests/QuestDetailsPage'));

const questRoutes = [
  {
    path: 'quests',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <QuestsPage />
      </AccessGuard>
    ),
  },
  {
    path: 'quests/:questId',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <QuestDetailsPage />
      </AccessGuard>
    ),
  },
  {
    path: 'quests/category/:slug',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <QuestsPage />
      </AccessGuard>
    ),
  },
];

export default questRoutes;
