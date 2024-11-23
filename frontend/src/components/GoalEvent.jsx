import React from 'react'
import { FaFutbol } from 'react-icons/fa'
import { useGetCometImage } from '../hooks/useGetCometImage'
import { Link } from 'react-router-dom'

const GoalEvent = ({ event, isMoslavacEvent, isOwnGoal, competition }) => {
    const { data: playerImage } = useGetCometImage(event.player.picture);

    const formatEventTime = (minuteFull, stoppageTime) => {
        return stoppageTime ? `${minuteFull}+${stoppageTime}` : `${minuteFull}'`
    }

    const renderPlayerName = () => {
        if (isMoslavacEvent) {
            return (
                <Link to={`/stats/${event.player.personId}`} state={{ competition }} className="hover:underline">
                    {event.player.name}
                </Link>
            );
        }
        return event.player.name;
    }

    return (
        <div className={`w-auto flex items-center p-3 rounded-lg ${isMoslavacEvent ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <FaFutbol
                className={`
                    ${isOwnGoal ? 'text-red-500' : isMoslavacEvent ? 'text-blue-500' : 'text-gray-500'} 
                    ${isMoslavacEvent || isOwnGoal ? 'text-2xl' : 'text-xl'} 
                    mr-4
                `}
            />
            {playerImage && isMoslavacEvent && (
                <img src={playerImage} alt={event.player.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
            )}
            <div>
                <span className={`font-semibold ${isMoslavacEvent ? 'text-blue-600' : 'text-gray-600'}`}>
                    {renderPlayerName()} {formatEventTime(event.minuteFull, event.stoppageTime)}
                </span>
            </div>
        </div>
    )
}

export default GoalEvent

