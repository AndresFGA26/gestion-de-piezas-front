import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Toast } from '../components/ui/Toast';

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
}

export const useToastStore = create<ToastStore>()(
  devtools(
    (set, get) => ({
      toasts: [],

      addToast: (toast) => {
        const id = Date.now().toString();
        const newToast: Toast = { ...toast, id };
        
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));
        
        return id;
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      clearToasts: () => {
        set({ toasts: [] });
      },

      success: (message, title) => {
        return get().addToast({ type: 'success', message, title });
      },

      error: (message, title) => {
        return get().addToast({ type: 'error', message, title, duration: 8000 });
      },

      warning: (message, title) => {
        return get().addToast({ type: 'warning', message, title });
      },

      info: (message, title) => {
        return get().addToast({ type: 'info', message, title });
      },
    }),
    {
      name: 'toast-store',
    }
  )
);

// Hook conveniente para usar notificaciones
export const useToast = () => {
  const store = useToastStore();
  
  return {
    ...store,
    // Métodos con nombres más cortos para uso común
    showSuccess: store.success,
    showError: store.error,
    showWarning: store.warning,
    showInfo: store.info,
  };
};
