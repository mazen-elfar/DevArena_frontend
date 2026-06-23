import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

// Domain Routes
import authRoutes from './auth.routes';
import coreRoutes from './core.routes';
import communityRoutes from './community.routes';
import profileRoutes from './profile.routes';
import questRoutes from './quest.routes';
import battleRoutes from './battle.routes';
import teamRoutes from './team.routes';
import organizationRoutes from './organization.routes';
import settingsRoutes from './settings.routes';
import adminRoutes from './admin.routes';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AuthLayout from '../components/layout/AuthLayout';
import AppLayout from '../components/layout/AppLayout';
import AdminLayout from '../components/layout/AdminLayout';

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-charcoal-bg">
    <div className="w-8 h-8 border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
  </div>
);

const router = createBrowserRouter([
  // 1. Public Layout Wrapper (Landing, Features, Pricing etc)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <PublicLayout />
      </Suspense>
    ),
    children: coreRoutes.filter(r => ['/', '/features', '/pricing', '/about', '/contact'].includes(r.path)),
  },
  
  // 2. Auth Layout Wrapper (Login, Register, Callback)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout />
      </Suspense>
    ),
    children: authRoutes.filter(r => r.path !== 'onboarding/profile'),
  },

  // 3. App Layout Wrapper (Protected Core platform)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      ...coreRoutes.filter(r => r.path === 'home'),
      ...authRoutes.filter(r => r.path === 'onboarding/profile'),
      ...communityRoutes,
      ...profileRoutes,
      ...questRoutes,
      ...battleRoutes,
      ...teamRoutes,
      ...organizationRoutes,
      ...settingsRoutes,
      // Notifications/Messaging stubs can be added here
      { path: 'notifications', element: <div>Notifications Center</div> },
      { path: 'messages', element: <div>Messaging Hub</div> },
      { path: 'messages/:id', element: <div>Direct Message</div> },
      { path: 'leaderboard', element: <div>Global Leaderboard</div> },
    ],
  },

  // 4. Admin Layout Wrapper (Admin Restricted)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLayout />
      </Suspense>
    ),
    children: adminRoutes,
  },

  // 5. Global Fallback
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export default router;
