import { useQuery } from '@tanstack/react-query';

const fetchMatchesFromBackend = async (competitionId) => {
    const response = await fetch(`http://localhost:8080/api/competition/${competitionId}/matches`);
    if (!response.ok) {
        throw new Error('Error fetching matches from backend');
    }
    return await response.json();
};

const useGetAllCompetitionMatches = (competitionId) => {
    return useQuery({
        queryKey: ['allMatches', competitionId],
        queryFn: () => fetchMatchesFromBackend(competitionId),
    });
};

export default useGetAllCompetitionMatches;
