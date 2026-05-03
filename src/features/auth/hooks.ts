import { useMutation } from '@tanstack/react-query';
import { loginApi, registerApi } from './api';
import type { LoginCredentials, RegisterCredentials } from './api';
import { useAuthStore } from './store';
import { useNavigate } from '@tanstack/react-router';

/**
 * Hook to handle user login.
 * On success, saves token and redirects to dashboard.
 */
export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data) => {
      login(data.user, data.token, data.refreshToken);
      navigate({ to: '/' });
    },
  });
};

/**
 * Hook to handle user registration.
 * On success, saves token and redirects to dashboard.
 */
export const useRegister = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerApi(credentials),
    onSuccess: (data) => {
      // Convert register response to login format for store
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
      
      login(userData, data.access_token, data.refresh_token);
      navigate({ to: '/' });
    },
  });
};

/**
 * Hook to handle user logout.
 */
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return () => {
    logout();
    navigate({ to: '/login' });
  };
};
