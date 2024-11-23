"use client";

import React, { useRef, useEffect, useState } from 'react';
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
            const scrollAmount = sliderRef.current.clientWidth * 0.8;
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
        <div className="relative max-w-full mx-auto px-4 py-12 bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Nadolazeće utakmice</h2>
            <div className="relative overflow-hidden">
                <div
                    ref={sliderRef}
                    className="flex space-x-10 overflow-x-auto snap-x snap-mandatory"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE 10+
                    }}
                    onScroll={checkScroll}
                >
                    {matches.map((match) => (
                        <div
                            key={match.id}
                            className="flex-shrink-0 w-[300px] snap-start"
                            style={{
                                overflow: 'hidden',
                            }}
                        >
                            <UpcomingMatchItem match={match} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMatches;
