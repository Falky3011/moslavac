import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useUpdateNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedNews) => {
            const formData = new FormData();
            formData.append('title', updatedNews.title);
            formData.append('content', updatedNews.content);

            if (updatedNews.thumbnail) {
                formData.append('thumbnail', updatedNews.thumbnail);
            }

            if (updatedNews.files && updatedNews.files.length > 0) {
                updatedNews.files.forEach((file) => formData.append('files', file));
            }

            const response = await axios.put(
                `http://localhost:8080/api/news/${updatedNews.newsID}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export default useUpdateNews;
