import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

/**
 * Dohvaća agregat glasova za zadani matchId.
 * Vraća objekt: { homeCount, drawCount, awayCount }
 */
const useVoteAggregate = (matchId) => {
  return useQuery({
    queryKey: ["voteAggregate", matchId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/matches/${matchId}/votes`);
      return response.data;
      // npr. { homeCount: number, drawCount: number, awayCount: number }
    },
    // Ovdje po želji možeš dodati refetchInterval, staleTime itd.
  });
};

export default useVoteAggregate;
