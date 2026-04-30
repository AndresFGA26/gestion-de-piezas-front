import { apiClient } from '../../lib/apiClient';
import { mockBlocks } from '../../utils/mockData';
import type { Block } from '../../types';

/**
 * Fetches the blocks for a specific project.
 * @param projectId - The project ID
 * @returns A promise resolving to an array of blocks.
 */
export const fetchBlocks = async (projectId: string): Promise<Block[]> => {
  // Uncomment the following line when backend is ready:
  // return apiClient<Block[]>(`/api/projects/${projectId}/blocks`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBlocks.filter(b => b.projectId === projectId));
    }, 500);
  });
};
