import { useQuery } from '@tanstack/react-query';

const API_KEY = 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97';

const fetchPastMatches = async () => {
    const response = await fetch(
        'https://api-hns.analyticom.de/api/live/team/1337/matches/paginated/past/2?page=1&pageSize=75&teamIdFilter=1337',
        {
            headers: {
                accept: 'application/json',
                API_KEY: API_KEY,
            },
        }
    );
    if (!response.ok) {
        throw new Error('Error fetching past matches');
    }
    return response.json();
};

const fetchFutureMatches = async () => {
    const response = await fetch(
        'https://api-hns.analyticom.de/api/live/team/1337/matches/paginated/future/2?page=1&pageSize=75&teamIdFilter=1337',
        {
            headers: {
                accept: 'application/json',
                API_KEY: API_KEY,
            },
        }
    );
    if (!response.ok) {
        throw new Error('Error fetching future matches');
    }
    return response.json();
};

const useGetAllMatches = () => {
    return useQuery({
        queryKey: ['allMatches'],
        queryFn: async () => {
            const [pastMatches, futureMatches] = await Promise.all([
                fetchPastMatches(),
                fetchFutureMatches(),
            ]);
            return [...pastMatches.result, ...futureMatches.result];
        },
    });
};

export default useGetAllMatches;
