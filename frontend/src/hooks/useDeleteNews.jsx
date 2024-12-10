import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newsId) => axios.delete(`http://localhost:8080/api/news/${newsId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export default useDeleteNews;
