import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';


export function useGetCurrentSeasonCompetitions() {
    return useQuery({
        queryKey: ['currentSeasonCompetitions'],
        queryFn: async () => {
            const response = await apiClient.get('/api/current-season-competitions');
            const now = new Date();
            const currentYear = now.getFullYear();
            const isAfterJune = now.getMonth() >= 6; // Lipanj je mjesec 6 (od 0)

            // Odredi trenutnu i sljedeću godinu ovisno o trenutnom mjesecu
            const startYear = isAfterJune ? currentYear : currentYear - 1;
            const endYear = startYear + 1;

            const seasonPattern = new RegExp(`\\b${startYear % 100}/${endYear % 100}\\b`);

            return response.data.filter(
                (comp) => seasonPattern.test(comp.name) && !/\bkup\b/i.test(comp.name)
            );
        },
    });
}