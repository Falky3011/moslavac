import React from 'react'
import { FaFutbol } from 'react-icons/fa'
import { Typography } from 'antd'
import { useGetCometImage } from '../hooks/useGetCometImage'
const { Title, Text } = Typography

const GoalEvent = ({ event, isMoslavacEvent, isOwnGoal }) => {
    const playerImage = useGetCometImage(event.player.picture);
    const formatEventTime = (minuteFull, stoppageTime) => {
        return stoppageTime ? `${minuteFull}+${stoppageTime}` : `${minuteFull}'`
    }

    return (
        <div className={`w-full flex items-center  p-4 rounded-lg ${isMoslavacEvent ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <FaFutbol
                className={`
                ${isOwnGoal ? 'text-red-500' : isMoslavacEvent ? 'text-blue-500 text-2xl' : 'text-gray-500'} 
                ${isMoslavacEvent && isOwnGoal ? 'text-2xl' : ''} 
                mr-4
            `} />
            {playerImage && isMoslavacEvent && (
                <img src={playerImage.data} alt={event.player.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
            )}
            <div>
                <Text strong style={{ color: isMoslavacEvent ? '#1890ff' : 'rgba(0, 0, 0, 0.45)' }} className="text-lg">
                    {event.player.name} {formatEventTime(event.minuteFull, event.stoppageTime)}
                </Text>
            </div>
        </div>
    )
}

export default GoalEvent
