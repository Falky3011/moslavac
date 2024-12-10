import { useQuery } from '@tanstack/react-query';

function useGetTeamStandingsUnoffical(competitionId) {
    return useQuery({
        queryKey: ['teamStandings', competitionId],
        queryFn: async () => {
            if (!competitionId) return null; // Vrati null ako nema competitionId

            const response = await fetch(
                `http://localhost:8080/api/competition/${competitionId}/standings/unofficial`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        },
        enabled: !!competitionId,
    });
}

export default useGetTeamStandingsUnoffical