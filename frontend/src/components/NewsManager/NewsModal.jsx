import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const NewsModal = ({ mode, news, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [thumbnailList, setThumbnailList] = useState(
        news?.thumbnailPath
            ? [{ uid: '-1', name: 'thumbnail', status: 'done', url: news.thumbnailPath }]
            : []
    );
    const [filesList, setFilesList] = useState(
        news?.imagePaths?.map((path, index) => ({ uid: `-${index + 1}`, name: `file-${index + 1}`, status: 'done', url: path })) || []
    );

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            onSubmit(values, { thumbnail: thumbnailList, additional: filesList });
        });
    };

    return (
        <Modal
            title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} News`}
            visible
            onCancel={onClose}
            onOk={handleSubmit}
            okText="Submit"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical" initialValues={news || {}}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="content" label="Content" rules={[{ required: true }]}>
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
                <Form.Item name="files" label="Additional Images">
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
        </Modal>
    );
};

export default NewsModal;
