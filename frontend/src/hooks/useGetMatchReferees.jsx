import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetMatchReferees(matchId) {
    return useQuery({
        queryKey: ['matchReferees', matchId],
        queryFn: async () => {
            const response = await apiClient.get(`/api/match/${matchId}/referees`);
            return response.data;
        },
        enabled: !!matchId,
    });
}
