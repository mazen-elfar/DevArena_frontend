import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));

const profileRoutes = [
  {
    path: 'profile',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <ProfilePage />
      </AccessGuard>
    ),
  },
  {
    path: 'profile/:username',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <ProfilePage />
      </AccessGuard>
    ),
  },
];

export default profileRoutes;
