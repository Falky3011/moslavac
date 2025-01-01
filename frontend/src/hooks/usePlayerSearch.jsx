import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export const usePlayerSearch = (keyword) => {
    return useQuery({
        queryKey: ['playerSearch', keyword],
        queryFn: async () => {
            if (!keyword || keyword.trim() === '') return [];
            const response = await apiClient.get(`/api/player/search`, {
                params: { keyword: keyword.trim() },
            });
            return response.data;
        },
        enabled: keyword.length > 0,
    });
};
