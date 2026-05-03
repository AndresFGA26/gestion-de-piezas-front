import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../features/auth/store';
import { API_CONFIG } from '../config/api';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Auth Service Instance
export const authApi = axios.create({
  baseURL: API_CONFIG.auth.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: API_CONFIG.timeout,
});

// Pieces Service Instance
export const piecesApi = axios.create({
  baseURL: API_CONFIG.pieces.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: API_CONFIG.timeout,
});

const getAuthToken = () => {
  return useAuthStore.getState().token;
};

const getRefreshToken = () => {
  return useAuthStore.getState().refreshToken;
};

// Interceptor to inject token
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Interceptor to handle 401 with token refresh
const errorInterceptor = async (error: any) => {
  const originalRequest = error.config;

  // Log errores para debugging
  if (import.meta.env.DEV) {
    console.error('API Error:', {
      status: error.response?.status,
      url: originalRequest?.url,
      message: error.message,
    });
  }

  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(piecesApi(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        console.warn('No refresh token available, logging out');
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      const response = await authApi.post<ApiResponse<{ access_token: string }>>('/refresh', {
        refresh_token: refreshToken,
      });

      const newToken = response.data.data.access_token;
      useAuthStore.getState().setTokens(newToken, refreshToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      onTokenRefreshed(newToken);

      return piecesApi(originalRequest);
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  if (error.response?.status === 403 || error.response?.status === 401) {
    console.warn('Access denied, logging out');
    useAuthStore.getState().logout();
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

authApi.interceptors.request.use(authInterceptor);
authApi.interceptors.response.use((res) => res, errorInterceptor);

piecesApi.interceptors.request.use(authInterceptor);
piecesApi.interceptors.response.use((res) => res, errorInterceptor);

// Standard API Response Interface matching Laravel's ApiResponse trait
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}
