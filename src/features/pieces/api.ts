import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { Piece } from '../../types';
import { API_CONFIG, extractApiError } from '../../config/api';

export const fetchPieces = async (blockId: string): Promise<Piece[]> => {
  try {
    const response = await piecesApi.get<ApiResponse<Piece[]>>(API_CONFIG.pieces.endpoints.pieces(blockId));

    // Validación robusta: asegura que siempre retorna un array válido
    const piecesData = response.data?.data;

    if (!Array.isArray(piecesData)) {
      console.warn('Backend returned invalid pieces data, expected array but got:', piecesData);
      
      // Si es paginación de Laravel, extraer los datos correctamente
      if (piecesData && typeof piecesData === 'object' && 'data' in piecesData) {
        const paginatedData = (piecesData as any).data;
        if (Array.isArray(paginatedData)) {
          return paginatedData;
        }
      }
      
      return [];
    }

    // Validar que cada pieza tenga la estructura correcta
    const validatedPieces = piecesData.filter(piece => 
      piece && 
      typeof piece === 'object' && 
      'id' in piece && 
      'peso_teorico' in piece
    );

    if (validatedPieces.length !== piecesData.length) {
      console.warn('Some pieces had invalid structure and were filtered out');
    }

    return validatedPieces;
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
