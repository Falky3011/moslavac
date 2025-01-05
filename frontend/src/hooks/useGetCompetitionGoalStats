import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const useGetCompetitionGoalsStats = (competitionId) => {
  return useQuery({
    queryKey: ["competitionGoalsStats", competitionId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/competition/${competitionId}/stats/goals`
      );
      return response.data;
    },
    enabled: !!competitionId,
  });
};

export default useGetCompetitionGoalsStats;
