import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const Community = lazy(() => import('../pages/community/Community'));

const communityRoutes = [
  {
    path: 'community',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <Community />
      </AccessGuard>
    ),
  },
];

export default communityRoutes;
