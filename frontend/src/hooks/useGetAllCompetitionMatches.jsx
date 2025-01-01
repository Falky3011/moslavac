import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

const fetchMatchesFromBackend = async (competitionId) => {
    const response = await apiClient.get(`/api/competition/${competitionId}/matches`);
    return response.data;
};

const useGetAllCompetitionMatches = (competitionId) => {
    return useQuery({
        queryKey: ['allMatches', competitionId],
        queryFn: () => fetchMatchesFromBackend(competitionId),
    });
};

export default useGetAllCompetitionMatches;
