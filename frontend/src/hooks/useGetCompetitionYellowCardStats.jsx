import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const useGetCompetitionYellowCardsStats = (competitionId) => {
  return useQuery({
    queryKey: ["competitionYellowCardsStats", competitionId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/competition/${competitionId}/stats/yellowCards`
      );
      return response.data;
    },
    enabled: !!competitionId,
  });
};

export default useGetCompetitionYellowCardsStats;
