'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Row, Col, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom'

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

    if (error) return <Text type="danger">Error fetching news</Text>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Title level={2} className="text-3xl font-bold mb-8 text-center">Vijesti</Title>
            {isLoading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[24, 24]}>
                    {data?.map((item) => (
                        <Col xs={24} sm={12} lg={8} key={item.newsID}>
                            <Card
                                hoverable
                                className="h-full  transition-shadow duration-300 ease-in-out hover:shadow-2xl  rounded-3xl shadow-xl"
                                cover={
                                    <div className="relative h-48">
                                        <img
                                            src={item.thumbnailPath || '/placeholder.svg'}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-t-lg"
                                        />
                                    </div>
                                }
                            >
                                <Title level={4} className="mb-2 line-clamp-2 text-gray-900 h-16">
                                    {item.title}
                                </Title>

                                <Link to={`/news/${item.newsID}`} className="self-start mt-3">
                                    <span className="text-white bg-blue-600 px-4 py-2 rounded-md font-medium text-sm md:text-base hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg hover:shadow-2xl">
                                        PROČITAJ
                                    </span>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default NewsLatest;
