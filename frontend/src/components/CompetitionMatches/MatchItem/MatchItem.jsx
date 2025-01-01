import React from 'react';
import { Link } from 'react-router-dom';
import { List, Typography } from 'antd';
import TeamInfo from './TeamInfo';
import { formatDateTime } from '../../../utils/dateUtils';

const MatchItem = ({ match }) => {
    const matchDateTime = formatDateTime(match.dateTimeUTC);

    return (
        <List.Item>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0">
                {/* Match Details */}
                <div className="w-full sm:w-1/4 text-center sm:text-left text-gray-600">
                    <Typography.Text className="font-semibold">
                        <span className="block">Kolo {match.round}</span>
                        <span className="block">{matchDateTime.date}</span>
                        <span className="block">{matchDateTime.time}</span>
                    </Typography.Text>
                </div>

                {/* Teams and Result */}
                <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-1/2 space-y-2 sm:space-y-0">
                    <TeamInfo team={match.homeTeam} align="end" isHome />
                    <Typography.Text className="mx-2 font-bold text-center w-16 sm:w-1/5">
                        {match.homeTeamResult?.current !== undefined && match.awayTeamResult?.current !== undefined ? (
                            <span>{match.homeTeamResult.current} - {match.awayTeamResult.current}</span>
                        ) : (
                            <span>VS</span>
                        )}
                    </Typography.Text>
                    <TeamInfo team={match.awayTeam} align="start" />
                </div>

                {/* Details Link */}
                <div className="w-full sm:w-1/4 text-center sm:text-right">
                    {match.liveStatus === 'PLAYED' && (
                        <Link
                            to={`/matches/${match.id}`}
                            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase rounded-lg hover:bg-blue-700 hover:shadow-md transition duration-200"
                        >
                            Detalji
                        </Link>
                    )}
                </div>
            </div>
        </List.Item>
    );
};

export default MatchItem;
