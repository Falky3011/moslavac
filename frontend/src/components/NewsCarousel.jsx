import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Carousel, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import grb from '../assets/grb.png'

export default function NewsCarousel() {
    const carouselRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const { data, error, isLoading } = useQuery({
        queryKey: ['latestNews'],
        queryFn: () =>
            fetch("http://localhost:8080/api/news/latest")
                .then(res => res.json())
    });

    if (isLoading) {
        return <Spin tip="Loading..." className="flex justify-center items-center h-64" />;
    }

    if (error) {
        return <Alert message="Error" description={error.message} type="error" className="max-w-6xl mx-auto mt-8" />;
    }

    if (!data || data.length === 0) {
        return <Alert message="No News Available" type="info" className="max-w-6xl mx-auto mt-8" />;
    }

    return (
        <motion.div
            className="relative w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ scale }}
        >
            <Carousel
                ref={carouselRef}
                autoplay
                dotPosition='bottom'
                className="overflow-hidden"
            >
                {data.map((news) => (
                    <div key={news.id} className="h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem]">
                        <motion.div
                            className="relative h-full group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={news.thumbnailPath ? news.thumbnailPath : grb}
                                alt={news.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-end h-full"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 line-clamp-3 leading-tight">
                                    {news.title}
                                </h2>
                                <Link
                                    to={`/news/${news.newsID}`}
                                    className="self-start mt-4 group inline-flex items-center"
                                >
                                    <motion.span
                                        className="text-white bg-blue-600 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition duration-300 ease-in-out group-hover:bg-blue-700 shadow-lg group-hover:shadow-blue-500/50"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        PROČITAJ
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                ))}
            </Carousel>
        </motion.div>
    );
}

