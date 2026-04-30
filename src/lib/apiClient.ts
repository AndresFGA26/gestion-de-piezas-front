import { useAuthStore } from '../features/auth/store';

/**
 * A wrapper around fetch that automatically includes the auth token.
 * @param endpoint - The API endpoint to fetch
 * @param options - Standard fetch options
 * @returns A promise resolving to the response data
 */
export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
