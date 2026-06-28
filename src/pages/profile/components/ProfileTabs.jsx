import React from 'react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'stats',    label: 'Stats',    icon: 'monitoring'     },
    { id: 'trophies', label: 'Trophies', icon: 'emoji_events'   },
    { id: 'activity', label: 'Activity', icon: 'timeline'       },
    { id: 'settings', label: 'Settings', icon: 'settings'       },
  ];

  return (
    <nav style={{
      display: 'flex', gap: '4px',
      padding: '4px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      width: 'fit-content',
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '9px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '13px', fontWeight: isActive ? '600' : '500',
              transition: 'all 0.2s',
              background: isActive ? '#1e293b' : 'transparent',
              color: isActive ? '#e2e8f0' : '#64748b',
              boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default ProfileTabs;
