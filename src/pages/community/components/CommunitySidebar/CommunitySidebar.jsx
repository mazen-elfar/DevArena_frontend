import React from 'react';
import { COMMUNITY_NAV, RANK_CONFIG } from '../../constants';
import './CommunitySidebar.css';

function NavItem({ item, isActive, onClick }) {
  return (
    <button
      className={`cs-nav-item ${isActive ? 'active' : ''}`}
      onClick={() => onClick(item.id)}
      title={item.label}
    >
      <span className="material-symbols-outlined cs-nav-icon">{item.icon}</span>
      <span className="cs-nav-label">{item.label}</span>
      {item.badge && (
        <span className="cs-nav-badge">{item.badge > 99 ? '99+' : item.badge}</span>
      )}
    </button>
  );
}

export function CommunitySidebar({ activeSection, onSectionChange, currentUser }) {
  const rankCfg = currentUser ? (RANK_CONFIG[currentUser.rank] || RANK_CONFIG.Bronze) : null;

  return (
    <aside className="cs-sidebar">
      {/* Logo / Brand */}
      <div className="cs-brand">
        <span className="cs-brand-icon">⚡</span>
        <span className="cs-brand-name">Community</span>
      </div>

      {/* Navigation Sections */}
      <nav className="cs-nav">
        {COMMUNITY_NAV.map(({ section, items }) => (
          <div key={section} className="cs-section">
            <p className="cs-section-label">{section}</p>
            {items.map(item => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={onSectionChange}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Developer Identity Card */}
      {currentUser && (
        <div className="cs-identity-card" style={{ '--rank-color': rankCfg.color, '--rank-bg': rankCfg.bg }}>
          <div className="cs-identity-avatar-wrap">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="cs-identity-avatar"
            />
            <span className="cs-identity-rank-dot" style={{ background: rankCfg.color }} />
          </div>
          <div className="cs-identity-info">
            <p className="cs-identity-name">{currentUser.displayName || currentUser.username}</p>
            <p className="cs-identity-meta">
              <span style={{ color: rankCfg.color }}>{currentUser.rank}</span>
              {' · '}Lv.{currentUser.level}
            </p>
            {/* XP Mini Bar */}
            <div className="cs-xp-bar-track">
              <div
                className="cs-xp-bar-fill"
                style={{
                  width: `${Math.min(100, ((currentUser.xp % 10000) / 10000) * 100)}%`,
                  background: rankCfg.color,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
