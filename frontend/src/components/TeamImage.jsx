import React from 'react';
import { Spin, Alert } from 'antd';
import { useGetCometImage } from '../hooks/useGetCometImage';

const TeamImage = ({ picture, teamName }) => {
    const { data, error, isLoading } = useGetCometImage(picture);

    if (isLoading) return <Spin size="small" />;
    if (error) return <Alert message="Error" description={error.message} type="error" />;

    return (
        <div className="flex items-center">
            <img src={data} alt={teamName} className="w-12 h-12 object-contain" />
        </div>
    );
};

export default TeamImage;
