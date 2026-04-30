import { useMutation } from '@tanstack/react-query';
import { loginApi } from './api';
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
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.user, data.token);
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
