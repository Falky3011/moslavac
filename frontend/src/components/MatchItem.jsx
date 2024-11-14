import React from 'react';
import { Link } from 'react-router-dom';
import { List, Typography } from 'antd';
import TeamImage from './TeamImage';

const MatchItem = ({ match }) => {
    return (
        <List.Item>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-2 sm:space-y-0">
                <div className="flex-1 text-center sm:text-left text-gray-600">
                    <Typography.Text className="font-semibold">
                        Kolo {match.round} <br />
                        {new Date(match.dateTimeUTC).toLocaleDateString()} <br />
                        {new Date(match.dateTimeUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography.Text>
                </div>
                <div className="flex flex-1 flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0">
                    <div className="flex items-center sm:justify-end flex-1">
                        <Typography.Text className="text-gray-800 font-bold text-center sm:text-left text-sm sm:text-base mr-2 break-words">
                            {match.homeTeam.name}
                        </Typography.Text>
                        <TeamImage picture={match.homeTeam.picture} teamName={match.homeTeam.name} />
                    </div>
                    <Typography.Text className="mx-2 font-bold text-center w-16 sm:w-20">
                        {match.homeTeamResult?.current !== undefined && match.awayTeamResult?.current !== undefined ? (
                            <span>{match.homeTeamResult.current} - {match.awayTeamResult.current}</span>
                        ) : (
                            <span>VS</span>
                        )}
                    </Typography.Text>
                    <div className="flex items-center sm:justify-start flex-1">
                        <TeamImage picture={match.awayTeam.picture} teamName={match.awayTeam.name} />
                        <Typography.Text className="text-gray-800 font-bold text-center sm:text-left text-sm sm:text-base ml-2 break-words">
                            {match.awayTeam.name}
                        </Typography.Text>
                    </div>
                </div>
                <div className="flex-1 text-center sm:text-right">
                    {match.liveStatus === 'PLAYED'
                        &&
                        < Link to={`/matches/${match.id}`} className="text-blue-600 hover:underline uppercase font-bold">
                            Detalji
                        </Link>
                    }
                </div>
            </div>
        </List.Item >
    );
};

export default MatchItem;
