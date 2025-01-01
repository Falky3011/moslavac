import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetPreviousMatch() {
    return useQuery({
        queryKey: ['previousMatch'],
        queryFn: async () => {
            const response = await apiClient.get(`/api/senior-competition/previous-match`);
            if (!response.data) {
                throw new Error('No previous match found');
            }
            return response.data;
        },
    });
}
