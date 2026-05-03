import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { Block } from '../../types';

export const fetchBlocks = async (projectId: string): Promise<Block[]> => {
  try {
    const response = await piecesApi.get<ApiResponse<Block[]>>(
      `/projects/${projectId}/blocks`
    );

    const blocksData = response.data?.data;

    if (!Array.isArray(blocksData)) {
      console.warn('Backend returned invalid blocks data:', blocksData);
      return [];
    }

    return blocksData;
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
