import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const STATS = [
  { label: 'Total Users', value: '12,847', change: '+12.5%', trend: 'up', icon: 'group', color: '#3b82f6' },
  { label: 'Active Today', value: '3,241', change: '+8.2%', trend: 'up', icon: 'person', color: '#10b981' },
  { label: 'Reports Pending', value: '47', change: '-23.1%', trend: 'down', icon: 'flag', color: '#f59e0b' },
  { label: 'Battles Today', value: '1,892', change: '+15.3%', trend: 'up', icon: 'swords', color: '#8b5cf6' },
];

const RECENT_ACTIVITY = [
  { id: 1, user: 'alex_chen', action: 'Registered', time: '2 min ago', avatar: 'A' },
  { id: 2, user: 'maya_dev', action: 'Reported post #4821', time: '5 min ago', avatar: 'M' },
  { id: 3, user: 'system', action: 'Auto-banned spammer', time: '8 min ago', avatar: 'S' },
  { id: 4, user: 'jordan_k', action: 'Completed quest', time: '12 min ago', avatar: 'J' },
  { id: 5, user: 'sam_riley', action: 'Won tournament', time: '15 min ago', avatar: 'S' },
  { id: 6, user: 'admin', action: 'Resolved report #3291', time: '18 min ago', avatar: 'A' },
];

const QUICK_LINKS = [
  { label: 'Manage Users', path: '/admin/users', icon: 'group', desc: 'View, edit, ban users' },
  { label: 'Review Reports', path: '/admin/reports', icon: 'flag', desc: '47 pending reports' },
  { label: 'Moderation', path: '/admin/moderation', icon: 'shield', desc: 'Content moderation queue' },
  { label: 'Analytics', path: '/admin/analytics', icon: 'monitoring', desc: 'Platform metrics & trends' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-sm text-[#64748b] mt-1">Platform overview and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#e2e8f0] p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                <span className="material-symbols-outlined text-[20px]" style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                stat.trend === 'up' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fef2f2] text-[#dc2626]'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0f172a]">{stat.value}</p>
            <p className="text-xs text-[#94a3b8] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0f172a] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="flex items-center gap-3 p-4 rounded-lg border border-[#e2e8f0] hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all text-left group"
            >
              <span className="material-symbols-outlined text-[22px] text-[#64748b] group-hover:text-[#3b82f6] transition-colors">
                {link.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-[#0f172a]">{link.label}</p>
                <p className="text-[11px] text-[#94a3b8]">{link.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-sm font-semibold text-[#0f172a]">Recent Activity</h2>
            <button className="text-xs text-[#3b82f6] font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#f8fafc] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center text-xs font-semibold text-[#475569] flex-shrink-0">
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0f172a]">
                    <span className="font-medium">{item.user}</span>
                    <span className="text-[#64748b]"> — {item.action}</span>
                  </p>
                </div>
                <span className="text-[11px] text-[#94a3b8] whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white rounded-xl border border-[#e2e8f0]">
          <div className="px-5 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-sm font-semibold text-[#0f172a]">Platform Health</h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'API Response Time', value: '42ms', status: 'good' },
              { label: 'Error Rate (24h)', value: '0.12%', status: 'good' },
              { label: 'Queue Depth', value: '23', status: 'warn' },
              { label: 'DB Connections', value: '18/50', status: 'good' },
              { label: 'Memory Usage', value: '67%', status: 'warn' },
              { label: 'Uptime', value: '99.97%', status: 'good' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0f172a]">{item.value}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    item.status === 'good' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e8f0]">
          <h2 className="text-sm font-semibold text-[#0f172a]">Recent Registrations</h2>
          <button
            onClick={() => navigate('/admin/users')}
            className="text-xs text-[#3b82f6] font-medium hover:underline"
          >
            View all users
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc]">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { name: 'alex_chen', email: 'alex@dev.io', joined: '2 min ago', status: 'active' },
                { name: 'maya_dev', email: 'maya@code.io', joined: '5 min ago', status: 'active' },
                { name: 'jordan_k', email: 'jordan@web.io', joined: '12 min ago', status: 'active' },
                { name: 'sam_riley', email: 'sam@ai.io', joined: '15 min ago', status: 'pending' },
              ].map((user) => (
                <tr key={user.name} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center text-xs font-semibold text-[#475569]">
                        {user.name[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-[#0f172a]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#64748b]">{user.email}</td>
                  <td className="px-5 py-3 text-sm text-[#94a3b8]">{user.joined}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      user.status === 'active'
                        ? 'bg-[#dcfce7] text-[#16a34a]'
                        : 'bg-[#fef3c7] text-[#d97706]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-[#16a34a]' : 'bg-[#d97706]'
                      }`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-[#64748b] hover:text-[#334155] transition-colors">
                      <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Child Routes (e.g. /admin/users) */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
