import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPieces, createPiece } from './api';

export const usePieces = (blockId: string) => {
  return useQuery({
    queryKey: ['pieces', blockId],
    queryFn: () => fetchPieces(blockId),
    enabled: !!blockId,
    staleTime: 30000, // 30 segundos
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCreatePiece = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ blockId, data }: { blockId: string; data: { peso_teorico: number; peso_real?: number } }) => 
      createPiece(blockId, data),
    onSuccess: (newPiece, variables) => {
      // Invalidar queries para refrescar datos
      queryClient.invalidateQueries({ queryKey: ['pieces', variables.blockId] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      
      // Opcional: Actualizar cache inmediatamente para mejor UX
      queryClient.setQueryData(['pieces', variables.blockId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [...oldData, newPiece];
        }
        return [newPiece];
      });
    },
    onError: (error) => {
      console.error('Error creating piece:', error);
    },
  });
};
