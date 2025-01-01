import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetTeamStandings(competitionId) {
    return useQuery({
        queryKey: ['teamStandings', competitionId],
        queryFn: async () => {
            if (!competitionId) return null;
            const response = await apiClient.get(`/api/competition/${competitionId}/standings`);
            return response.data;
        },
        enabled: !!competitionId,
    });
}
