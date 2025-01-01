import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export const useGetUpcomingMatches = () => {
    return useQuery({
        queryKey: ['upcomingMatches'],
        queryFn: async () => {
            const response = await apiClient.get('/api/matches/upcoming');
            return response.data;
        },
    });
};
