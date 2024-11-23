import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Carousel, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
// import '../css/carousel-dots.css';

export default function NewsCarousel() {
    const carouselRef = useRef(null);

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
        return <Alert message="Error" description={error.message} type="error" className="max-w-5xl mx-auto mt-16" />;
    }

    if (!data || data.length === 0) {
        return <Alert message="No News Available" type="info" className="max-w-5xl mx-auto mt-16" />;
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden md:mt-16">
            <Carousel
                ref={carouselRef}
                autoplay
                dotPosition='bottom'
                className="overflow-hidden"

            >
                {data.map((news) => (
                    <div key={news.id} className="h-[36rem] transition-shadow duration-300 hover:shadow-2xl">
                        <div className="flex flex-col md:flex-row h-full group">
                            <div className="w-full h-1/2 md:h-full relative overflow-hidden">
                                <img
                                    src={news.thumbnailPath}
                                    alt={news.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col justify-center px-8 py-6 md:w-1/2 h-1/2 md:h-full ">
                                <h2 className="text-gray-800 text-2xl md:text-3xl font-semibold mb-2 line-clamp-2">
                                    {news.title}
                                </h2>
                                <Link to={`/news/${news.newsID}`} className="self-start mt-3">
                                    <span className="text-white bg-blue-600 px-4 py-2 rounded-md font-medium text-sm md:text-base hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg hover:shadow-2xl">
                                        PROČITAJ
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

