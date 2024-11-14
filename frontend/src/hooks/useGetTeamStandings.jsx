import { useQuery } from '@tanstack/react-query';

export function useGetTeamStandings(competitionId) {
    return useQuery({
        queryKey: ['teamStandings', competitionId],
        queryFn: () =>
            fetch(`https://api-hns.analyticom.de/api/live/competition/${competitionId}/standings/official?teamIdFilter=1337`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'API_KEY': 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97'
                }
            }).then(res => res.json()),
    });
}
