import React from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from '../../features/Auth/deshboard/ui/Sidebar';
import TopNavbar from '../../features/Auth/deshboard/ui/TopNavbar';

function Deshboard() {
  // Redux se theme mode read karo — "dark" ya "light"
  const theme = useSelector((state) => state.theme.mode);

  return (
    // data-theme dynamically set hoga Redux state se
    // App.css ke [data-theme='dark'] / [data-theme='light'] variables activate honge
    <div
      data-theme={theme ?? 'dark'}
      className="flex h-screen w-screen overflow-hidden bg-[var(--color-background)] transition-colors duration-300"
    >
      {/* Static Left Sidebar */}
      <Sidebar />

      {/* Right side: Top Navbar + Dynamic Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Static Top Navbar — theme toggle button isme hai */}
        <TopNavbar />

        {/* Dynamic Content Area — changes per route via <Outlet/> */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-7 bg-[var(--color-background)] transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Deshboard;
