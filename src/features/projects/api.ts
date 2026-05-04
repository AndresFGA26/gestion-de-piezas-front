import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { Project } from '../../types';

/**
 * Fetches the list of projects for the authenticated user.
 */
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await piecesApi.get<ApiResponse<any>>('/projects');

    // Manejar respuesta paginada de Laravel
    const responseData = response.data;

    if (!responseData || !responseData.data) {
      console.warn('Backend returned no projects data:', response.data);
      return [];
    }

    // Si es paginado (estructura Laravel), extraer los datos del array
    if (responseData.data && Array.isArray(responseData.data.data)) {
      console.log('Projects fetched (paginated):', responseData.data.data.length, 'projects');
      return responseData.data.data;
    }

    // Si es array directo (fallback)
    if (Array.isArray(responseData.data)) {
      console.log('Projects fetched (direct):', responseData.data.length, 'projects');
      return responseData.data;
    }

    console.warn('Backend returned invalid projects data:', responseData);
    return [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Creates a new project.
 */
export const createProject = async (data: { name: string }): Promise<Project> => {
  try {
    const response = await piecesApi.post<ApiResponse<Project>>('/projects', data);

    const projectData = response.data?.data;

    if (!projectData || typeof projectData !== 'object') {
      console.error('Backend returned invalid project data:', response.data);
      throw new Error('Backend returned invalid project data');
    }

    console.log('Project created successfully:', projectData);
    return projectData;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Updates an existing project.
 */
export const updateProject = async (id: number, data: { name: string }): Promise<Project> => {
  try {
    const response = await piecesApi.put<ApiResponse<Project>>(`/projects/${id}`, data);

    const projectData = response.data?.data;

    if (!projectData || typeof projectData !== 'object') {
      throw new Error('Backend returned invalid project data');
    }

    return projectData;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * Deletes a project.
 */
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await piecesApi.delete(`/projects/${id}`);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
