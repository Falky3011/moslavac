import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export function useValidateAdminPassword() {
  return useMutation({
    mutationFn: async (password) => {
      const response = await apiClient.post("/api/admin/validate-password", {
        password,
      });
      return response.data;
    },
  });
}
