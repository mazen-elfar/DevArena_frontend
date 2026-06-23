import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const AuthPage = lazy(() => import('../pages/auth/AuthPage'));
const SocialCallback = lazy(() => import('../pages/auth/SocialCallback'));
const ProfileCompletionPage = lazy(() => import('../pages/onboarding/ProfileCompletionPage'));

const authRoutes = [
  {
    path: 'auth',
    element: <AuthPage />,
  },
  {
    path: 'auth/callback',
    element: <SocialCallback />,
  },
  {
    path: 'onboarding/profile',
    element: (
      <AccessGuard requireAuth>
        <ProfileCompletionPage />
      </AccessGuard>
    ),
  },
];

export default authRoutes;
