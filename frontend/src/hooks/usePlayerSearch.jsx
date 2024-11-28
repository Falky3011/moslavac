import { useQuery } from '@tanstack/react-query';

export const usePlayerSearch = (keyword) => {
    return useQuery({
        queryKey: ['playerSearch', keyword],
        queryFn: async () => {
            if (!keyword || keyword.trim() === '') return []; // Ako nema ključne riječi, vrati prazan niz

            const response = await fetch(
                `http://localhost:8080/api/player/search?keyword=${encodeURIComponent(keyword)}`,
                {
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        },
        enabled: keyword.length > 0, // Omogući dohvat samo ako ima ključne riječi
    });
};
