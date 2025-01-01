import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

const useGetNews = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const response = await apiClient.get('/api/news');
            return response.data.content;
        },
    });
};

export default useGetNews;
