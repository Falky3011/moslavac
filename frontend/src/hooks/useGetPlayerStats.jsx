import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

const useGetPlayerStats = (personId, competitionId) => {
    return useQuery({
        queryKey: ['playerStats', personId, competitionId],
        queryFn: async () => {
            if (!personId || !competitionId) return null;
            const response = await apiClient.get(`/api/player/${personId}/stats/${competitionId}`);
            return response.data;
        },
        enabled: !!personId && !!competitionId,
    });
};

export default useGetPlayerStats;
