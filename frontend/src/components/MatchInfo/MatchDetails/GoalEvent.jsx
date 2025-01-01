import React from 'react';
import { FaFutbol } from 'react-icons/fa';
import { useGetCometImage } from '../../../hooks/useGetCometImage';
import { formatEventTime, renderPlayerName } from '../../../utils/eventUtils';

const GoalEvent = ({ event, isMoslavacEvent, isOwnGoal, competition }) => {
    const { data: playerImage } = useGetCometImage(event.player?.picture);

    return (
        <div
            className={`w-auto flex items-center p-3 rounded-lg 
            ${isMoslavacEvent ? 'bg-blue-100' : 'bg-gray-100'}`}
        >
            <FaFutbol
                className={`mr-4 ${isOwnGoal ? 'text-red-500' :
                    isMoslavacEvent ? 'text-blue-500 text-2xl' : 'text-gray-500 text-xl'
                    }`}
            />
            {playerImage && isMoslavacEvent && (
                <img
                    src={playerImage}
                    alt={event.player?.name || 'Player'}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                />
            )}
            <div>
                <span
                    className={`font-semibold ${isMoslavacEvent ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    {renderPlayerName(event.player, isMoslavacEvent, competition)} {formatEventTime(event.minuteFull, event.stoppageTime)}
                </span>
            </div>
        </div>
    );
};

export default GoalEvent;
