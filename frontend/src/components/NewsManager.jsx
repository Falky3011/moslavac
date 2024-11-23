import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

export default function NewsManager() {
    const [selectedNews, setSelectedNews] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { data: news, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/api/news');
            return response.data.content;
        },
    });

    const addNewsMutation = useMutation({
        mutationFn: async (newNews) => {
            const response = await axios.post('http://localhost:8080/api/news', {
                title: newNews.title,
                content: newNews.content
            });

            if (newNews.thumbnail) {
                let formData = new FormData();
                formData.append('thumbnail', newNews.thumbnail);
                await axios.put(`http://localhost:8080/api/news/thumbnail/${response.data.newsID}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            if (newNews.files && newNews.files.length > 0) {
                let formData = new FormData();
                newNews.files.forEach(file => formData.append('files', file));
                await axios.put(`http://localhost:8080/api/news/photos/${response.data.newsID}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            setIsModalVisible(false);
            message.success('News added successfully');
        },
        onError: () => {
            message.error('Failed to add news');
        },
    });

    const updateNewsMutation = useMutation({
        mutationFn: async (updatedNews) => {
            const formData = new FormData();
            formData.append('title', updatedNews.title);
            formData.append('content', updatedNews.content);
            if (updatedNews.thumbnail) {
                formData.append('thumbnail', updatedNews.thumbnail);
            }
            if (updatedNews.files && updatedNews.files.length > 0) {
                updatedNews.files.forEach(file => formData.append('files', file));
            }
            const response = await axios.put(`http://localhost:8080/api/news/${updatedNews.newsID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            setIsModalVisible(false);
            setSelectedNews(data);
        },
    });

    const deleteNewsMutation = useMutation({
        mutationFn: (newsId) => axios.delete(`http://localhost:8080/api/news/${newsId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            setIsModalVisible(false);
        },
    });

    const showModal = (type) => {
        if ((type === 'view' || type === 'edit' || type === 'delete') && !selectedNews) {
            Modal.error({
                title: 'No news selected',
                content: 'Please select a news item first.',
            });
            return;
        }
        setModalType(type);
        setIsModalVisible(true);
        if (type === 'edit') {
            form.setFieldsValue({
                ...selectedNews,
            });
        } else if (type === 'add') {
            form.resetFields();
            setSelectedNews({});
        }
    };

    const handleOk = () => {
        if (modalType === 'add' || modalType === 'edit') {
            form.validateFields().then((values) => {
                const newsData = {
                    ...values,
                    thumbnail: values.thumbnail ? values.thumbnail.fileList[0].originFileObj : null,
                    files: values.files ? values.files.fileList.map(file => file.originFileObj) : [],
                };
                if (modalType === 'add') {
                    addNewsMutation.mutate(newsData);
                } else {
                    updateNewsMutation.mutate({ ...newsData, newsID: selectedNews.newsID });
                }
            });
        } else if (modalType === 'delete') {
            deleteNewsMutation.mutate(selectedNews.newsID);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnailPath',
            key: 'thumbnail',
            render: (thumbnailPath) => (
                thumbnailPath ? (
                    <img
                        src={thumbnailPath}
                        alt="Thumbnail"
                        style={{
                            width: 50, height: 50, objectFit: 'cover', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'  // Adds shadow effect
                        }}
                    />
                ) : (
                    <div style={{ width: 50, height: 50, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No Image
                    </div>
                )
            ),
        },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (text) => (text.length > 50 ? text.substring(0, 50) + '...' : text),
        },
    ];

    const onSelectChange = (selectedRow) => {
        const vijest = news.find(n => n.newsID === selectedRow[0]);
        setSelectedNews(vijest);
    };

    const rowSelection = {
        type: 'radio',
        onChange: onSelectChange,
    };

    return (
        <div className="p-4 my-12">
            <div className="mb-4 flex space-x-2">
                <Button onClick={(e) => { e.stopPropagation(); showModal('view'); }}>View</Button>
                <Button onClick={(e) => { e.stopPropagation(); showModal('add'); }}>Add</Button>
                <Button onClick={(e) => { e.stopPropagation(); showModal('edit'); }}>Edit</Button>
                <Button onClick={(e) => { e.stopPropagation(); showModal('delete'); }}>Delete</Button>
            </div>
            <Table
                dataSource={news}
                columns={columns}
                rowKey="newsID"
                rowSelection={rowSelection}
            />
            <Modal
                title={modalType.charAt(0).toUpperCase() + modalType.slice(1) + ' News'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={modalType === 'view' ? null : undefined}
            >
                {modalType === 'view' ? (
                    <div>
                        {selectedNews?.thumbnailPath && (
                            <img
                                src={selectedNews.thumbnailPath}
                                alt="Thumbnail"
                                style={{
                                    width: 200, height: 200, objectFit: 'cover', marginBottom: 16, borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'  // Adds shadow effect
                                }}
                            />
                        )}
                        <div>
                            <p className='font-bold'>Title: </p>
                            <span>{selectedNews?.title}</span>
                        </div>

                        <div>
                            <p className='font-bold'>Date: </p>
                            <span>{moment(selectedNews?.date).format('YYYY-MM-DD HH:mm')}</span>
                        </div>

                        <div>
                            <p className='font-bold'>Content: </p>
                            <div>
                                {selectedNews?.content}
                            </div>
                        </div>
                    </div>
                ) : modalType === 'delete' ? (
                    <p>Are you sure you want to delete this news item?</p>
                ) : (
                    <Form form={form} layout="vertical">
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="thumbnail" label="Thumbnail" rules={[{ required: true }]}>
                            <Upload
                                accept="image/*"
                                maxCount={1}
                                beforeUpload={() => false}
                                listType="picture-card"
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item name="files" label="Additional Photos">
                            <Upload
                                accept="image/*"
                                multiple
                                beforeUpload={() => false}
                                listType="picture-card"
                            >
                                <div>
                                    <UploadOutlined />
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