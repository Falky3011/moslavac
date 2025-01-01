import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetMatchEvents(matchId) {
    return useQuery({
        queryKey: ['matchEvents', matchId],
        queryFn: async () => {
            const response = await apiClient.get(`/api/match/${matchId}/events`);
            return response.data;
        },
        enabled: !!matchId,
    });
}
