import { useQuery } from '@tanstack/react-query';

export function useGetMatchInfo(matchId) {
    return useQuery({
        queryKey: ['matchInfo', matchId],
        queryFn: () =>
            fetch(`http://localhost:8080/api/match/${matchId}`, { // Backend URL
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching match info');
                }
                return res.json();
            }),
        enabled: !!matchId, // Only run query if matchId is provided
    });
}
