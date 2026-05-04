import { useQuery } from '@tanstack/react-query';
import { fetchReports } from './api';

export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });
};

// Hook para datos del gráfico de barras (piezas por proyecto)
export const useBarChartData = () => {
  return useQuery({
    queryKey: ['reports', 'bar-chart'],
    queryFn: async () => {
      const reports = await fetchReports();
      
      // Transformar datos para Chart.js
      const labels = reports.projects.map(project => project.name);
      const fabricadas = reports.projects.map(project => project.stats.Fabricada);
      const pendientes = reports.projects.map(project => project.stats.Pendiente);
      
      return {
        labels,
        datasets: [
          {
            label: 'Piezas Fabricadas',
            data: fabricadas,
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 2,
          },
          {
            label: 'Piezas Pendientes',
            data: pendientes,
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2,
          },
        ],
      };
    },
  });
};

// Hook para datos del gráfico de pastel (piezas por estado)
export const usePieChartData = () => {
  return useQuery({
    queryKey: ['reports', 'pie-chart'],
    queryFn: async () => {
      const reports = await fetchReports();
      
      // Datos para gráfico de pastel
      const labels = ['Fabricadas', 'Pendientes'];
      const data = [reports.totals.Fabricada || 0, reports.totals.Pendiente || 0];
      
      return {
        labels,
        datasets: [
          {
            label: 'Piezas por Estado',
            data,
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',  // Verde para fabricadas
              'rgba(239, 68, 68, 0.8)',  // Rojo para pendientes
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(239, 68, 68, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
    },
  });
};
