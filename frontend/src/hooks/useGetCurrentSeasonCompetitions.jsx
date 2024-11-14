import { useQuery } from '@tanstack/react-query';

export function useGetCurrentSeasonCompetitions() {
    return useQuery({
        queryKey: ['currentSeasonCompetitions'],
        queryFn: () =>
            fetch('https://api-hns.analyticom.de/api/live/competition/list/active/1337?teamIdFilter=1337', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'API_KEY': 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97'
                }
            })
                .then(res => res.json())
                .then(data => {
                    // Filtriranje prema tekućoj sezoni
                    const currentYear = new Date().getFullYear() % 100;
                    const nextYear = (currentYear + 1) % 100;
                    const seasonPattern = new RegExp(`\\b${currentYear}/${nextYear}\\b`);

                    return data.filter(comp => seasonPattern.test(comp.name) && !/\bkup\b/i.test(comp.name));
                })
    });
}
