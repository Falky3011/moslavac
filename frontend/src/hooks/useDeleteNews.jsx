import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => apiClient.delete(`/api/news/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export default useDeleteNews;
