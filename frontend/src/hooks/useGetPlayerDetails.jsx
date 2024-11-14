import { useQuery } from '@tanstack/react-query';

export function useGetPlayerDetails(personId) {
    return useQuery({
        queryKey: ['playerDetails', personId],
        queryFn: async () => {
            // 1. Provjeri je li proslijeđen validan personId
            if (!personId) {
                throw new Error('Invalid personId');
            }

            // 2. Dohvati podatke o igraču
            const response = await fetch(`https://api-hns.analyticom.de/api/live/player/${personId}?teamIdFilter=1337`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'API_KEY': 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97'
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
        enabled: !!personId // Hook će se aktivirati samo ako personId postoji
    });
}
