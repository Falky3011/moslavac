import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export const useGetNewsDetail = (id) => {
    return useQuery({
        queryKey: ['newsDetail', id],
        queryFn: async () => {
            const response = await apiClient.get(`/api/news/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};
