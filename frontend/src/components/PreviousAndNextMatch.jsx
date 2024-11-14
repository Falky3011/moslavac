import { useGetNextMatch } from '../hooks/useGetNextMatch';
import { useGetPreviousMatch } from '../hooks/useGetPreviousMatch';
import Match from './Match';
import { Link } from 'react-router-dom';

function PreviousAndNextMatch() {
    const { data: nextMatch, error: nextMatchError, isLoading: nextMatchIsLoading } = useGetNextMatch();
    const { data: previousMatch, error: previousMatchError, isLoading: previousMatchIsLoading } = useGetPreviousMatch();

    if (nextMatchIsLoading || previousMatchIsLoading) return <div>Loading...</div>;
    if (nextMatchError || previousMatchError) return <div>Error loading matches</div>;

    const todayMatch = previousMatch?.dateTimeUTC &&
        new Date(previousMatch.dateTimeUTC).toDateString() === new Date().toDateString()
        ? "Današnja utakmica"
        : "Prethodna utakmica";

    return (
        <div className="flex justify-between flex-wrap my-28 w-full max-w-5xl mx-auto">
            <Link to={`/matches/${previousMatch?.id}`} className="w-1/2">
                <Match
                    match={todayMatch}
                    homeTeam={previousMatch?.homeTeam || "N/A"}
                    awayTeam={previousMatch?.awayTeam || "N/A"}
                    date={new Date(previousMatch?.dateTimeUTC)}
                    location={previousMatch?.facility.place || "N/A"}
                    homeScore={previousMatch?.homeTeamResult?.current || 0}
                    awayScore={previousMatch?.awayTeamResult?.current || 0}
                    liveStatus={previousMatch?.liveStatus || "SCHEDULED"}
                />
            </Link>

            <Link to={`/matches/${nextMatch?.id}`} className="w-1/2">
                <Match
                    match="Sljedeća utakmica"
                    homeTeam={nextMatch?.homeTeam || "N/A"}
                    awayTeam={nextMatch?.awayTeam || "N/A"}
                    date={new Date(nextMatch?.dateTimeUTC)}
                    location={nextMatch?.facility.place || "N/A"}
                    homeScore={null}
                    awayScore={null}
                    liveStatus={nextMatch?.liveStatus || "SCHEDULED"}
                />
            </Link>
        </div>
    );
};

export default PreviousAndNextMatch;
