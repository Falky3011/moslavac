import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const useGetCompetitionRedCardsStats = (competitionId) => {
  return useQuery({
    queryKey: ["competitionRedCardsStats", competitionId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/competition/${competitionId}/stats/redCards`
      );
      return response.data;
    },
    enabled: !!competitionId,
  });
};

export default useGetCompetitionRedCardsStats;
