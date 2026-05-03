import { useQuery } from '@tanstack/react-query';
import { fetchReports } from './api';

export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });
};
