import React from 'react';
import Countdown from './Countdown';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { FireFilled } from '@ant-design/icons';

export default function Match({
    match,
    homeTeam,
    awayTeam,
    date,
    location,
    homeScore,
    awayScore,
    liveStatus
}) {
    const { data: homeTeamImage } = useGetCometImage(homeTeam.picture);
    const { data: awayTeamImage } = useGetCometImage(awayTeam.picture);

    const formatDate = (dateString) => {
        if (!dateString) return { date: "N/A", time: "N/A" };
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        };
    };

    const matchDateAndTime = formatDate(date);

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-4 sm:p-6 text-center w-full max-w-[28rem] mx-auto shadow-md transition-all duration-300 hover:shadow-md hover:border-gray-300 flex flex-col justify-between min-h-[400px]">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                {match === "Današnja utakmica" && <FireFilled style={{ color: '#FF3B30', fontSize: '1.25rem' }} />}
                {match}
            </h2>

            {/* Teams */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center w-2/5">
                    <div className="bg-white p-2 rounded-full shadow-md mb-2">
                        <img
                            src={homeTeamImage}
                            alt={`${homeTeam.name} logo`}
                            className="h-12 w-12 sm:h-16 sm:w-16"
                        />
                    </div>
                    <span className="font-semibold text-gray-800 text-xs sm:text-sm text-center line-clamp-2">{homeTeam.name}</span>
                </div>
                <div className="flex-shrink-0 text-gray-400 font-bold text-xl sm:text-2xl">
                    VS
                </div>
                <div className="flex flex-col items-center w-2/5">
                    <div className="bg-white p-2 rounded-full shadow-md mb-2">
                        <img
                            src={awayTeamImage}
                            alt={`${awayTeam.name} logo`}
                            className="h-12 w-12 sm:h-16 sm:w-16"
                        />
                    </div>
                    <span className="font-semibold text-gray-800 text-xs sm:text-sm text-center line-clamp-2">{awayTeam.name}</span>
                </div>
            </div>

            {/* Date, time, location */}
            <div className="mb-4 text-gray-600">
                <p className="font-medium text-sm sm:text-base">{matchDateAndTime.date}</p>
                <p className="text-xs sm:text-sm mt-1">{matchDateAndTime.time}</p>
                <p className="text-xs mt-2 text-gray-500">{location}</p>
            </div>

            {/* Score or countdown */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-4 rounded-full text-base sm:text-lg font-bold text-white shadow-md">
                <Countdown targetDate={date} homeScore={homeScore} awayScore={awayScore} />
            </div>
        </div>
    );
}

