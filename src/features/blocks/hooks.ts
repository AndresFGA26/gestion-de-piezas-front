import { useQuery } from '@tanstack/react-query';
import { fetchBlocks } from './api';

/**
 * Hook to fetch blocks for a specific project.
 * @param projectId - The project ID
 */
export const useBlocks = (projectId: string) => {
  return useQuery({
    queryKey: ['blocks', projectId],
    queryFn: () => fetchBlocks(projectId),
    enabled: !!projectId,
  });
};
