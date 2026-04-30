import { apiClient } from '../../lib/apiClient';
import { mockProjects } from '../../utils/mockData';
import type { Project } from '../../types';

/**
 * Fetches the list of projects for the authenticated user.
 * @returns A promise resolving to an array of projects.
 */
export const fetchProjects = async (): Promise<Project[]> => {
  // Uncomment the following line when the backend is ready:
  // return apiClient<Project[]>('/api/projects');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 500);
  });
};
