import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetNextMatch() {
    return useQuery({
        queryKey: ['nextMatch'],
        queryFn: async () => {
            const response = await apiClient.get('/api/senior-competition/next-match');
            return response.data;
        },
    });
}
