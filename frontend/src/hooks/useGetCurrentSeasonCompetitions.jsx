import { useQuery } from '@tanstack/react-query';

export function useGetCurrentSeasonCompetitions() {
    return useQuery({
        queryKey: ['currentSeasonCompetitions'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/current-season-competitions', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Problem with fetching competitions');
            }

            const data = await response.json();

            // Filtriranje prema tekućoj sezoni
            const currentYear = new Date().getFullYear() % 100;
            const nextYear = (currentYear + 1) % 100;
            const seasonPattern = new RegExp(`\\b${currentYear}/${nextYear}\\b`);

            return data.filter(comp => seasonPattern.test(comp.name) && !/\bkup\b/i.test(comp.name));
        },
    });
}
