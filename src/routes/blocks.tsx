import * as React from 'react';
import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useBlocks, useCreateBlock } from '../features/blocks/hooks';
import { Box, Plus, Loader2, ArrowLeft, GitMerge } from 'lucide-react';
import { AlertError } from '../components/ui/AlertError';

export const Blocks = () => {
  const { projectId } = useParams({ strict: false });
  const safeProjectId = projectId as string;
  const { data: blocks = [], isLoading, error: fetchError } = useBlocks(safeProjectId);
  const { mutate: createBlock, isPending: isCreating, error: createError, reset: resetError } = useCreateBlock();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlockName, setNewBlockName] = useState('');

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockName.trim() || !safeProjectId) return;
    createBlock(
      { project_id: parseInt(safeProjectId), name: newBlockName },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setNewBlockName('');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-blue-600">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-6">
        <AlertError error={fetchError} />
      </div>
    );
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetError();
  };

  // Validación: asegura que blocks es un array
  const blocksArray = Array.isArray(blocks) ? blocks : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver a Proyectos
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bloques del Proyecto</h1>
          <p className="text-gray-500 mt-1">Administra los bloques que componen este proyecto</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nuevo Bloque
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blocksArray.map((block) => (
          <Link
            to="/blocks/$blockId/pieces"
            params={{ blockId: block.id.toString() }}
            key={block.id}
            className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {block.name}
              </h3>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1">
                <GitMerge className="w-4 h-4" /> Bloque ID: {block.id}
              </span>
            </div>
          </Link>
        ))}

        {blocksArray.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Box className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700">No hay bloques</p>
            <p className="text-sm mt-1 mb-6">Añade tu primer bloque para empezar a registrar piezas.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Bloque</h2>
            </div>
            <form onSubmit={handleCreateBlock} className="p-6 space-y-6">
              <AlertError error={createError} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Bloque</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newBlockName}
                  onChange={(e) => setNewBlockName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ej: Bloque A"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 flex justify-center items-center cursor-pointer"
                >
                  {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
