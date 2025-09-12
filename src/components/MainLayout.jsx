import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomSection from '../components/projects/BottomSection'; // Adjust path if needed
import TopBar from '../components/projects/TopBar'; // Optional: include TopBar as well

const MainLayout = () => {
  return (
    <div>
      {/* Optional: Add a top bar that appears on every page */}
      {/* <TopBar /> */}
      
      {/* This is where your page content will be rendered */}
      <main>
        <Outlet />
      </main>

      {/* The BottomSection is now part of the layout and will always be visible */}
      <BottomSection />
    </div>
  );
};

export default MainLayout;

