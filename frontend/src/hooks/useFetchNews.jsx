import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchNews = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/api/news');
            return response.data.content;
        },
    });
};

export default useFetchNews;
