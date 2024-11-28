import { useQuery } from '@tanstack/react-query';

const useGetPlayerStats = (personId, competitionId) => {
    return useQuery({
        queryKey: ['playerStats', personId, competitionId],
        queryFn: async () => {
            if (!personId || !competitionId) return null; // Vrati null ako ID-ovi nisu dostupni

            const response = await fetch(
                `http://localhost:8080/api/player/${personId}/stats/${competitionId}`,
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        },
        enabled: !!personId && !!competitionId,
    });
};

export default useGetPlayerStats;
