"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UpcomingMatchItem from './UpcomingMatchItem';
import useGetAllMatches from '../hooks/useGetAllMatches';

const UpcomingMatches = () => {
    const { data: matches, isLoading, error } = useGetAllMatches();
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [matches]);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error loading matches</div>;
    }

    if (!matches || matches.length === 0) {
        return <div className="text-center text-gray-500 p-4">No upcoming matches</div>;
    }

    return (
        <div className="relative max-w-full mx-auto px-2 sm:px-4 py-6 sm:py-12 bg-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-8">Sljedeće utakmice</h2>
            <div className="relative overflow-hidden">
                <motion.div
                    ref={sliderRef}
                    className="flex space-x-4 sm:space-x-6 overflow-x-auto snap-x snap-mandatory pb-4"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE 10+
                    }}
                    onScroll={checkScroll}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {matches.map((match) => (
                        <motion.div
                            key={match.id}
                            className="flex-shrink-0 w-full sm:w-[340px] snap-start"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <UpcomingMatchItem match={match} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Fade effect */}
                {canScrollRight && (
                    <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
                )}
            </div>
        </div>
    );
};

export default UpcomingMatches;
