import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));

const adminRoutes = [
  {
    path: 'admin',
    element: (
      <AccessGuard requireAuth requiredRoles={['ADMIN']}>
        <AdminDashboard />
      </AccessGuard>
    ),
    children: [
      { path: 'users', element: <div>User Management</div> },
      { path: 'reports', element: <div>Content Reports</div> },
      { path: 'moderation', element: <div>Moderation Tools</div> },
      { path: 'analytics', element: <div>System Analytics</div> },
    ],
  },
];

export default adminRoutes;
