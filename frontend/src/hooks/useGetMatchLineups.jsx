import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetMatchLineups(matchId) {
    return useQuery({
        queryKey: ['matchLineups', matchId],
        queryFn: async () => {
            const response = await apiClient.get(`/api/match/${matchId}/lineups`);
            return response.data;
        },
        enabled: !!matchId,
    });
}
