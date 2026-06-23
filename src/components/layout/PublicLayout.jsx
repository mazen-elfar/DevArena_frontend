import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="landing-page-container">
      {/* Navbar could go here if global across landing pages */}
      <main>
        <Outlet />
      </main>
      {/* Footer could go here */}
    </div>
  );
};

export default PublicLayout;
