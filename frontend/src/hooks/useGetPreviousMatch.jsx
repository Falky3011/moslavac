import { useQuery } from '@tanstack/react-query';

export function useGetPreviousMatch() {
    return useQuery({
        queryKey: ['previousMatch'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8080/api/senior-competition/previous-match`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch previous match');
            }

            const data = await response.json();

            if (!data) {
                throw new Error('No previous match found');
            }

            return data;
        },
    });
}
