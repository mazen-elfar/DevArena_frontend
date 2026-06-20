import React, { useState } from 'react';
import { Sidebar } from '../home/components/Sidebar/Sidebar';
import { Header } from '../home/components/Header/Header';
import { Post } from './components/Post';
import { FeedComposer } from './components/FeedComposer';
import { RightPanel } from './components/RightPanel';
import { initialUserStats } from '../home/constants';
import { communityData } from './constants';
import './Community.css';
import '../home/components/Sidebar/Sidebar.css';
import '../home/components/Header/Header.css';

export default function Community() {
  const [activeTab, setActiveTab] = useState('community');
  const [userStats] = useState(initialUserStats);
  const [posts] = useState(communityData.posts);

  return (
    <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-sans community-page">
      {/* Reusing App's Sidebar */}
      <Sidebar 
        userStats={userStats} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onUpgradeClick={() => {}}
        onProfileClick={() => {}}
      />

      <main className="flex-1 ml-64 overflow-y-auto custom-scrollbar scroll-smooth">
        {/* Reusing App's Header */}
        <Header 
          energy={userStats.energy} 
          streak={userStats.streak}
          onCreateBattle={() => {}} 
          onJoinTournament={() => {}}
          onSearch={() => {}}
        />

        <div className="p-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-8 relative items-start">
            {/* Feed Section */}
            <div className="col-span-12 lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <FeedComposer userAvatar={userStats.avatar} />
              
              <div className="flex flex-col gap-8 pb-20">
                {posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Right Side Panel */}
            <div className="col-span-4 hidden lg:block animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              <RightPanel 
                trending={communityData.trending} 
                topDevelopers={communityData.topDevelopers} 
                onlineFriends={communityData.onlineFriends} 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Action Button - Premium FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 hover:shadow-indigo-500/20">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}
