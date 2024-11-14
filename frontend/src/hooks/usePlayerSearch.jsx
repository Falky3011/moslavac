import { useQuery } from '@tanstack/react-query';

const API_KEY = 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97';

const searchPlayers = async (keyword) => {
    const response = await fetch(
        `https://api-hns.analyticom.de/api/live/player/search?keyword=${encodeURIComponent(keyword)}&page=0&pageSize=100&teamIdFilter=1337`,
        {
            headers: {
                'accept': 'application/json',
                'API_KEY': API_KEY
            }
        }
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const usePlayerSearch = (keyword) => {
    return useQuery({
        queryKey: ['playerSearch', keyword],
        queryFn: () => searchPlayers(keyword),
        enabled: keyword.length > 0,
    });
};
