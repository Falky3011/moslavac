import React from 'react';
import { Card, Typography, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import grb from '../assets/grb.png';

const { Meta } = Card;
const { Paragraph, Title } = Typography;

const NewsCard = ({ title, content, date, imageUrl, id }) => {
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <Card
            hoverable
            className="w-full overflow-hidden transition-all duration-300 hover:shadow-md"
            cover={
                <div className="relative w-full h-48">
                    <img
                        src={imageUrl || grb}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            }
            actions={[
                <Button type="primary" block href={`/news/${id}`}>
                    Read More
                </Button>
            ]}
        >
            <Meta
                title={<Title level={4} ellipsis={{ rows: 2 }}>{title}</Title>}
                description={
                    <>
                        <Paragraph ellipsis={{ rows: 3 }} className="text-sm mb-4">
                            {content}
                        </Paragraph>
                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarOutlined className="mr-2" />
                            {formattedDate}
                        </div>
                    </>
                }
            />
        </Card>
    );
};

export default NewsCard;
