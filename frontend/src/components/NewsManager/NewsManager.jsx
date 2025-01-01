import React, { useState, useEffect } from 'react';
import { Button, Spin, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useGetNews from '../../hooks/useGetNews';
import useAddNews from '../../hooks/useAddNews';
import useUpdateNews from '../../hooks/useUpdateNews';
import useDeleteNews from '../../hooks/useDeleteNews';
import useSendNotification from '../../hooks/useSendNotification';
import useValidateToken from '../../hooks/useValidateToken';
import NewsTable from './NewsTable';
import NewsModal from './NewsModal';

export default function NewsManager() {
    const [modalState, setModalState] = useState({ visible: false, mode: '', news: null });
    const navigate = useNavigate();

    const { refetch: validateToken } = useValidateToken(navigate);
    const sendNotification = useSendNotification();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            message.error('No admin access. Redirecting to login...');
            navigate('/news');
        } else {
            validateToken();
        }
    }, [validateToken, navigate]);

    const { data: news, isLoading } = useGetNews();
    const addNews = useAddNews();
    const updateNews = useUpdateNews();
    const deleteNews = useDeleteNews();

    const showModal = (mode, newsItem = null) => {
        setModalState({ visible: true, mode, news: newsItem });
    };

    const closeModal = () => {
        setModalState({ visible: false, mode: '', news: null });
    };

    const handleAddOrUpdate = (values, files) => {
        const newsData = {
            ...values,
            thumbnail: files.thumbnail[0]?.originFileObj || files.thumbnail[0]?.url,
            files: files.additional.map((file) => file.originFileObj || file.url),
        };

        if (modalState.mode === 'add') {
            addNews.mutate(newsData, {
                onSuccess: () => {
                    closeModal();
                    message.success('News added successfully!');
                    const token = localStorage.getItem('firebaseToken');
                    if (!token) {
                        message.error('Firebase token not found. Cannot send notification.');
                        return;
                    }
                    sendNotification.mutate({
                        token,
                        title: values.title,
                        body: values.content.slice(0, 100),
                    });
                },
            });
        } else if (modalState.mode === 'edit') {
            updateNews.mutate({ ...newsData, id: modalState.news.id }, {
                onSuccess: () => {
                    closeModal();
                    message.success('News updated successfully!');
                },
            });
        }
    };

    const handleDelete = (id) => {
        deleteNews.mutate(id, {
            onSuccess: () => {
                message.success('News deleted successfully!');
            },
        });
    };

    return (
        <div className="p-4 my-12 max-w-7xl mx-auto">
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal('add')}
                className="mb-4 w-full sm:w-auto"
            >
                Add News
            </Button>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <NewsTable
                    news={news}
                    onView={(item) => showModal('view', item)}
                    onEdit={(item) => showModal('edit', item)}
                    onDelete={handleDelete}
                />
            )}

            {modalState.visible && (
                <NewsModal
                    mode={modalState.mode}
                    news={modalState.news}
                    onClose={closeModal}
                    onSubmit={handleAddOrUpdate}
                />
            )}
        </div>
    );
}
