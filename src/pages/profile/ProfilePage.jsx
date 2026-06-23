import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        {username ? `${username}'s Profile` : 'Your Profile'}
      </h1>
      <p className="text-silver-text">Experience, Reputation, and Stats.</p>
    </div>
  );
};

export default ProfilePage;
