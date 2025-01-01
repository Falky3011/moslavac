import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';
const useAddNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newNews) => {
            const response = await apiClient.post('/api/news', {
                title: newNews.title,
                content: newNews.content,
            });

            if (newNews.thumbnail) {
                const formData = new FormData();
                formData.append('thumbnail', newNews.thumbnail);
                await apiClient.put(`/api/news/thumbnail/${response.data.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            if (newNews.files && newNews.files.length > 0) {
                const formData = new FormData();
                newNews.files.forEach((file) => formData.append('files', file));
                await apiClient.put(`/api/news/photos/${response.data.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export default useAddNews;
