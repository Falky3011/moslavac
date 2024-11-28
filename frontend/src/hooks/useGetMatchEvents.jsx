import { useQuery } from '@tanstack/react-query';

export function useGetMatchEvents(matchId) {
    return useQuery({
        queryKey: ['matchEvents', matchId],
        queryFn: () =>
            fetch(`http://localhost:8080/api/match/${matchId}/events`, { // vaš backend API URL
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching match events');
                }
                return res.json();
            }),
        enabled: !!matchId,
    });
}
