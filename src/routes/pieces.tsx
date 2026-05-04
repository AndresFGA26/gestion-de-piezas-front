import * as React from 'react';
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { usePieces, useCreatePiece, useUpdatePiece, useDeletePiece } from '../features/pieces/hooks';
import { Plus, ArrowLeft, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { AlertError } from '../components/ui/AlertError';
import { ActionButtons } from '../components/ui/ActionButtons';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { LoadingButton } from '../components/ui/LoadingButton';
import { useToast } from '../hooks/useToast';
import { useErrorHandler } from '../hooks/useErrorHandler';

export const Pieces = () => {
  const { blockId } = useParams({ strict: false });
  const safeBlockId = blockId as string;
  const { data: pieces = [], isLoading, error: fetchError } = usePieces(safeBlockId);
  const { mutate: createPiece, isPending: isCreating, error: createError, reset: resetError } = useCreatePiece();
  const { mutate: updatePiece, isPending: isUpdating } = useUpdatePiece();
  const { mutate: deletePiece, isPending: isDeleting } = useDeletePiece();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pesoTeorico, setPesoTeorico] = useState('');
  const [pesoReal, setPesoReal] = useState('');
  const [editPesoTeorico, setEditPesoTeorico] = useState('');
  const [editPesoReal, setEditPesoReal] = useState('');
  const [selectedPiece, setSelectedPiece] = useState<{ id: number; peso_teorico: number; peso_real?: number | null } | null>(null);
  
  // Hooks para UX mejorada
  const { showSuccess } = useToast();
  const { handleError } = useErrorHandler();

  const handleCreatePiece = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesoTeorico || !safeBlockId) return;

    const payload = {
      peso_teorico: parseFloat(pesoTeorico),
      ...(pesoReal ? { peso_real: parseFloat(pesoReal) } : {}),
    };

    createPiece(
      { blockId: safeBlockId, data: payload },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setPesoTeorico('');
          setPesoReal('');
          showSuccess('Pieza creada correctamente', 'Éxito');
        },
        onError: (error) => {
          handleError(error, 'Error al crear la pieza');
        },
      }
    );
  };

  const handleEditPiece = (piece: any) => {
    setSelectedPiece({
      id: piece.id,
      peso_teorico: Number(piece.peso_teorico),
      peso_real: piece.peso_real ? Number(piece.peso_real) : null,
    });
    setEditPesoTeorico(piece.peso_teorico.toString());
    setEditPesoReal(piece.peso_real?.toString() || '');
    setIsEditModalOpen(true);
  };

  const handleUpdatePiece = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPesoTeorico || !selectedPiece) return;

    const payload = {
      peso_teorico: parseFloat(editPesoTeorico),
      ...(editPesoReal ? { peso_real: parseFloat(editPesoReal) } : {}),
    };

    console.log('Updating piece with payload:', { id: selectedPiece.id, payload });

    updatePiece(
      { id: selectedPiece.id, data: payload },
      {
        onSuccess: (updatedPiece) => {
          console.log('Update successful:', updatedPiece);
          setIsEditModalOpen(false);
          setEditPesoTeorico('');
          setEditPesoReal('');
          setSelectedPiece(null);
          showSuccess('Pieza actualizada correctamente', 'Éxito');
          
          // Ya no redirigir automáticamente, quedarse en la página de piezas
        },
        onError: (error) => {
          console.error('Update piece error:', error);
          handleError(error, 'Error al actualizar la pieza');
        },
      }
    );
  };

  const handleDeletePiece = (piece: any) => {
    setSelectedPiece({
      id: piece.id,
      peso_teorico: Number(piece.peso_teorico),
      peso_real: piece.peso_real ? Number(piece.peso_real) : null,
    });
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePiece = () => {
    if (!selectedPiece) return;
    deletePiece(selectedPiece.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedPiece(null);
        showSuccess('Pieza eliminada correctamente', 'Éxito');
      },
      onError: (error) => {
        console.error('Delete piece error:', error);
        handleError(error, 'Error al eliminar la pieza');
      },
    });
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

  
  // Validación: asegura que pieces es un array antes de usar .map()
  const piecesArray = Array.isArray(pieces) ? pieces : [];
  
  // Crear número secuencial por bloque para mejor UX
  const piecesWithSequentialId = piecesArray.map((piece, index) => ({
    ...piece,
    sequentialId: index + 1, // Pieza #1, #2, #3... del bloque actual
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver a Bloques
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Piezas del Bloque</h1>
          <p className="text-gray-500 mt-1">Registra e inspecciona las piezas de acero</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Añadir Pieza
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">ID Pieza</th>
                <th className="px-6 py-4">Peso Teórico (kg)</th>
                <th className="px-6 py-4">Peso Real (kg)</th>
                <th className="px-6 py-4">Diferencia</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {piecesWithSequentialId.map((piece) => (
                <tr key={piece.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#{piece.sequentialId}</td>
                  <td className="px-6 py-4">{piece.peso_teorico}</td>
                  <td className="px-6 py-4 text-gray-500">{piece.peso_real ?? '-'}</td>
                  <td className="px-6 py-4">
                    {piece.diferencia_peso ? (
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          Number(piece.diferencia_peso) > 0
                            ? 'bg-red-50 text-red-600'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >
                        {piece.diferencia_peso} kg
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          piece.estado === 'Fabricada'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }
                      `}
                    >
                      {piece.estado === 'Fabricada' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {piece.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionButtons
                      onEdit={() => handleEditPiece(piece)}
                      onDelete={() => handleDeletePiece(piece)}
                      isEditing={isUpdating}
                      isDeleting={isDeleting}
                      size="sm"
                    />
                  </td>
                </tr>
              ))}

              {piecesWithSequentialId.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No hay piezas registradas en este bloque.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Registrar Pieza</h2>
            </div>
            <form onSubmit={handleCreatePiece} className="p-6 space-y-6">
              <AlertError error={createError} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso Teórico (Obligatorio)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    required
                    autoFocus
                    value={pesoTeorico}
                    onChange={(e) => setPesoTeorico(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                    placeholder="Ej: 15.5"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-medium">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso Real (Opcional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={pesoReal}
                    onChange={(e) => setPesoReal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                    placeholder="Dejar en blanco si está Pendiente"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-medium">kg</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Si añades el peso real, la pieza pasará a estado "Fabricada".
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetError();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <LoadingButton
                  type="submit"
                  loading={isCreating}
                  loadingText="Guardando..."
                  className="flex-1"
                >
                  Guardar Pieza
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Pieza */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Editar Pieza</h2>
            </div>
            <form onSubmit={handleUpdatePiece} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso Teórico (Obligatorio)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    required
                    autoFocus
                    value={editPesoTeorico}
                    onChange={(e) => setEditPesoTeorico(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                    placeholder="Ej: 15.5"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-medium">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso Real (Opcional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={editPesoReal}
                    onChange={(e) => setEditPesoReal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                    placeholder="Dejar en blanco si está Pendiente"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-medium">kg</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Si añades el peso real, la pieza pasará a estado "Fabricada".
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditPesoTeorico('');
                    setEditPesoReal('');
                    setSelectedPiece(null);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <LoadingButton
                  type="submit"
                  loading={isUpdating}
                  loadingText="Actualizando..."
                  className="flex-1"
                >
                  Actualizar Pieza
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminación */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPiece(null);
        }}
        onConfirm={confirmDeletePiece}
        title="Eliminar Pieza"
        message={`¿Estás seguro de que deseas eliminar esta pieza? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />

          </div>
  );
};
