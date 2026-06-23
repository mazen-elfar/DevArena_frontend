import React from 'react';
import { Outlet } from 'react-router-dom';
import useNavigationStore from '../../store/navigation.store';

const AdminLayout = () => {
  const { sidebarCollapsed } = useNavigationStore();

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-on-surface overflow-hidden">
      {/* Admin Sidebar */}
      <aside className={`bg-surface-container-high border-r border-red-500/10 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-6">
          {!sidebarCollapsed && <span className="text-xl font-bold text-red-500 uppercase tracking-widest">Admin Panel</span>}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/5 flex items-center px-8 bg-surface-container/50">
          <span className="text-silver-text font-medium">System Administration</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
