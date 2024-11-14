import { useQuery } from '@tanstack/react-query';

export function useGetCompetitionPlayers(competitionId) {
    return useQuery({
        queryKey: ['teamPlayers', competitionId],
        queryFn: async () => {
            // 1. Dohvati sve odigrane utakmice
            const matchesResponse = await fetch(`https://api-hns.analyticom.de/api/live/competition/${competitionId}/matches/paginated/past/2/1337?page=1&pageSize=75&teamIdFilter=1337`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'API_KEY': 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97'
                }
            });
            const matchesData = await matchesResponse.json();

            // 2. Provjeri jesu li utakmice dostupne
            if (!matchesData.result || matchesData.result.length === 0) {
                return [];
            }

            // 3. Pronađi najstariju utakmicu
            const oldestMatch = matchesData.result.reduce((oldest, match) => {
                const matchDate = new Date(match.date);
                return !oldest || matchDate < new Date(oldest.date) ? match : oldest;
            }, null);

            // 4. Provjeri postoji li najstarija utakmica
            if (!oldestMatch) {
                return [];
            }

            // 5. Provjeri je li Moslavac domaći ili gostujući tim
            const isHomeTeam = oldestMatch.homeTeam.id === 1337; // ID za Moslavac
            const isAwayTeam = oldestMatch.awayTeam.id === 1337; // ID za Moslavac

            // 6. Dohvati postave za najstariju utakmicu
            const lineupsResponse = await fetch(`https://api-hns.analyticom.de/api/live/match/${oldestMatch.id}/lineups?teamIdFilter=1337`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'API_KEY': 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97'
                }
            });
            const lineupsData = await lineupsResponse.json();

            // 7. Prikupi igrače iz postava
            const players = new Set(); // Koristi Set za uklanjanje duplikata

            if (isHomeTeam) {
                const homeTeamPlayers = lineupsData.home.players || [];
                homeTeamPlayers.forEach(player => {
                    players.add(player); // Dodaj cijeli objekt igrača u Set
                });
            } else if (isAwayTeam) {
                const awayTeamPlayers = lineupsData.away.players || [];
                awayTeamPlayers.forEach(player => {
                    players.add(player); // Dodaj cijeli objekt igrača u Set
                });
            }

            // 8. Pretvori Set u Array
            return Array.from(players);
        }
    });
}
