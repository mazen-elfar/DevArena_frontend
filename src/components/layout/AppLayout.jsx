import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useNavigationStore from '../../store/navigation.store';

const AppLayout = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, generateBreadcrumbs, breadcrumbs } = useNavigationStore();

  useEffect(() => {
    generateBreadcrumbs(location.pathname);
  }, [location.pathname, generateBreadcrumbs]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#02040a]">
      <Outlet />
    </div>
  );
};

export default AppLayout;
