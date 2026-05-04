import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './app/router';
import { AppProviders } from './app/providers';
import { ToastContainer } from './components/ui/ToastContainer';
import './index.css';

const rootElement = document.getElementById('root')!;

/**
 * Entry point of the React application.
 */
createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppProviders>
  </StrictMode>
);
