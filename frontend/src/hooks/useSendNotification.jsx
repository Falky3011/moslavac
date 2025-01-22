import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const sendNotification = async (notificationData) => {
  const response = await apiClient.post(
    "/api/notifications/send",
    notificationData
  );
  return response.data;
};

export default function useSendNotification() {
  return useMutation({
    mutationFn: sendNotification,
    onSuccess: () => {},
    onError: (error) => {
      console.error(
        "Failed to send notification:",
        error.response?.data?.message || error.message
      );
    },
  });
}
