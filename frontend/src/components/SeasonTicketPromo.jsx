import React from 'react';
import { Card, Typography, Space, Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import fans from '../assets/fans.jpg';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function SeasonTicketPromo() {
    return (
        <Card
            className="max-w-4xl mx-auto overflow-hidden border-none rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gray-300"
            bodyStyle={{ padding: 0 }}
        >
            <Row className="flex flex-wrap">
                <Col xs={24} md={12} className="w-full md:w-1/2">
                    <img
                        src={fans}
                        alt="SNK Moslavac navijači"
                        className="w-full h-64 md:h-full object-cover"
                    />
                </Col>
                <Col xs={24} md={12} className="w-full md:w-1/2">
                    <Space direction="vertical" size="large" className="w-full p-6 sm:p-12">
                        <Title level={2} className="text-gray-900 text-2xl sm:text-3xl font-bold">
                            Postani naš 12. igrač!
                        </Title>
                        <Text strong className="text-lg sm:text-xl text-gray-700">
                            Članska iskaznica za sezonu 2024/2025
                        </Text>

                        <Link
                            to="/season-ticket-purchase"
                            className="bg-blue-600 border-blue-600 px-3 rounded-lg font-semibold h-12 sm:h-14 text-lg sm:text-xl hover:bg-blue-700 inline-flex items-center justify-center border-2 text-white w-full sm:w-auto"
                        >
                            <RightOutlined className="mr-2" />
                            Kupi iskaznicu
                        </Link>

                    </Space>
                </Col>
            </Row>
        </Card>
    );
}