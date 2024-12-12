import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchNewsPaginated = (currentPage, pageSize) => {
    return useQuery({
        queryKey: ['newslist', currentPage],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/news`, {
                params: {
                    page: currentPage - 1,
                    size: pageSize,
                },
            });
            if (!response.data) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        },
        keepPreviousData: true,
    });
};

export default useFetchNewsPaginated;
