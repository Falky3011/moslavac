'use client';

import React, { useState, useEffect } from 'react';
import { List, Card, Pagination, Typography, Spin, Alert, Modal, Input, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';
import grb from '../assets/grb.png';
import useValidatePassword from '../hooks/useValidatePassword';
import useValidateToken from '../hooks/useValidateToken';
import useFetchNewsPaginated from '../hooks/useFetchNewsPaginated';

const { Title, Paragraph } = Typography;

export default function NewsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const location = useLocation();
    const navigate = useNavigate();
    const isAdminRoute = location.pathname.endsWith('/admin');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [password, setPassword] = useState('');

    const { refetch: validateToken, isAdmin } = useValidateToken(navigate);
    const { mutate: validatePassword } = useValidatePassword(validateToken, setIsModalVisible);
    const { data, error, isLoading } = useFetchNewsPaginated(currentPage, pageSize);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            validateToken();
        } else if (isAdminRoute) {
            setIsModalVisible(true);
        }
    }, [isAdminRoute, validateToken]);

    const handlePasswordSubmit = () => {
        validatePassword(password);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description={error instanceof Error ? error.message : 'An unknown error occurred'}
                type="error"
                showIcon
                className="max-w-4xl mx-auto mt-4"
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Modal
                title="Administratorska autentifikacija"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Odustani
                    </Button>,
                    <Button key="submit" type="primary" onClick={handlePasswordSubmit}>
                        Potvrdi
                    </Button>,
                ]}
            >
                <p>Molimo unesite administratorsku šifru za pristup.</p>
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Unesite šifru"
                />
            </Modal>

            {isAdmin && (
                <div className="mb-6 flex justify-end">
                    <Link
                        to="/admin/manage-news"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                        Uredi vijesti
                    </Link>
                </div>
            )}

            <Title level={2} className="mb-6 text-center text-2xl font-bold text-gray-800">
                Vijesti
            </Title>
            <List
                dataSource={data?.content || []}
                renderItem={(item) => (
                    <List.Item className="p-0 mb-4 bg-white">
                        <Card
                            hoverable
                            className="w-full overflow-hidden rounded-3xl"
                            bodyStyle={{ padding: 0 }}
                        >
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-1/3">
                                    <img
                                        alt={item.title}
                                        src={item.thumbnailPath ? item.thumbnailPath : grb}
                                        className="object-cover w-full h-48 sm:h-full"
                                    />
                                </div>

                                <div className="p-4 sm:w-2/3">
                                    <Title level={4} className="mb-2 text-lg font-semibold">
                                        {item.title}
                                    </Title>
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <CalendarIcon className="w-4 h-4 mr-1" />
                                        {new Date(item.date).toLocaleDateString()}
                                    </div>
                                    <Paragraph ellipsis={{ rows: 2 }} className="text-sm text-gray-600">
                                        {item.content}
                                    </Paragraph>
                                    <Link
                                        to={`/news/${item.newsID}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
                                    >
                                        Pročitaj više
                                        <ChevronRightIcon className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
            <div className="mt-6 flex justify-center">
                <Pagination
                    current={currentPage}
                    total={data?.totalElements || 0}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="text-sm"
                />
            </div>
        </div>
    );
}
