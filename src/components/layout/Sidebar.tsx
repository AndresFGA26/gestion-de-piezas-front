import * as React from 'react';
import { Link } from '@tanstack/react-router';

/**
 * Sidebar navigation component.
 */
export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Pieces Manager</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              activeProps={{ className: 'bg-blue-50 text-blue-700 font-medium' }}
            >
              Dashboard
            </Link>
          </li>
          {/* Blocks and Pieces links can be added here in the future */}
        </ul>
      </nav>
    </aside>
  );
};
