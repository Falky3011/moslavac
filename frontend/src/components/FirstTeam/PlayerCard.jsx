import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetCometImage } from '../../hooks/useGetCometImage';

const PlayerCard = ({ player, isAdmin, onRemove, competition }) => {
    const { data: playerImage, isLoading } = useGetCometImage(player.picture);

    return (
        <div className="w-36 m-2 bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
            <Link to={`/stats/${player.personId}`} state={{ competition }}>
                <div className="relative h-36 bg-gray-200">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
                        </div>
                    ) : playerImage ? (
                        <img
                            src={playerImage}
                            alt={player.shortName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <UserOutlined className="text-4xl text-gray-400" />
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-2 text-center">
                <Link
                    to={`/stats/${player.personId}`}
                    state={{ competition }}
                    className="text-sm font-semibold text-gray-800 hover:underline"
                >
                    {player.shortName}
                </Link>
                {isAdmin && (
                    <DeleteOutlined
                        className="text-red-500 cursor-pointer mt-2"
                        onClick={() => onRemove(player.id)}
                    />
                )}
            </div>
        </div>
    );
};

export default PlayerCard;
