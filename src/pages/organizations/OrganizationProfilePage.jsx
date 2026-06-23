import React from 'react';
import { useParams, Outlet } from 'react-router-dom';

const OrganizationProfilePage = () => {
  const { orgId } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Organization: {orgId}</h1>
      <p className="text-silver-text">Institutional profile and member management.</p>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizationProfilePage;
