import React from 'react';
import { useGetNextMatch } from '../hooks/useGetNextMatch';
import { useGetPreviousMatch } from '../hooks/useGetPreviousMatch';
import Match from './Match';
import { Link } from 'react-router-dom';

function PreviousAndNextMatch() {
    const { data: nextMatch, error: nextMatchError, isLoading: nextMatchIsLoading } = useGetNextMatch();
    const { data: previousMatch, error: previousMatchError, isLoading: previousMatchIsLoading } = useGetPreviousMatch();

    if (nextMatchIsLoading || previousMatchIsLoading) return <div className="text-center py-8">Loading...</div>;
    if (nextMatchError || previousMatchError) return <div className="text-center py-8 text-red-500">Error loading matches</div>;

    const todayMatch = previousMatch?.dateTimeUTC &&
        new Date(previousMatch.dateTimeUTC).toDateString() === new Date().toDateString()
        ? "Današnja utakmica"
        : "Prethodna utakmica";

    const matchesCount = [previousMatch, nextMatch].filter(Boolean).length;

    return (
        <div
            className={`flex ${matchesCount === 1 ? 'justify-center' : 'justify-between'
                } flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto px-4`}
        >
            {previousMatch && (
                <Link to={`/matches/${previousMatch.id}`} className="w-full md:w-1/2">
                    <Match
                        match={todayMatch}
                        homeTeam={previousMatch.homeTeam || { name: "N/A", picture: "" }}
                        awayTeam={previousMatch.awayTeam || { name: "N/A", picture: "" }}
                        date={previousMatch.dateTimeUTC ? new Date(previousMatch.dateTimeUTC) : new Date()}
                        location={previousMatch.facility?.place || "N/A"}
                        homeScore={previousMatch.homeTeamResult?.current || 0}
                        awayScore={previousMatch.awayTeamResult?.current || 0}
                        liveStatus={previousMatch.liveStatus || "SCHEDULED"}
                    />
                </Link>
            )}
            {nextMatch && (
                <Link to={`/matches/${nextMatch.id}`} className="w-full md:w-1/2">
                    <Match
                        match="Sljedeća utakmica"
                        homeTeam={nextMatch.homeTeam || { name: "N/A", picture: "" }}
                        awayTeam={nextMatch.awayTeam || { name: "N/A", picture: "" }}
                        date={nextMatch.dateTimeUTC ? new Date(nextMatch.dateTimeUTC) : new Date()}
                        location={nextMatch.facility?.place || "N/A"}
                        homeScore={null}
                        awayScore={null}
                        liveStatus={nextMatch.liveStatus || "SCHEDULED"}
                    />
                </Link>
            )}
        </div>
    );
}

export default PreviousAndNextMatch;
