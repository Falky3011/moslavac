import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, message, Popconfirm, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useFetchNews from '../hooks/useFetchNews';
import useAddNews from '../hooks/useAddNews';
import useUpdateNews from '../hooks/useUpdateNews';
import useDeleteNews from '../hooks/useDeleteNews';
import grb from '../assets/grb.png';
import useSendNotification from '../hooks/useSendNotification';
import useValidateToken from '../hooks/useValidateToken';

const { TextArea } = Input;

export default function NewsManager() {
    const [selectedNews, setSelectedNews] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [thumbnailList, setThumbnailList] = useState([]);
    const [filesList, setFilesList] = useState([]);
    const [form] = Form.useForm();
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

    const { data: news, isLoading } = useFetchNews();
    const addNews = useAddNews();
    const updateNews = useUpdateNews();
    const deleteNews = useDeleteNews();

    const showModal = (mode, newsItem = null) => {
        setModalMode(mode);
        setSelectedNews(newsItem);

        if (mode === 'edit' && newsItem) {
            form.setFieldsValue({
                ...newsItem,
                thumbnail: [],
                files: [],
            });
            setThumbnailList(newsItem.thumbnailPath
                ? [
                    {
                        uid: '-1',
                        name: 'thumbnail',
                        status: 'done',
                        url: newsItem.thumbnailPath,
                    },
                ]
                : []);
            setFilesList(
                newsItem.imagePaths?.map((file, index) => ({
                    uid: `-${index + 1}`,
                    name: `file-${index + 1}`,
                    status: 'done',
                    url: file,
                })) || []
            );
        } else if (mode === 'add') {
            form.resetFields();
            setThumbnailList([]);
            setFilesList([]);
        }

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedNews(null);
        form.resetFields();
        setThumbnailList([]);
        setFilesList([]);
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const newsData = {
                ...values,
                thumbnail: thumbnailList[0]?.originFileObj || thumbnailList[0]?.url,
                files: filesList.map(file => file.originFileObj || file.url),
            };

            if (modalMode === 'add') {
                addNews.mutate(newsData, {
                    onSuccess: () => {
                        handleCancel();
                        message.success('News added successfully!');
                        const token = localStorage.getItem('firebaseToken');
                        if (!token) {
                            message.error('Firebase token not found. Cannot send notification.');
                            return;
                        }
                        sendNotification.mutate({
                            token: token,
                            title: values.title,
                            body: values.content.slice(0, 100),
                        });
                    },
                });
            } else if (modalMode === 'edit') {
                updateNews.mutate({ ...newsData, newsID: selectedNews.newsID }, {
                    onSuccess: () => {
                        handleCancel();
                        message.success('News updated successfully!');
                    },
                });
            }
        });
    };

    const handleDelete = (newsID) => {
        deleteNews.mutate(newsID, {
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
                Dodaj
            </Button>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naslov</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sadržaj</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcije</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {news?.map((item) => (
                                <tr key={item.newsID}>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <img src={item.thumbnailPath ? item.thumbnailPath : grb} alt="Thumbnail" className="w-12 h-12 object-cover rounded" />
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{item.title}</div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{moment(item.date).format('YYYY-MM-DD HH:mm')}</div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.content}</div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                        <Button
                                            icon={<EyeOutlined />}
                                            onClick={() => showModal('view', item)}
                                            className="mr-2"
                                        />
                                        <Button
                                            icon={<EditOutlined />}
                                            onClick={() => showModal('edit', item)}
                                            className="mr-2"
                                        />
                                        <Popconfirm
                                            title="Jeste li sigurni da želite izbrisati ovu vijest?"
                                            onConfirm={() => handleDelete(item.newsID)}
                                            okText="Da"
                                            cancelText="Ne"
                                        >
                                            <Button icon={<DeleteOutlined />} />
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal
                title={`${modalMode.charAt(0).toUpperCase() + modalMode.slice(1)} News`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={
                    modalMode !== 'view' ? [
                        <Button key="cancel" onClick={handleCancel}>
                            Otkaži
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleSubmit}>
                            Potvrdi
                        </Button>,
                    ] : null
                }
                width={720}
            >
                {modalMode === 'view' ? (
                    <div className="space-y-4">
                        {selectedNews?.thumbnailPath && (
                            <img
                                src={selectedNews.thumbnailPath}
                                alt="Thumbnail"
                                className="h-40 object-contain rounded-lg shadow-md"
                            />
                        )}
                        <div>
                            <p className="font-bold">Naslov:</p>
                            <span>{selectedNews?.title}</span>
                        </div>
                        <div>
                            <p className="font-bold">Datum:</p>
                            <span>{moment(selectedNews?.date).format('YYYY-MM-DD HH:mm')}</span>
                        </div>
                        <div>
                            <p className="font-bold">Sadržaj:</p>
                            <div className="max-h-60 overflow-y-auto">{selectedNews?.content}</div>
                        </div>
                    </div>
                ) : (
                    <Form form={form} layout="vertical" className="space-y-4">
                        <Form.Item name="title" label="Naslov" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="content" label="Sadržaj" rules={[{ required: true }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="thumbnail" label="Thumbnail">
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                                maxCount={1}
                                fileList={thumbnailList}
                                onChange={({ fileList }) => setThumbnailList(fileList)}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item name="files" label="Dodatne slike">
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                                multiple
                                fileList={filesList}
                                onChange={({ fileList }) => setFilesList(fileList)}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}
