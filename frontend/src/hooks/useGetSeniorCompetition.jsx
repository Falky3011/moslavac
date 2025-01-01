import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetSeniorCompetition() {
    return useQuery({
        queryKey: ['seniorCompetition'],
        queryFn: async () => {
            const response = await apiClient.get(`/api/competition/senior`);
            return response.data;
        },
    });
}
