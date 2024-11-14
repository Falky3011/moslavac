import React from 'react';
import { Card, Typography, Button, Space, Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import fans from '../assets/fans.jpg';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function SeasonTicketPromo() {
    return (
        <Card
            className="max-w-4xl mx-auto rounded-3xl shadow-xl overflow-hidden border-none my-36 transition-all duration-300 hover:shadow-2xl hover:border-gray-300"
            bodyStyle={{ padding: 0 }}
        >
            <Row className="flex flex-wrap">
                <Col xs={24} md={12} className="w-full md:w-1/2">
                    <img
                        src={fans}
                        alt="SNK Moslavac navijači"
                        className="w-full h-full object-cover"
                    />
                </Col>
                <Col xs={24} md={12} className="w-full md:w-1/2">
                    <Space direction="vertical" size="large" className="w-full p-12">
                        <Title level={2} className="text-gray-900 text-3xl font-bold">
                            Postani naš 12. igrač!
                        </Title>
                        <Text strong className="text-xl text-gray-700">
                            Članska iskaznica za sezonu 2024/2025
                        </Text>

                        <Link
                            to="/season-ticket-purchase" // Zamijenite s stvarnom putanjom
                            className="bg-blue-600 border-blue-600 px-3 rounded-lg font-semibold h-14 text-xl hover:bg-blue-700 inline-flex items-center justify-center border-2 text-white"
                        >
                            <RightOutlined className="mr-2" />
                            Kupi iskaznicu
                        </Link>
                        <Text type="secondary" className="text-base text-gray-500">
                            Vrijedi za sve domaće utakmice od 1.8.2024. do 31.7.2025.
                        </Text>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}
