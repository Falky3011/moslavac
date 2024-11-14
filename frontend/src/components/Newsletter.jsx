import { useState } from 'react'
import { Modal, Input, Button, Form, message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useSubscribeNewsletter } from '../hooks/useSubscribeNewsletter'

export default function Newsletter({ isOpen = false, onClose = () => { } }) {
    const [form] = Form.useForm()
    const { subscribe } = useSubscribeNewsletter();

    const handleSubmit = (values) => {
        subscribe(values.email, {
            onSuccess: () => {
                message.success('Uspješno ste se pretplatili na newsletter.')
                form.resetFields()
                onClose()
            },
            onError: (error) => {
                message.error(error.message || 'Došlo je do greške prilikom pretplate.')
            }
        })
    }

    return (
        <Modal
            title="Pretplatite se na naš newsletter!"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            closeIcon={<CloseOutlined />}
        >
            <div className="mb-4">
                <img
                    src="/placeholder.svg?height=192&width=384"
                    alt="Nogometna akcija"
                    className="w-full h-48 object-cover rounded"
                />
            </div>
            <p className="mb-4">Budite u toku s najnovijim vijestima našeg kluba.</p>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Molimo unesite vašu email adresu' },
                        { type: 'email', message: 'Molimo unesite ispravnu email adresu' }
                    ]}
                >
                    <Input placeholder="Unesite vašu email adresu" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Pretplatite se
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
