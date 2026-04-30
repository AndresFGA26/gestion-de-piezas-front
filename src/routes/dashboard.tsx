import * as React from 'react';
import { useProjects } from '../features/projects/hooks';

/**
 * Dashboard page displaying the user's projects.
 */
export const Dashboard = () => {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <div className="flex justify-center items-center h-full text-gray-500">Loading projects...</div>;
  }
  
  if (isError) {
    return <div className="flex justify-center items-center h-full text-red-500">Failed to load projects.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Your Projects</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{project.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{project.description || 'No description provided.'}</p>
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <div className="col-span-full p-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            No projects found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
};
