import { useQuery } from '@tanstack/react-query';
import { fetchPieces } from './api';

/**
 * Hook to fetch pieces for a specific block.
 * @param blockId - The block ID
 */
export const usePieces = (blockId: string) => {
  return useQuery({
    queryKey: ['pieces', blockId],
    queryFn: () => fetchPieces(blockId),
    enabled: !!blockId,
  });
};
