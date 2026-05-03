import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { Project } from '../../types';

/**
 * Fetches the list of projects for the authenticated user.
 */
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await piecesApi.get<ApiResponse<Project[]>>('/projects');

    const projectsData = response.data?.data;

    if (!Array.isArray(projectsData)) {
      console.warn('Backend returned invalid projects data:', projectsData);
      return [];
    }

    return projectsData;
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
      throw new Error('Backend returned invalid project data');
    }

    return projectData;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};
