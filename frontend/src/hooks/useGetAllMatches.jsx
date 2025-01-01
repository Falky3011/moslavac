import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

const fetchMatchesFromBackend = async () => {
    const response = await apiClient.get('/api/matches');
    return response.data;
};

const useGetAllMatches = () => {
    return useQuery({
        queryKey: ['allMatches'],
        queryFn: fetchMatchesFromBackend,
    });
};

export default useGetAllMatches;
