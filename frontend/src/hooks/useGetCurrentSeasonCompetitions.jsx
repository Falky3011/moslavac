import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetCurrentSeasonCompetitions() {
    return useQuery({
        queryKey: ['currentSeasonCompetitions'],
        queryFn: async () => {
            const response = await apiClient.get('/api/current-season-competitions');
            const currentYear = new Date().getFullYear() % 100;
            const nextYear = (currentYear + 1) % 100;
            const seasonPattern = new RegExp(`\\b${currentYear}/${nextYear}\\b`);

            return response.data.filter(
                (comp) => seasonPattern.test(comp.name) && !/\bkup\b/i.test(comp.name)
            );
        },
    });
}
