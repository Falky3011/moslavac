import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export const useGetPlayers = () => {
    return useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            const { data } = await apiClient.get('/api/players');
            return data;
        },
    });
};

export const useAddPlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPlayer) => {
            const { data } = await apiClient.post('/api/players', newPlayer);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
};

export const useDeletePlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (playerId) => {
            await apiClient.delete(`/api/players/${playerId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
};
