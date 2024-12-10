import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useAddNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newNews) => {
            const response = await axios.post('http://localhost:8080/api/news', {
                title: newNews.title,
                content: newNews.content,
            });

            if (newNews.thumbnail) {
                const formData = new FormData();
                formData.append('thumbnail', newNews.thumbnail);
                await axios.put(
                    `http://localhost:8080/api/news/thumbnail/${response.data.newsID}`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            }

            if (newNews.files && newNews.files.length > 0) {
                const formData = new FormData();
                newNews.files.forEach((file) => formData.append('files', file));
                await axios.put(
                    `http://localhost:8080/api/news/photos/${response.data.newsID}`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export default useAddNews;
