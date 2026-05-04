import { useToast } from './useToast';

export interface ApiError {
  message: string;
  response?: {
    status: number;
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

export const useErrorHandler = () => {
  const { showError, showWarning, showInfo } = useToast();

  const handleError = (error: unknown, defaultMessage = 'Ocurrió un error inesperado') => {
    console.error('Error handled:', error);

    // Si es un error de API con estructura conocida
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as ApiError;

      // Errores de validación (422)
      if (apiError.response?.status === 422) {
        const validationErrors = apiError.response.data?.errors;
        if (validationErrors) {
          // Tomar el primer error de validación
          const firstError = Object.values(validationErrors)[0]?.[0];
          showError(firstError || 'Error de validación', 'Datos inválidos');
          return;
        }
      }

      // No autorizado (401)
      if (apiError.response?.status === 401) {
        showWarning('Tu sesión ha expirado', 'Por favor inicia sesión nuevamente');
        // Redirigir al login después de un breve delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      // Prohibido (403)
      if (apiError.response?.status === 403) {
        showError('No tienes permisos para esta acción', 'Acceso denegado');
        return;
      }

      // No encontrado (404)
      if (apiError.response?.status === 404) {
        showError('El recurso solicitado no existe', 'No encontrado');
        return;
      }

      // Error del servidor (500)
      if (apiError.response?.status && apiError.response.status >= 500) {
        showError('Error del servidor. Intenta nuevamente más tarde', 'Error interno');
        return;
      }

      // Mensaje de error específico del backend
      const backendMessage = apiError.response?.data?.message;
      if (backendMessage) {
        showError(backendMessage);
        return;
      }
    }

    // Si es un error con mensaje simple
    if (error && typeof error === 'object' && 'message' in error) {
      const simpleError = error as { message: string };
      showError(simpleError.message);
      return;
    }

    // Error por defecto
    showError(defaultMessage);
  };

  const handleSuccess = (message: string, title?: string) => {
    // El hook useToast ya tiene el método success
    showInfo(message, title);
  };

  return {
    handleError,
    handleSuccess,
    // Métodos directos para usar sin importar useToast
    showError,
    showWarning,
    showInfo,
  };
};
