import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const Home = lazy(() => import('../pages/home/Home'));
const LandingPage = lazy(() => import('../pages/landing/LandingPage'));

const coreRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: 'home',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <Home />
      </AccessGuard>
    ),
  },
];

export default coreRoutes;
