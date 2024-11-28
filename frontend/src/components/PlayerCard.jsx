import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCometImage } from '../hooks/useGetCometImage';

const PlayerCard = ({ player, onRemove }) => {
    const { data: playerImage } = useGetCometImage(player.picture);

    return (
        <div className="relative w-36 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mx-[2px] my-4">
            <Link
                to={`/stats/${player.personId}`}
                className="block text-center">
                {playerImage ? (
                    <img
                        alt={player.name}
                        src={playerImage.image}
                        className="w-full h-36 object-cover rounded-md mb-2"
                    />
                ) : (
                    <div className="w-full h-36 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}

                <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">{player.shortName}</p>
                    <p className="text-xs text-gray-500">Age: {player.age}</p>
                </div>
            </Link>

            <button
                onClick={(e) => {
                    e.stopPropagation(); // Sprječava navigaciju na klik gumba
                    onRemove(player.personId); // Poziva funkciju za uklanjanje
                }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors duration-200"
            >
                Remove
            </button>
        </div>
    );
};

export default PlayerCard;
