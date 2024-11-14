import React from 'react';
import Countdown from './Countdown';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { FireFilled } from '@ant-design/icons';

function Match({ match, homeTeam, awayTeam, date, location, homeScore, awayScore, liveStatus }) {
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
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 text-center min-w-96 w-[28rem] mx-auto shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                {match === "Današnja utakmica" && <FireFilled style={{ color: '#FF5722', fontSize: '1.5rem' }} />}
                {match}
            </h2>

            {/* Timovi */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-center">
                    <img src={homeTeamImage} alt={`${homeTeam.name} logo`} className="h-16 w-16 mb-2" />
                    <span className="font-semibold text-gray-700">{homeTeam.name}</span>
                </div>
                <div className="text-gray-400 font-bold text-lg">VS</div>
                <div className="flex flex-col items-center">
                    <img src={awayTeamImage} alt={`${awayTeam.name} logo`} className="h-16 w-16 mb-2" />
                    <span className="font-semibold text-gray-700">{awayTeam.name}</span>
                </div>
            </div>

            {/* Datum, vrijeme, lokacija */}
            <div className="mb-4 text-gray-500">
                <p className="font-medium">{matchDateAndTime.date}</p>
                <p>{matchDateAndTime.time}</p>
                <p className="text-sm">{location}</p>
            </div>

            {/* Rezultat ili odbrojavanje */}
            <div className="bg-gray-200 py-2 px-4 rounded-md text-lg font-bold text-gray-800 border border-gray-200">
                {liveStatus === "PLAYED" ? (
                    <>
                        {homeScore} - {awayScore}
                    </>
                ) : (
                    <Countdown targetDate={date} />
                )}
            </div>
        </div>
    );
}

export default Match;
