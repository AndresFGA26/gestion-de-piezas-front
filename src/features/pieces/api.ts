import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { Piece } from '../../types';
import { API_CONFIG, extractApiError } from '../../config/api';

export const fetchPieces = async (blockId: string): Promise<Piece[]> => {
  try {
    const response = await piecesApi.get<ApiResponse<any>>(API_CONFIG.pieces.endpoints.pieces(blockId));

    // Manejar respuesta paginada de Laravel
    const responseData = response.data;

    if (!responseData || !responseData.data) {
      console.warn('Backend returned no pieces data:', response.data);
      return [];
    }

    // Si es paginado (estructura Laravel), extraer los datos del array
    if (responseData.data && Array.isArray(responseData.data.data)) {
      console.log('Pieces fetched (paginated):', responseData.data.data.length, 'pieces');
      return responseData.data.data;
    }

    // Si es array directo (fallback)
    if (Array.isArray(responseData.data)) {
      console.log('Pieces fetched (direct):', responseData.data.length, 'pieces');
      return responseData.data;
    }

    console.warn('Backend returned invalid pieces data:', responseData);
    return [];
  } catch (error) {
    console.error('Error fetching pieces:', error);
    throw error;
  }
};

export const createPiece = async (
  blockId: string,
  data: { peso_teorico: number; peso_real?: number }
): Promise<Piece> => {
  try {
    const response = await piecesApi.post<ApiResponse<Piece>>(
      API_CONFIG.pieces.endpoints.createPiece(blockId),
      data
    );

    const pieceData = response.data?.data;

    // Validación robusta de la respuesta
    if (!pieceData || typeof pieceData !== 'object') {
      console.error('Backend returned invalid piece data:', response.data);
      throw new Error('El backend devolvió datos de pieza inválidos');
    }

    // Validar estructura mínima requerida
    if (!('id' in pieceData) || !('peso_teorico' in pieceData)) {
      console.error('Piece missing required fields:', pieceData);
      throw new Error('La pieza creada no tiene los campos requeridos');
    }

    return pieceData;
  } catch (error: any) {
    console.error('Error creating piece:', error);
    throw new Error(extractApiError(error));
  }
};

/**
 * Updates an existing piece.
 */
export const updatePiece = async (
  id: number,
  data: { peso_teorico: number; peso_real?: number }
): Promise<Piece> => {
  try {
    console.log('Updating piece:', { id, data });
    const response = await piecesApi.put<ApiResponse<Piece>>(`/pieces/${id}`, data);

    console.log('Update response:', response.data);

    const pieceData = response.data?.data;

    if (!pieceData || typeof pieceData !== 'object') {
      console.error('Backend returned invalid piece data:', response.data);
      throw new Error('El backend devolvió datos de pieza inválidos');
    }

    if (!('id' in pieceData) || !('peso_teorico' in pieceData)) {
      console.error('Piece missing required fields:', pieceData);
      throw new Error('La pieza actualizada no tiene los campos requeridos');
    }

    console.log('Piece updated successfully:', pieceData);
    return pieceData;
  } catch (error: any) {
    console.error('Error updating piece:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw new Error(extractApiError(error));
  }
};

/**
 * Deletes a piece.
 */
export const deletePiece = async (id: number): Promise<void> => {
  try {
    await piecesApi.delete(`/pieces/${id}`);
  } catch (error: any) {
    console.error('Error deleting piece:', error);
    throw new Error(extractApiError(error));
  }
};
