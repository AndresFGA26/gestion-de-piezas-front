import { piecesApi } from '../../lib/apiClient';
import type { ApiResponse } from '../../lib/apiClient';
import type { ReportData } from '../../types';

export const fetchReports = async (): Promise<ReportData> => {
  const response = await piecesApi.get<ApiResponse<ReportData>>('/reports/pieces');
  return response.data.data;
};
