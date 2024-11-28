import { useQuery } from '@tanstack/react-query';

export function useGetSeniorCompetition() {
    return useQuery({
        queryKey: ['seniorCompetition'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8080/api/competition/senior`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        },
    });
}
