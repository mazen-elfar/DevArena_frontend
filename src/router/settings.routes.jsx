import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));

const settingsRoutes = [
  {
    path: 'settings',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <SettingsPage />
      </AccessGuard>
    ),
    children: [
      { path: 'account', element: <div>Account Settings</div> },
      { path: 'profile', element: <div>Profile Settings</div> },
      { path: 'security', element: <div>Security Settings</div> },
      { path: 'notifications', element: <div>Notification Settings</div> },
    ],
  },
];

export default settingsRoutes;
