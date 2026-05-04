import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlocks, createBlock, updateBlock, deleteBlock } from './api';

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

export const useUpdateBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string } }) => updateBlock(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] });
    },
  });
};

export const useDeleteBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteBlock(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] });
    },
  });
};
