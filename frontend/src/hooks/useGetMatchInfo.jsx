import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetMatchInfo(matchId) {
    return useQuery({
        queryKey: ['matchInfo', matchId],
        queryFn: async () => {
            const response = await apiClient.get(`/api/match/${matchId}`);
            return response.data;
        },
        enabled: !!matchId,
    });
}
