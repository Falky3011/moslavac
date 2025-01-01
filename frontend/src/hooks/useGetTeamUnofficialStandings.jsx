import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

function useGetTeamStandingsUnofficial(competitionId) {
    return useQuery({
        queryKey: ['teamStandingsUnofficial', competitionId],
        queryFn: async () => {
            if (!competitionId) return null;
            const response = await apiClient.get(`/api/competition/${competitionId}/standings/unofficial`);
            return response.data;
        },
        enabled: !!competitionId,
    });
}

export default useGetTeamStandingsUnofficial;
