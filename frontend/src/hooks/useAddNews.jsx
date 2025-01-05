import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const useAddNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNews) => {
      const response = await apiClient.post("/api/news", {
        title: newNews.title,
        content: newNews.content,
      });

      const newsId = response.data.id;
      let thumbnailUrl = null;

      if (newNews.thumbnail) {
        const formData = new FormData();
        formData.append("thumbnail", newNews.thumbnail);

        const thumbnailResponse = await apiClient.put(
          `/api/news/thumbnail/${newsId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        thumbnailUrl = thumbnailResponse.data;
      }

      if (newNews.files && newNews.files.length > 0) {
        const formData = new FormData();
        newNews.files.forEach((file) => formData.append("files", file));

        await apiClient.put(`/api/news/photos/${newsId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      return { ...response.data, thumbnailUrl };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

export default useAddNews;
