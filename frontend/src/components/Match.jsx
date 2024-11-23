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
        <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 text-center w-full max-w-[28rem] mx-auto shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gray-300 flex flex-col justify-between min-h-[400px]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 flex items-center justify-center gap-2">
                {match === "Današnja utakmica" && <FireFilled style={{ color: '#FF5722', fontSize: '1.25rem' }} />}
                {match}
            </h2>

            {/* Teams */}
            <div className="flex items-center justify-center flex-1 space-x-4 mb-4">
                <div className="flex-1 text-center">
                    <img
                        src={homeTeamImage}
                        alt={`${homeTeam.name} logo`}
                        className="h-12 w-12 sm:h-16 sm:w-16 mb-2 mx-auto"
                    />
                    <span className="font-semibold text-gray-700 text-sm sm:text-base break-words">{homeTeam.name}</span>
                </div>
                <div className="flex-shrink-0 text-gray-400 font-bold text-base sm:text-lg">
                    VS
                </div>
                <div className="flex-1 text-center">
                    <img
                        src={awayTeamImage}
                        alt={`${awayTeam.name} logo`}
                        className="h-12 w-12 sm:h-16 sm:w-16 mb-2 mx-auto"
                    />
                    <span className="font-semibold text-gray-700 text-sm sm:text-base break-words">{awayTeam.name}</span>
                </div>
            </div>

            {/* Date, time, location */}
            <div className="mb-4 text-gray-500">
                <p className="font-medium text-sm sm:text-base">{matchDateAndTime.date}</p>
                <p className="text-sm">{matchDateAndTime.time}</p>
                <p className="text-xs sm:text-sm">{location}</p>
            </div>

            {/* Score or countdown */}
            <div className="bg-gray-200 py-2 px-4 rounded-3xl text-base sm:text-lg font-bold text-gray-800 border border-gray-200">
                <Countdown targetDate={date} homeScore={homeScore} awayScore={awayScore} />
            </div>
        </div>

    );
}
