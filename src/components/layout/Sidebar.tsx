import { Link } from '@tanstack/react-router';
import { FolderGit2, PieChart, Factory } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside
      role="navigation"
      className="w-72 bg-gray-900 border-r border-gray-800 h-screen flex flex-col text-white"
    >
      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-800 bg-gray-950/50">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Factory className="w-5 h-5 text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">FactoryManager</h1>
          <p className="text-xs text-gray-400 font-medium">
            Control de Producción
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 mt-4">
        <ul className="space-y-2">

          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 font-medium"
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  'bg-blue-600 text-white hover:bg-blue-600 shadow-lg shadow-blue-900/20',
              }}
            >
              <FolderGit2 className="w-5 h-5" />
              Proyectos
            </Link>
          </li>

          <li>
            <Link
              to="/reports"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 font-medium"
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  'bg-blue-600 text-white hover:bg-blue-600 shadow-lg shadow-blue-900/20',
              }}
            >
              <PieChart className="w-5 h-5" />
              Reportes Globales
            </Link>
          </li>

        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800/50 rounded-xl p-4 text-xs text-gray-400">
          v1.0.0 - Pieces Service
        </div>
      </div>
    </aside>
  );
};