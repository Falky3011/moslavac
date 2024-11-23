import React from 'react';
import { Spin } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useGetCometImage } from '../hooks/useGetCometImage';
import Countdown from './Countdown';
import { Link } from 'react-router-dom'

const UpcomingMatchItem = ({ match }) => {
    const { homeTeam, awayTeam, dateTimeUTC, competition } = match;
    const matchDate = new Date(dateTimeUTC);

    const homeTeamImage = useGetCometImage(homeTeam?.picture);
    const awayTeamImage = useGetCometImage(awayTeam?.picture);

    return (
        <div className="rounded-3xl bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out border border-gray-100 w-[300px] h-[420px] flex flex-col">
            <div className="flex flex-col h-full">
                <div className="flex flex-col p-6 h-full">
                    {/* Competition Name */}
                    <span className="sm:text-sm text-xs px-4 py-1 w-auto mx-auto mb-4 font-semibold text-blue-600 bg-blue-50 rounded-full truncate overflow-hidden text-ellipsis text-center max-w-[14rem] sm:max-w-[16rem] whitespace-nowrap">
                        <Link
                            to={`/season/${competition?.id}/${encodeURIComponent(competition?.name)}`}
                            className="hover:underline"
                        >
                            {competition?.name}
                        </Link>
                    </span>




                    {/* Team Logos and Names */}
                    <div className="flex items-center justify-center flex-1 mb-4">
                        {/* Home Team */}
                        <div className="flex-1 text-center flex flex-col items-center">
                            <img
                                src={homeTeamImage?.data || '/placeholder.svg'}
                                alt={`${homeTeam.name} logo`}
                                className="h-16 w-16 mb-2"
                            />
                            <span className="font-semibold text-gray-700 text-sm sm:text-sm break-words text-center max-w-[6rem] line-clamp-2">
                                {homeTeam.name}
                            </span>
                        </div>

                        {/* VS */}
                        <div className="flex-shrink-0 mx-4 text-gray-400 font-bold text-lg sm:text-xl flex items-center justify-center h-16">
                            VS
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 text-center flex flex-col items-center">
                            <img
                                src={awayTeamImage?.data || '/placeholder.svg'}
                                alt={`${awayTeam.name} logo`}
                                className="h-16 w-16 mb-2"
                            />
                            <span className="font-semibold text-gray-700 text-sm sm:text-sm break-words text-center max-w-[6rem] line-clamp-2">
                                {awayTeam.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Date, Time, and Countdown */}
                <div className="flex flex-col bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-t-3xl">
                    <div className="flex flex-col justify-between w-auto mx-auto text-sm text-gray-600">
                        <div className="flex items-center mb-2">
                            <CalendarOutlined className="mr-2 text-white" />
                            <span className="text-white">
                                {matchDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <ClockCircleOutlined className="mr-2 text-white" />
                            <span className="text-white">
                                {matchDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className="mt-auto pt-4">
                        <div className="py-2 px-4 font-semibold bg-gray-100 rounded-2xl text-gray-800 border border-gray-100 flex items-center justify-center text-center">
                            <Countdown targetDate={dateTimeUTC} homeScore={0} awayScore={0} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMatchItem;
