import React from 'react';
import { TrendingDiscussions } from './TrendingDiscussions';
import { TopDevelopers } from './TopDevelopers';
import { OnlineFriends } from './OnlineFriends';
import { SuggestedDevelopers } from './SuggestedDevelopers';
import { CommunityStats } from './CommunityStats';
import './RightPanel.css';

export function RightPanel() {
  return (
    <aside className="rp-container">
      <div className="rp-scrollable">
        <CommunityStats />
        <TrendingDiscussions />
        <TopDevelopers />
        <SuggestedDevelopers />
        <OnlineFriends />

        <footer className="rp-footer">
          <div className="rp-footer-links">
            <a href="#">About</a>
            <a href="#">Guidelines</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <p className="rp-copyright">© 2026 DevArena Ecosystem</p>
        </footer>
      </div>
    </aside>
  );
}
