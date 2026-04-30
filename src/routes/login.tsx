import * as React from 'react';
import { useLogin } from '../features/auth/hooks';

/**
 * Login page component.
 */
export const Login = () => {
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to manage your pieces</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPending ? 'Signing in...' : 'Sign In with Mock Data'}
          </button>
        </form>
      </div>
    </div>
  );
};
