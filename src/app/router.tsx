import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from '@tanstack/react-router';

import { Layout } from '../components/layout/Layout';
import { Login } from '../routes/login';
import { RegisterPage } from '../routes/register';
import { Dashboard } from '../routes/dashboard';
import { Blocks } from '../routes/blocks';
import { Pieces } from '../routes/pieces';
import { Reports } from '../routes/reports';

import { useAuthStore } from '../features/auth/store';

const rootRoute = createRootRoute({});

const requireAuth = () => {
  const token = useAuthStore.getState().token;
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (!token || !isAuthenticated) {
    throw redirect({ to: '/login' });
  }
};

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
  beforeLoad: () => {
    const token = useAuthStore.getState().token;

    if (token) {
      throw redirect({ to: '/' });
    }
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
  beforeLoad: () => {
    const token = useAuthStore.getState().token;

    if (token) {
      throw redirect({ to: '/' });
    }
  },
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
  beforeLoad: requireAuth,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: Dashboard,
});

const blocksRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/projects/$projectId/blocks',
  component: Blocks,
  beforeLoad: ({ params }) => {
    if (!params.projectId) {
      throw redirect({ to: '/' });
    }
  },
});

const piecesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/blocks/$blockId/pieces',
  component: Pieces,
  beforeLoad: ({ params }) => {
    if (!params.blockId) {
      throw redirect({ to: '/' });
    }
  },
});

const reportsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/reports',
  component: Reports,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  layoutRoute.addChildren([
    indexRoute,
    blocksRoute,
    piecesRoute,
    reportsRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}