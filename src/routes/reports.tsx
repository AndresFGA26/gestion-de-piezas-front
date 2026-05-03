import { useReports } from '../features/reports/hooks';
import { BarChart3, PieChart, Activity, Loader2 } from 'lucide-react';

export const Reports = () => {
  const { data: report, isLoading, isError } = useReports();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-blue-600">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (isError || !report) {
    return <div className="flex justify-center items-center h-full text-red-500 bg-red-50 p-6 rounded-xl">Error cargando reportes.</div>;
  }

  const { totals, projects } = report;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reporte Global</h1>
          <p className="text-gray-500 mt-1">Visión general del estado de las piezas en fábrica</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg shadow-blue-900/20">
          <div className="flex items-center gap-3 mb-6 opacity-80">
            <Activity className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Piezas Fabricadas</h2>
          </div>
          <p className="text-6xl font-black">{totals['Fabricada'] || 0}</p>
          <p className="mt-4 text-blue-100 font-medium">Total histórico de la planta</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white shadow-lg shadow-amber-900/20">
          <div className="flex items-center gap-3 mb-6 opacity-80">
            <PieChart className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Piezas Pendientes</h2>
          </div>
          <p className="text-6xl font-black">{totals['Pendiente'] || 0}</p>
          <p className="mt-4 text-amber-100 font-medium">En proceso de fabricación</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900">Desglose por Proyecto</h2>
        </div>

        <div className="space-y-6">
          {projects.map(project => {
            const total = project.stats.Total || 1; // Para evitar división por 0
            const pFabricadas = Math.round((project.stats.Fabricada / total) * 100) || 0;
            const pPendientes = Math.round((project.stats.Pendiente / total) * 100) || 0;

            return (
              <div key={project.id} className="border border-gray-100 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
                  <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-600">Total: {project.stats.Total} piezas</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">Fabricadas ({project.stats.Fabricada})</span>
                      <span className="text-gray-500">{pFabricadas}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${pFabricadas}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600 font-medium">Pendientes ({project.stats.Pendiente})</span>
                      <span className="text-gray-500">{pPendientes}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: `${pPendientes}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {projects.length === 0 && (
             <div className="text-center text-gray-500 py-8">No hay datos de proyectos para mostrar.</div>
          )}
        </div>
      </div>
    </div>
  );
};
