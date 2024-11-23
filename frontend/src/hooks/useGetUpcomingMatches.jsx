import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGetSeniorCompetition } from './useGetSeniorCompetition';

const fetchMatches = async (url, seniorCompetitionId) => {
    const response = await axios.get(url, {
        headers: {
            accept: 'application/json',
            API_KEY: 'bd993d1e4919fd190ef3822902f81fa7a2a9f30f90a7b998f560b8ac21d4acabb62206f59cd09cac7089dbb7df709793c1b4b3a8ddf1596729eb6d5ae61d7f97',
        },
    });

    return response.data.result.filter((match) => match.competition.id !== seniorCompetitionId);
};

const fetchUpcomingMatches = async (seniorCompetitionId) => {
    const futureMatchesUrl = 'https://api-hns.analyticom.de/api/live/team/1337/matches/paginated/future/2?page=1&pageSize=7&teamIdFilter=1337';
    return fetchMatches(futureMatchesUrl, seniorCompetitionId);
};

const fetchTodayMatches = async (seniorCompetitionId) => {
    const pastMatchesUrl = 'https://api-hns.analyticom.de/api/live/team/1337/matches/paginated/past/2?page=1&pageSize=10&teamIdFilter=1337';
    const pastMatches = await fetchMatches(pastMatchesUrl, seniorCompetitionId);

    // Filter matches with a datetime in the future but still from today's date
    const now = new Date();
    return pastMatches.filter((match) => {
        const matchDate = new Date(match.dateTimeUTC);
        return (
            matchDate.toDateString() === now.toDateString() && // Same day
            matchDate > now // In the future
        );
    });
};

export const useGetUpcomingMatches = () => {
    const { data: seniorCompetition, isLoading: isCompetitionLoading } = useGetSeniorCompetition();

    return useQuery({
        queryKey: ['upcomingMatches', seniorCompetition?.id],
        queryFn: async () => {
            const [upcoming, today] = await Promise.all([
                fetchUpcomingMatches(seniorCompetition?.id),
                fetchTodayMatches(seniorCompetition?.id),
            ]);

            return [...today, ...upcoming]; // Combine today's matches and future matches
        },
        enabled: !!seniorCompetition, // Wait until seniorCompetition is available
        isCompetitionLoading, // Expose loading state for competitions
    });
};
