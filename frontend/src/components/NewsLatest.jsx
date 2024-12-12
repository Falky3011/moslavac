'use client';

import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import grb from '../assets/grb.png';

const { Title, Text } = Typography;

const NewsLatest = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['latestNews'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/news/latest');
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            return response.json();
        },
    });

    const scrollRef = useRef(null); // Ensure this is correctly initialized

    if (error) return <Text type="danger">Error fetching news</Text>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Title level={2} className="text-3xl font-bold mb-8 text-center">Vijesti</Title>
            {isLoading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="relative">
                    <motion.div
                        ref={scrollRef} // Make sure this is correctly assigned
                        className="flex md:grid md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0"
                        style={{
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {data?.slice(0, 6).map((item, index) => (
                            <motion.div
                                key={item.newsID}
                                className="w-80 md:w-full flex-shrink-0 snap-center md:snap-align-none"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="bg-white rounded-3xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl h-full">
                                    <div className="relative h-48">
                                        <img
                                            src={item.thumbnailPath ? item.thumbnailPath : grb}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-t-3xl "
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-4 line-clamp-2 h-16 text-gray-900">
                                            {item.title}
                                        </h3>
                                        <Link to={`/news/${item.newsID}`} className="inline-block">
                                            <span className="text-white bg-blue-600 px-4 py-2 rounded-md font-medium text-sm md:text-base hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg hover:shadow-2xl">
                                                PROČITAJ
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent md:hidden" />
                </div>
            )}
        </div>
    );
};

export default NewsLatest;
