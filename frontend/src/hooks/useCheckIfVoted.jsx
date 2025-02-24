import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

/**
 * Proverava je li (matchId, voterId) već glasao:
 * - Ako backend vrati 200, `data.hasVoted = true`
 * - Ako backend vrati 404, `data.hasVoted = false`
 * - Drugi statusi bacaju grešku (npr. 500)
 */
const useCheckIfVoted = (matchId, voterId) => {
  return useQuery({
    queryKey: ["checkIfVoted", matchId, voterId],
    // queryFn vraća objekt { hasVoted: boolean }
    queryFn: async () => {
      try {
        await apiClient.get(`/api/matches/${matchId}/votes/voter/${voterId}`);
        // Ako je uspjeh (200 OK), znači da glas postoji
        return { hasVoted: true };
      } catch (err) {
        if (err.response?.status === 404) {
          // Glas ne postoji => hasVoted = false
          return { hasVoted: false };
        }
        // Sve ostalo smatramo pravom greškom
        throw err;
      }
    },
    // Ako ne želiš automatski ponavljati upit na error, stavi:
    retry: false,
    // Po želji: cacheTime, staleTime, refetchOnWindowFocus, ...
  });
};

export default useCheckIfVoted;
