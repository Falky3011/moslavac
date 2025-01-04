import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';

const { Title, Paragraph } = Typography;

const NewsItem = ({ item, grb }) => {
    const hasThumb = !!item.thumbnailPath;

    return (
        <Card
            hoverable
            className="w-full overflow-hidden rounded-3xl"
            bodyStyle={{ padding: 0 }}
        >
            <div className="flex flex-col sm:flex-row h-auto sm:h-56">
                {/* Thumbnail container - responsive dimensions */}
                <div className="w-full sm:w-1/3 h-48 sm:h-full relative overflow-hidden">
                    <img
                        alt={item.title}
                        src={hasThumb ? item.thumbnailPath : grb}
                        className={`w-full h-full ${hasThumb ? 'object-cover' : 'object-contain p-4'}`}
                    />
                </div>

                {/* Content - responsive height and padding */}
                <div className="p-4 w-full sm:w-2/3 flex flex-col justify-between">
                    <div>
                        <Title level={4} className="mb-2 text-lg font-semibold line-clamp-2">
                            {item.title}
                        </Title>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <CalendarIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                            {new Date(item.date).toLocaleDateString()}
                        </div>
                        <Paragraph
                            ellipsis={{ rows: 3 }}
                            className="text-sm text-gray-600"
                        >
                            {item.content}
                        </Paragraph>
                    </div>
                    <Link
                        to={`/news/${item.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                        Pročitaj više
                        <ChevronRightIcon className="w-4 h-4 ml-1 flex-shrink-0" />
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default NewsItem;

