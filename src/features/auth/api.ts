import { apiClient } from '../../lib/apiClient';
import { mockUser } from '../../utils/mockData';
import type { User } from '../../types';

/**
 * Authenticates a user.
 * @returns A promise resolving to user data and token.
 */
export const loginApi = async (): Promise<{ user: User; token: string }> => {
  // Uncomment the following line when the backend is ready:
  // return apiClient<{ user: User; token: string }>('/api/auth/login', { method: 'POST' });
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: mockUser, token: 'fake-jwt-token-123' });
    }, 500);
  });
};
