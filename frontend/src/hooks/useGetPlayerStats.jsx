import { useQuery } from '@tanstack/react-query';

const useGetPlayerStats = (personId, competitionId) => {
    const teamId = 1337; // Fiksni teamId

    return useQuery({
        queryKey: ['playerStats', personId, competitionId],
        queryFn: async () => {
            if (!personId || !competitionId) return []; // Vratite prazan niz ako nema ID-a

            const response = await fetch(`https://api-hns.analyticom.de/api/live/player/${personId}/stats/${teamId}?teamIdFilter=${teamId}`, {
                headers: {
                    accept: 'application/json',
                    API_KEY: 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            return result.find(stat => String(stat.competition.id) === String(competitionId));
        },
        enabled: !!personId && !!competitionId,
    });
};

export default useGetPlayerStats;
