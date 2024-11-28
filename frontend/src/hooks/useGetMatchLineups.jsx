import { useQuery } from '@tanstack/react-query';

export function useGetMatchLineups(matchId) {
    return useQuery({
        queryKey: ['matchLineups', matchId],
        queryFn: () =>
            fetch(`http://localhost:8080/api/match/${matchId}/lineups`, { // Backend URL
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching match lineups');
                }
                return res.json();
            }),
        enabled: !!matchId, // Only run query if matchId is provided
    });
}
