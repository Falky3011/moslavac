import React from 'react'
import { FaFutbol } from 'react-icons/fa'
import { Typography } from 'antd'
import { useGetCometImage } from '../hooks/useGetCometImage'
import { Link } from 'react-router-dom'

const { Text } = Typography

const GoalEvent = ({ event, isMoslavacEvent, isOwnGoal, competition }) => {
    const { data: playerImage } = useGetCometImage(event.player.picture);

    const formatEventTime = (minuteFull, stoppageTime) => {
        return stoppageTime ? `${minuteFull}+${stoppageTime}` : `${minuteFull}'`
    }

    const renderPlayerName = () => {
        if (isMoslavacEvent) {
            return (
                <Link to={`/stats/${event.player.personId}`} state={{ competition }}>
                    {event.player.name}
                </Link>
            );
        }
        return event.player.name;
    }

    return (
        <div className={`w-full flex items-center p-2 sm:p-4 rounded-lg ${isMoslavacEvent ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <FaFutbol
                className={`
                    ${isOwnGoal ? 'text-red-500' : isMoslavacEvent ? 'text-blue-500 text-xl sm:text-2xl' : 'text-gray-500'} 
                    ${isMoslavacEvent && isOwnGoal ? 'text-xl sm:text-2xl' : ''} 
                    mr-2 sm:mr-4
                `}
            />
            {playerImage && isMoslavacEvent && (
                <img src={playerImage} alt={event.player.name} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-4 object-cover" />
            )}
            <div>
                <Text strong style={{ color: isMoslavacEvent ? '#1890ff' : 'rgba(0, 0, 0, 0.45)' }} className="text-sm sm:text-lg">
                    {renderPlayerName()} {formatEventTime(event.minuteFull, event.stoppageTime)}
                </Text>
            </div>
        </div>
    )
}

export default GoalEvent