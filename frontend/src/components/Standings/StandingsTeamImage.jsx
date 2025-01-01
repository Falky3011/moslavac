import React from 'react';
import { Spin } from 'antd';
import { useGetCometImage } from '../../hooks/useGetCometImage';

export const StandingsTeamImage = ({ picture, teamName }) => {
    const { data: imageData, error: imageError, isLoading: imageIsLoading } = useGetCometImage(picture);

    if (imageIsLoading) return <Spin size="small" />;
    if (imageError) return <span className="text-red-500">!</span>;

    return (
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {imageData ? (
                <img src={imageData} alt={`${teamName} logo`} className="w-full h-full object-cover" />
            ) : (
                <span className="text-gray-500 text-xs md:text-sm font-bold">{teamName.slice(0, 2).toUpperCase()}</span>
            )}
        </div>
    );
};

