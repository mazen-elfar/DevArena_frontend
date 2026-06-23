import React from 'react';
import { Outlet } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">SETTINGS</h1>
      <p className="text-silver-text">Configure your arena experience.</p>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
