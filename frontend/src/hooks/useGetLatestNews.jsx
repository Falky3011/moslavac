import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export const useGetLatestNews = () => {
    return useQuery({
        queryKey: ['latestNews'],
        queryFn: async () => {
            const response = await apiClient.get('/api/news/latest');
            return response.data;
        },
    });
};
