import React, { useState } from 'react';
import { Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, ExpandAltOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCometImage } from '../hooks/useGetCometImage';
import Countdown from './Countdown';

const { Text } = Typography;

const UpcomingMatchItem = ({ match }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { homeTeam, awayTeam, dateTimeUTC, competition } = match;
    const matchDate = new Date(dateTimeUTC);

    const homeTeamImage = useGetCometImage(homeTeam?.picture);
    const awayTeamImage = useGetCometImage(awayTeam?.picture);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <motion.div
            layout
            onClick={toggleExpand}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-[340px] h-[180px] sm:h-[200px] rounded-2xl sm:rounded-3xl shadow-md cursor-pointer relative overflow-hidden md:m-6 group"
            style={{ background: 'white' }}
        >
            <AnimatePresence>
                {!isExpanded && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 sm:p-6 h-full flex flex-col"
                    >
                        <Text className="text-xs sm:text-sm font-semibold mb-2 sm:mb-4 block text-center text-blue-600 tracking-wide">
                            {competition?.name}
                        </Text>
                        <div className="flex justify-between items-center mb-2 sm:mb-4 flex-grow">
                            <TeamInfo name={homeTeam.name} logo={homeTeamImage.data} />
                            <Text strong className="text-lg sm:text-xl font-bold text-gray-600">vs</Text>
                            <TeamInfo name={awayTeam.name} logo={awayTeamImage?.data} />
                        </div>
                        <motion.div
                            className="absolute bottom-2 right-2 text-blue-500"
                            initial={{ y: 0 }}
                            animate={{ y: [0, -5, 0] }} // Animira prema gore i vraća se dolje
                            transition={{
                                duration: 1.5, // Trajanje jedne pune animacije (gore i dolje)
                                ease: "easeInOut",
                                repeat: Infinity, // Beskonačno ponavljanje
                            }}
                        >
                            <ExpandAltOutlined className="text-lg" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="details"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 p-4 sm:p-6 flex flex-col justify-center items-center text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center mb-2 sm:mb-4"
                        >
                            <CalendarOutlined className="mr-2 text-base sm:text-xl text-white" />
                            <Text className="text-white text-sm sm:text-base font-medium">
                                {matchDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </Text>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center mb-3 sm:mb-6"
                        >
                            <ClockCircleOutlined className="mr-2 text-base sm:text-xl text-white" />
                            <Text className="text-white text-sm sm:text-base font-medium">
                                {matchDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Countdown targetDate={dateTimeUTC} homeScore={0} awayScore={0} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const TeamInfo = ({ name, logo }) => (
    <div className="flex flex-col items-center w-1/3">
        <img src={logo || '/placeholder.svg'} alt={`${name} logo`} className="w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2 object-contain" />
        <Text strong className="text-center text-xs sm:text-sm line-clamp-2 font-medium">
            {name}
        </Text>
    </div>
);

export default UpcomingMatchItem;

