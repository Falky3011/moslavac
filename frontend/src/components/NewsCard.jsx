import React from 'react';
import { Card, Typography, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import grb from '../assets/grb.png'


const { Meta } = Card;
const { Paragraph } = Typography;

const NewsCard = ({ title, content, date, imageUrl, id }) => {
    return (
        <Card
            hoverable
            className="w-full overflow-hidden transition-all duration-300 hover:shadow-md"
            cover={
                <div className="relative w-full h-48">
                    <img
                        src={imageUrl ? imageUrl : grb}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            }
            actions={[
                <a href={`/news/${id}`} key="read-more">
                    <Button type="primary" block>
                        Read More
                    </Button>
                </a>
            ]}
        >
            <Meta
                title={<Typography.Title level={4} ellipsis={{ rows: 2 }}>{title}</Typography.Title>}
                description={
                    <>
                        <Paragraph ellipsis={{ rows: 3 }} className="text-sm mb-4">
                            {content}
                        </Paragraph>
                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarOutlined className="mr-2" />
                            {new Date(date).toLocaleDateString()}
                        </div>
                    </>
                }
            />
        </Card>
    );
};

export default NewsCard;
