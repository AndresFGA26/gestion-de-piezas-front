import * as React from 'react';
import { useState } from 'react';
import { AlertError } from '../components/ui/AlertError';
import { useLogin } from '../features/auth/hooks';
import { Link } from '@tanstack/react-router';

export const Login = () => {
  const { mutate: login, isPending, error } = useLogin();
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('12345678');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to manage your factory pieces</p>
        
        <AlertError error={error} />

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white outline-none"
              placeholder="admin@test.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-blue-500/20"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
