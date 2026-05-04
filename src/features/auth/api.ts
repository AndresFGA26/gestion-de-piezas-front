import { authApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { User } from '../../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface RefreshResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponseData {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Authenticates a user and fetches profile data.
 */
export const loginApi = async (credentials: LoginCredentials): Promise<{ user: User; token: string; refreshToken: string }> => {
  const loginResponse = await authApi.post<ApiResponse<LoginResponseData>>('/login', credentials);
  const { access_token, refresh_token } = loginResponse.data.data;

  const profileResponse = await authApi.get<ApiResponse<User>>('/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const user = profileResponse.data.data;

  return {
    user,
    token: access_token,
    refreshToken: refresh_token,
  };
};

/**
 * Refreshes the access token using the refresh token.
 */
export const refreshTokenApi = async (refreshToken: string): Promise<string> => {
  const response = await authApi.post<ApiResponse<RefreshResponseData>>('/refresh', {
    refresh_token: refreshToken,
  });
  return response.data.data.access_token;
};

/**
 * Registers a new user and returns authentication data.
 */
export const registerApi = async (credentials: RegisterCredentials): Promise<RegisterResponseData> => {
  const response = await authApi.post<ApiResponse<RegisterResponseData>>('/register', credentials);
  return response.data.data;
};
