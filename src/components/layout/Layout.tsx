
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet } from '@tanstack/react-router';

export const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <div className="sticky top-0 z-10">
          <Topbar />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-inner m-4 rounded-xl border border-gray-100 min-h-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};