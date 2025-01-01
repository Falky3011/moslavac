import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetPlayerDetails(personId) {
    return useQuery({
        queryKey: ['playerDetails', personId],
        queryFn: async () => {
            if (!personId) {
                throw new Error('Invalid personId');
            }
            const response = await apiClient.get(`/api/player-details/${personId}`);
            return response.data;
        },
        enabled: !!personId,
    });
}
