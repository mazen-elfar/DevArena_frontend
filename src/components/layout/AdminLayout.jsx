import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';

const NAV_ITEMS = [
  { section: 'Overview', items: [
    { path: '/admin', label: 'Dashboard', icon: 'space_dashboard', end: true },
  ]},
  { section: 'Management', items: [
    { path: '/admin/users', label: 'Users', icon: 'group' },
    { path: '/admin/reports', label: 'Reports', icon: 'flag' },
    { path: '/admin/moderation', label: 'Moderation', icon: 'shield' },
  ]},
  { section: 'Insights', items: [
    { path: '/admin/analytics', label: 'Analytics', icon: 'monitoring' },
  ]},
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex h-screen bg-[#f8f9fc] text-[#1e293b] overflow-hidden font-[Inter,sans-serif]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-[72px]'} flex flex-col bg-white border-r border-[#e2e8f0] transition-all duration-300 ease-in-out`}>
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-[#e2e8f0]">
          <div className="w-8 h-8 rounded-lg bg-[#3b82f6] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-lg">admin_panel_settings</span>
          </div>
          {sidebarOpen && (
            <span className="text-sm font-semibold text-[#0f172a] tracking-tight whitespace-nowrap">Admin Panel</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {NAV_ITEMS.map(({ section, items }) => (
            <div key={section} className="mb-5">
              {sidebarOpen && (
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                  {section}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map(({ path, label, icon, end }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-[#eff6ff] text-[#3b82f6]'
                          : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#334155]'
                      }`
                    }
                  >
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    {sidebarOpen && <span>{label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#e2e8f0]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {sidebarOpen ? 'chevron_left' : 'chevron_right'}
            </span>
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#e2e8f0] flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-semibold text-[#0f172a]">
              {NAV_ITEMS.flatMap(s => s.items).find(i => location.pathname === i.path || (i.path !== '/admin' && location.pathname.startsWith(i.path)))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] w-64">
              <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">search</span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-[#334155] placeholder-[#94a3b8] outline-none w-full"
              />
              <kbd className="text-[10px] font-mono text-[#94a3b8] bg-white px-1.5 py-0.5 rounded border border-[#e2e8f0]">⌘K</kbd>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#64748b]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full" />
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-[#e2e8f0]" />

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-sm font-semibold">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-[#0f172a] leading-tight">{user?.profile?.displayName || 'Admin'}</p>
                <p className="text-[11px] text-[#94a3b8]">{user?.email || 'admin@devarena.io'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fc]">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
