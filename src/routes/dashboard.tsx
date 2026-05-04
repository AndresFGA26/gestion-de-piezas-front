import * as React from 'react';
import { useState } from 'react';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../features/projects/hooks';
import { Link } from '@tanstack/react-router';
import { Plus, FolderGit2, Calendar, Loader2 } from 'lucide-react';
import { AlertError } from '../components/ui/AlertError';
import { ActionButtons } from '../components/ui/ActionButtons';
import { ConfirmModal } from '../components/ui/ConfirmModal';

export const Dashboard = () => {
  const { data: projects, isLoading, error: fetchError } = useProjects();
  const { mutate: createProject, isPending: isCreating, error: createError, reset: resetError } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState<{ id: number; name: string } | null>(null);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    createProject(
      { name: newProjectName },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setNewProjectName('');
        },
      }
    );
  };

  const handleEditProject = (project: { id: number; name: string }) => {
    setSelectedProject(project);
    setEditProjectName(project.name);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProjectName.trim() || !selectedProject) return;
    updateProject(
      { id: selectedProject.id, data: { name: editProjectName } },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditProjectName('');
          setSelectedProject(null);
        },
      }
    );
  };

  const handleDeleteProject = (project: { id: number; name: string }) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProject = () => {
    if (!selectedProject) return;
    deleteProject(selectedProject.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
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

  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Proyectos</h1>
          <p className="text-gray-500 mt-1">Gestiona todos los proyectos de manufactura</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <div 
            key={project.id} 
            className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <Link 
                to="/projects/$projectId/blocks" 
                params={{ projectId: project.id.toString() }}
                className="flex-1"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{project.name}</h3>
              </Link>
              
              <ActionButtons
                onEdit={() => handleEditProject(project)}
                onDelete={() => handleDeleteProject(project)}
                isEditing={isUpdating}
                isDeleting={isDeleting}
                size="sm"
              />
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.created_at ? new Date(project.created_at).toLocaleDateString() : 'Reciente'}</span>
              </div>
            </div>
          </div>
        ))}
        
        {(!projects || projects.length === 0) && (
          <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FolderGit2 className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700">No hay proyectos</p>
            <p className="text-sm mt-1 mb-6">Crea tu primer proyecto para comenzar a gestionar piezas.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 font-medium hover:underline"
            >
              Crear Proyecto ahora
            </button>
          </div>
        )}
      </div>

      {/* Modal Crear Proyecto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Proyecto</h2>
            </div>
            <form onSubmit={handleCreateProject} className="p-6 space-y-6">
              <AlertError error={createError} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Proyecto</label>
                <input 
                  type="text"
                  required
                  autoFocus
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ej: Torre Norte"
                />
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

      {/* Modal Editar Proyecto */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Editar Proyecto</h2>
            </div>
            <form onSubmit={handleUpdateProject} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Proyecto</label>
                <input 
                  type="text"
                  required
                  autoFocus
                  value={editProjectName}
                  onChange={(e) => setEditProjectName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ej: Torre Norte"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditProjectName('');
                    setSelectedProject(null);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 flex justify-center items-center cursor-pointer"
                >
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Actualizar'}
                </button>
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
          setSelectedProject(null);
        }}
        onConfirm={confirmDeleteProject}
        title="Eliminar Proyecto"
        message={`¿Estás seguro de que deseas eliminar el proyecto "${selectedProject?.name}"? Esta acción también eliminará todos los bloques y piezas asociados y no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};
