import { useQuery } from '@tanstack/react-query';

export function useGetNextMatch() {
    return useQuery({
        queryKey: ['nextMatch'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8080/api/senior-competition/next-match`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch next match');
            }

            return await response.json();

        },
    });
}
