import { AlertCircle } from 'lucide-react';
import { AxiosError } from 'axios';

interface Props {
  error: Error | AxiosError | null;
}

export const AlertError = ({ error }: Props) => {
  if (!error) return null;

  let message = 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';
  let details: string[] = [];

  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<any>;

    if (axiosError.response?.status === 401) {
      message = 'Sesión expirada o no autorizado. Por favor, inicia sesión de nuevo.';
    } else if (axiosError.response?.status === 403) {
      message = 'No tienes permiso para acceder a este recurso.';
    } else if (axiosError.response?.status === 404) {
      message = 'Recurso no encontrado.';
    } else if (axiosError.response?.status === 500) {
      message = 'Error del servidor. Por favor, intenta más tarde.';
    } else if (axiosError.response?.data) {
      const data = axiosError.response.data;
      message = data.message || message;

      if (data.errors && typeof data.errors === 'object') {
        details = Object.values(data.errors).flat() as string[];
      }
    } else if (axiosError.request && !axiosError.response) {
      message = 'No se pudo conectar con el servidor. Revisa tu conexión.';
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 shadow-sm shadow-red-500/10 animate-in fade-in slide-in-from-top-2">
      <div className="flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-red-800">{message}</h3>
          {details.length > 0 && (
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
              {details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
