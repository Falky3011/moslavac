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

    const { data: player, isLoading: playerLoading, isError: playerError } = useGetPlayerDetails(playerId);
    const { data: stats, isLoading: statsLoading, isError: statsError } = useGetPlayerStats(playerId, competition?.id);
    const { data: playerImage } = useGetCometImage(player?.picture);
    const { data: flagImage } = useGetCometImage(player?.flag);

    if (playerLoading || statsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="small" tip="Učitavanje podataka..." />
            </div>
        );
    }

    if (playerError || statsError) {
        return (
            <div className="max-w-4xl mx-auto my-8 p-4">
                <Alert
                    message="Greška"
                    description="Došlo je do pogreške prilikom dohvaćanja podataka o igraču ili statistici."
                    type="error"
                    showIcon
                    className="rounded-lg shadow-md"
                />
            </div>
        );
    }

    if (!stats || stats.length === 0) {
        return (
            <div className="max-w-4xl mx-auto my-8 p-4">
                <Alert
                    message="Nema statistike"
                    description="Trenutno nema dostupnih statistika za ovog igrača."
                    type="info"
                    showIcon
                    className="rounded-lg shadow-md"
                />
            </div>
        );
    }

    const minutesPlayedPercentage = stats.minutesPlayed
        ? (stats.minutesPlayed / (stats.matchesPlayed * 90)) * 100
        : 0;

    return (
        <div className="max-w-6xl mx-auto my-4 sm:my-8 md:my-12 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-md">
            {/* Player Details */}
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-8">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8 border-4 border-white shadow-md">
                    {playerImage ? (
                        <img src={playerImage} alt={player?.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserOutlined className="text-gray-400 text-6xl flex justify-center items-center h-full" />
                    )}
                </div>
                <div className="text-center md:text-left">
                    <Title level={1} className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        {player?.name || 'Nepoznato ime'}
                    </Title>
                    <div className="flex items-center justify-center md:justify-start mb-2 sm:mb-4">
                        {flagImage && (
                            <img src={flagImage} alt={player?.nationality} className="w-6 h-4 sm:w-8 sm:h-6 mr-2 sm:mr-3 shadow-sm" />
                        )}
                        <Text className="text-lg sm:text-xl text-gray-600">{player?.nationality || 'Nepoznato'}</Text>
                    </div>
                    <Text className="text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">
                        Godine: {player?.age || 'Nepoznato'}
                    </Text>
                    <Text className="text-base sm:text-lg text-gray-700 block mb-2 sm:mb-4">
                        {player?.club?.name || 'Nepoznati klub'}, {player?.club?.place || ''}
                    </Text>
                    <div className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                        {stats.competition?.name || 'Nepoznato natjecanje'}
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
                <StatCard icon={<UserOutlined />} title="Odigrane utakmice" value={stats.matchesPlayed} />
                <StatCard icon={<FaFutbol />} title="Golovi" value={stats.goals} />
                <StatCard icon={<FaSquareFull className="text-yellow-500" />} title="Žuti kartoni" value={stats.yellowCards} />
                <StatCard icon={<FaSquareFull className="text-red-500" />} title="Crveni kartoni" value={stats.redCards} />
            </div>

            {/* Advanced Stats */}
            {stats.minutesPlayed && (
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div>
                            <Text className="text-base sm:text-lg font-semibold text-gray-700 mb-2 block">
                                Odigrane minute
                            </Text>
                            <div className="flex items-center">
                                <ClockCircleOutlined className="text-blue-500 mr-2 sm:mr-3" />
                                <Progress
                                    percent={Math.round(minutesPlayedPercentage)}
                                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                                />
                            </div>
                            <Text className="text-xs sm:text-sm text-gray-500 mt-1 block">
                                <AnimatedNumber value={stats.minutesPlayed} /> min
                            </Text>
                        </div>
                        <div>
                            <Text className="text-base sm:text-lg font-semibold text-gray-700 mb-2 block">
                                Cijele odigrane utakmice
                            </Text>
                            <div className="flex items-center">
                                <FieldTimeOutlined className="text-green-500 mr-2 sm:mr-3" />
                                <Text className="text-2xl sm:text-3xl font-bold text-green-600">
                                    <AnimatedNumber value={stats.fullMatchesPlayed} />
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerStats;