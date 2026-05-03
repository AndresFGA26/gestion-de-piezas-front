import { useAuthStore } from '../../features/auth/store';
import { useLogout } from '../../features/auth/hooks';

export const Topbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h2>

      {/* User section */}
      <div className="flex items-center space-x-4">

        <span className="text-sm text-gray-600">
          Hello,{' '}
          <span className="font-medium text-gray-900">
            {user?.name ? user.name : 'Usuario'}
          </span>
        </span>

        <button
          onClick={logout}
          className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer transition-colors"
        >
          Logout
        </button>

      </div>
    </header>
  );
};