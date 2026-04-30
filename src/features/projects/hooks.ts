import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from './api';

/**
 * Hook to fetch and cache projects.
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
