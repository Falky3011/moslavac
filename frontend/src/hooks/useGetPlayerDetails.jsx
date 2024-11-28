import { useQuery } from '@tanstack/react-query';

export function useGetPlayerDetails(personId) {
    return useQuery({
        queryKey: ['playerDetails', personId],
        queryFn: async () => {
            // 1. Provjeri je li proslijeđen validan personId
            if (!personId) {
                throw new Error('Invalid personId');
            }

            // 2. Dohvati podatke o igraču s backend API-ja
            const response = await fetch(`http://localhost:8080/api/player-details/${personId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    // Nema potrebe dodavati API_KEY ako je backend već konfiguriran za autentifikaciju
                }
            });

            // 3. Provjeri status odgovora
            if (!response.ok) {
                throw new Error('Failed to fetch player details');
            }

            // 4. Vrati podatke o igraču
            const playerData = await response.json();
            return playerData;
        },
        enabled: !!personId, // Hook će se aktivirati samo ako personId postoji
    });
}
