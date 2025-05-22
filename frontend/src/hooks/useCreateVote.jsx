import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const useCreateVote = (matchId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ outcome, voterId }) => {
      await apiClient.post(`/api/matches/${matchId}/votes`, {
        outcome,
        voterId,
      });
    },
    onSuccess: (_data, variables) => {
      const { voterId } = variables;
      queryClient.invalidateQueries({ queryKey: ["voteAggregate", matchId] });
      queryClient.invalidateQueries({
        queryKey: ["checkIfVoted", matchId, voterId],
      });
    },
  });
};

export default useCreateVote;
