import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Spin, Alert, Typography, Progress } from 'antd';
import { UserOutlined, TrophyOutlined, ClockCircleOutlined, WarningOutlined, FieldTimeOutlined } from '@ant-design/icons';
import useGetPlayerStats from '../hooks/useGetPlayerStats';
import { useGetPlayerDetails } from '../hooks/useGetPlayerDetails';
import { useGetCometImage } from '../hooks/useGetCometImage';
import { AnimatedNumber } from './AnimatedNumber';
import { FaFutbol, FaSquareFull } from 'react-icons/fa';
import { StatCard } from './StatCard';


const { Title, Text } = Typography;



const PlayerStats = () => {
    const { playerId } = useParams();
    const location = useLocation();
    const competition = location.state?.competition;
    const { data: player } = useGetPlayerDetails(playerId);
    const { data: stats, isLoading, isError } = useGetPlayerStats(playerId, competition?.id);
    const { data: playerImage } = useGetCometImage(player?.picture);
    const { data: flagImage } = useGetCometImage(player?.flag);

    console.log(playerId)
    console.log(competition)
    console.log(stats)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-2xl mx-auto my-12 p-6">
                <Alert
                    message="Error"
                    description="Došlo je do pogreške prilikom dohvaćanja statistike igrača."
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    if (!stats || stats.length === 0) {
        return (
            <div className="max-w-2xl mx-auto my-12 p-6">
                <Alert
                    message="No Stats"
                    description="Nema dostupnih statistika za ovog igrača."
                    type="info"
                    showIcon
                />
            </div>
        );
    }

    const minutesPlayedPercentage = (stats.minutesPlayed / (stats.matchesPlayed * 90)) * 100;

    return (
        <div className="max-w-6xl mx-auto my-24 p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-md">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-12 border-4 border-white shadow-md">
                    {playerImage && (
                        <img src={playerImage} alt={player?.name} className="w-full h-full object-cover" />
                    )}
                </div>
                <div className="text-center md:text-left">
                    <Title level={1} className="mb-2 text-4xl font-bold text-gray-800">{player?.name}</Title>
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        {flagImage && (
                            <img src={flagImage} alt={player?.nationality} className="w-8 h-6 mr-3 shadow-sm" />
                        )}
                        <Text className="text-xl text-gray-600">{player?.nationality}</Text>
                    </div>
                    <Text className="text-lg text-gray-700 block mb-2">Godine: {player?.age}</Text>
                    <Text className="text-lg text-gray-700 block mb-4">{player?.club.name}, {player?.club.place}</Text>
                    <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                        {stats.competition.name}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard icon={<UserOutlined />} title="Odigrane utakmice" value={stats.matchesPlayed} />
                <StatCard icon={<FaFutbol />} title="Golovi" value={stats.goals} />
                <StatCard icon={<FaSquareFull className="text-yellow-500" />} title="Žuti kartoni" value={stats.yellowCards} />
                <StatCard icon={<FaSquareFull className="text-red-500" />} title="Crveni kartoni" value={stats.redCards} />
            </div>

            {stats.minutesPlayed && <div className="bg-white p-8 rounded-2xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-6">
                            <Text className="text-lg font-semibold text-gray-700 mb-2 block">Odigrane minute</Text>
                            <div className="flex items-center">
                                <ClockCircleOutlined className="text-blue-500 mr-3" />
                                <div className="flex-grow">
                                    <Progress
                                        percent={Math.round(minutesPlayedPercentage)}
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                    />
                                </div>
                            </div>
                            <Text className="text-sm text-gray-500 mt-1 block">
                                <AnimatedNumber value={stats.minutesPlayed} /> min
                            </Text>
                        </div>
                        <div>
                            <Text className="text-lg font-semibold text-gray-700 mb-2 block">Cijele odigrane utakmice</Text>
                            <div className="flex items-center">
                                <FieldTimeOutlined className="text-green-500 mr-3" />
                                <Text className="text-3xl font-bold text-green-600">
                                    <AnimatedNumber value={stats.fullMatchesPlayed} />
                                </Text>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            }
        </div>
    );
};

export default PlayerStats;