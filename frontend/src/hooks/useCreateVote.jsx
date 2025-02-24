import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

/**
 * Šalje glas za zadani matchId: { outcome, voterId? }
 * Nakon uspjeha invalidira ['voteAggregate', matchId] kako bi se
 * automatski osvježio broj glasova.
 */
const useCreateVote = (matchId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ outcome, voterId }) => {
      // Pošalji POST zahtjev
      await apiClient.post(`/api/matches/${matchId}/votes`, {
        outcome,
        voterId,
      });
    },
    onSuccess: () => {
      // Nakon što je glas uspješno spremljen
      // invalidiramo voteAggregate za osvježenje
      queryClient.invalidateQueries({ queryKey: ["voteAggregate", matchId] });
    },
  });
};

export default useCreateVote;
