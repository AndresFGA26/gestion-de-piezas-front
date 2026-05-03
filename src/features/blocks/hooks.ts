import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlocks, createBlock } from './api';

export const useBlocks = (projectId: string) => {
  return useQuery({
    queryKey: ['blocks', projectId],
    queryFn: () => fetchBlocks(projectId),
    enabled: !!projectId,
  });
};

export const useCreateBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { project_id: number; name: string }) => createBlock(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blocks', variables.project_id.toString()] });
    },
  });
};
