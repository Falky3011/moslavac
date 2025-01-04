import React from 'react';
import { Card, Typography, Spin, Avatar, Alert } from 'antd';
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
            <Card className="w-full flex justify-center items-center h-24">
                <Spin size="small" tip="Učitavanje..." />
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full">
                <Alert
                    message="Greška"
                    description="Došlo je do pogreške prilikom dohvaćanja detalja o igraču."
                    type="error"
                    showIcon
                    className="rounded-lg shadow-md"
                />
            </Card>
        );
    }

    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
            <Link to={`/players/${playerId}/stats/${competitionId}`} className="flex items-center space-x-4">
                <Avatar
                    size={64}
                    src={playerImage?.image || null}
                    icon={!playerImage?.image && <UserOutlined />}
                    alt={playerDetails?.name || 'Avatar'}
                />
                <div>
                    <Title level={5} className="m-0">
                        {playerDetails?.name || 'Nepoznat igrač'}
                    </Title>
                    <Text type="secondary">
                        Godine: {playerDetails?.age || 'Nepoznato'}
                    </Text>
                </div>
            </Link>
        </Card>
    );
}