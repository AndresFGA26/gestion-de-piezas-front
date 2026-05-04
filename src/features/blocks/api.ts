import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { Block } from '../../types';

export const fetchBlocks = async (projectId: string): Promise<Block[]> => {
  try {
    const response = await piecesApi.get<ApiResponse<any>>(
      `/projects/${projectId}/blocks`
    );

    // Manejar respuesta paginada de Laravel
    const responseData = response.data;

    if (!responseData || !responseData.data) {
      console.warn('Backend returned no blocks data:', response.data);
      return [];
    }

    // Si es paginado (estructura Laravel), extraer los datos del array
    if (responseData.data && Array.isArray(responseData.data.data)) {
      console.log('Blocks fetched (paginated):', responseData.data.data.length, 'blocks');
      return responseData.data.data;
    }

    // Si es array directo (fallback)
    if (Array.isArray(responseData.data)) {
      console.log('Blocks fetched (direct):', responseData.data.length, 'blocks');
      return responseData.data;
    }

    console.warn('Backend returned invalid blocks data:', responseData);
    return [];
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};

export const createBlock = async (data: {
  project_id: number;
  name: string;
}): Promise<Block> => {
  try {
    const response = await piecesApi.post<ApiResponse<Block>>('/blocks', data);

    const blockData = response.data?.data;

    if (!blockData || typeof blockData !== 'object') {
      throw new Error('Backend returned invalid block data');
    }

    return blockData;
  } catch (error) {
    console.error('Error creating block:', error);
    throw error;
  }
};

/**
 * Updates an existing block.
 */
export const updateBlock = async (id: number, data: { name: string }): Promise<Block> => {
  try {
    const response = await piecesApi.put<ApiResponse<Block>>(`/blocks/${id}`, data);

    const blockData = response.data?.data;

    if (!blockData || typeof blockData !== 'object') {
      throw new Error('Backend returned invalid block data');
    }

    return blockData;
  } catch (error) {
    console.error('Error updating block:', error);
    throw error;
  }
};

/**
 * Deletes a block.
 */
export const deleteBlock = async (id: number): Promise<void> => {
  try {
    await piecesApi.delete(`/blocks/${id}`);
  } catch (error) {
    console.error('Error deleting block:', error);
    throw error;
  }
};
