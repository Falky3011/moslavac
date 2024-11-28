import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetUpcomingMatches = () => {
    return useQuery({
        queryKey: ['upcomingMatches'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/api/matches/upcoming');
            return response.data;
        },
    });
};
