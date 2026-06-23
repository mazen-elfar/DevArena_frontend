import React, { lazy } from 'react';
import AccessGuard from '../components/auth/AccessGuard';

const OrganizationProfilePage = lazy(() => import('../pages/organizations/OrganizationProfilePage'));

const organizationRoutes = [
  {
    path: 'organizations/:orgId',
    element: (
      <AccessGuard requireAuth requireProfileCompletion>
        <OrganizationProfilePage />
      </AccessGuard>
    ),
    children: [
      {
        path: 'members',
        element: <div>Organization Members</div>,
      },
    ],
  },
];

export default organizationRoutes;
