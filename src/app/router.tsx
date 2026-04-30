import { createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router';
import { Layout } from '../components/layout/Layout';
import { Login } from '../routes/login';
import { Dashboard } from '../routes/dashboard';
import { useAuthStore } from '../features/auth/store';
import * as React from 'react';

// Define the root route
const rootRoute = createRootRoute({});

// Public login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
  beforeLoad: () => {
    // Redirect to home if already authenticated
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});

// Protected layout route wrapping the dashboard
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
  beforeLoad: () => {
    // Redirect to login if not authenticated
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});

// Dashboard route (child of layout)
const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: Dashboard,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([indexRoute]),
]);

// Create the router
export const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
