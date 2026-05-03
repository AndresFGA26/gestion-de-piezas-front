// Configuración centralizada de URLs de API
export const API_CONFIG = {
  auth: {
    baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8000/api/v1',
    endpoints: {
      login: '/login',
      refresh: '/refresh',
      logout: '/logout',
    },
  },
  pieces: {
    baseURL: import.meta.env.VITE_PIECES_API_URL || 'http://localhost:8001/api/v1',
    endpoints: {
      pieces: (blockId: string) => `/blocks/${blockId}/pieces`,
      createPiece: (blockId: string) => `/blocks/${blockId}/pieces`,
      updatePiece: (blockId: string, pieceId: string) => `/blocks/${blockId}/pieces/${pieceId}`,
      deletePiece: (pieceId: string) => `/pieces/${pieceId}`,
      reports: '/reports',
    },
  },
  // Configuración de timeouts y reintentos
  timeout: 15000,
  retryAttempts: 2,
  retryDelay: 1000,
} as const;

// Tipos para las respuestas de API
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Utilidades para manejo de errores
export const extractApiError = (error: any): string => {
  if (error?.response?.data?.errors) {
    const validationErrors = error.response.data.errors;
    const firstError = Object.values(validationErrors)[0];
    if (Array.isArray(firstError) && firstError[0]) {
      return firstError[0];
    }
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'Error desconocido. Por favor, intenta nuevamente.';
};
