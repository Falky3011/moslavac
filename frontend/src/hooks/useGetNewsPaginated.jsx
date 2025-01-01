import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

const useGetNewsPaginated = (currentPage, pageSize) => {
    return useQuery({
        queryKey: ['newslist', currentPage],
        queryFn: async () => {
            const response = await apiClient.get('/api/news', {
                params: {
                    page: currentPage - 1,
                    size: pageSize,
                },
            });
            return response.data;
        },
        keepPreviousData: true,
    });
};

export default useGetNewsPaginated;
