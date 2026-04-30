import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet } from '@tanstack/react-router';

/**
 * Main application layout integrating Sidebar, Topbar, and the routed content.
 */
export const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-inner m-4 rounded-xl border border-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
