import React from 'react';
import { Card, Typography, Spin, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useGetPlayerDetails } from '../hooks/useGetPlayerDetails';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export default function PlayerItem({ playerId, competitionId }) {
    const { data: playerDetails, isLoading, isError } = useGetPlayerDetails(playerId);
    const { data: playerImage, isLoading: imageLoading } = useGetCometImage(playerDetails?.picture);

    if (isLoading || imageLoading) {
        return (
            <Card className="w-full">
                <Spin />
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full">
                <Text type="danger">Došlo je do pogreške prilikom dohvaćanja detalja o igraču.</Text>
            </Card>
        );
    }

    return (
        <Card className="w-full hover:shadow-md transition-shadow duration-300">
            <Link to={`/players/${playerId}/stats/${competitionId}`} className="flex items-center space-x-4">
                <Avatar
                    size={64}
                    src={playerImage}
                    icon={<UserOutlined />}
                    alt={playerDetails.name}
                />
                <div>
                    <Title level={5} className="m-0">
                        {playerDetails.name}
                    </Title>
                    <Text type="secondary">Godine: {playerDetails.age}</Text>
                </div>
            </Link>
        </Card>
    );
}
