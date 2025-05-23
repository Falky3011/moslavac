import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const useGetCompetitionInfo = (competitionId) => {
  return useQuery({
    queryKey: ["competitionInfo", competitionId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/competition/${competitionId}/info`
      );
      return response.data;
    },
    enabled: !!competitionId,
  });
};

export default useGetCompetitionInfo;
