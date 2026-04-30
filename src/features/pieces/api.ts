import { apiClient } from '../../lib/apiClient';
import { mockPieces } from '../../utils/mockData';
import type { Piece } from '../../types';

/**
 * Fetches the pieces for a specific block.
 * @param blockId - The block ID
 * @returns A promise resolving to an array of pieces.
 */
export const fetchPieces = async (blockId: string): Promise<Piece[]> => {
  // Uncomment the following line when backend is ready:
  // return apiClient<Piece[]>(`/api/blocks/${blockId}/pieces`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPieces.filter(p => p.blockId === blockId));
    }, 500);
  });
};
