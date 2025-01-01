import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import useValidatePassword from '../hooks/useValidatePassword';
import useValidateToken from '../hooks/useValidateToken';

export const useAdminAuth = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const { refetch: validateToken, isAdmin } = useValidateToken(navigate);
    const { mutate: validatePassword } = useValidatePassword(validateToken, setIsModalVisible);

    const checkAdminStatus = useCallback(() => {
        const token = localStorage.getItem('adminToken');
        if (location.pathname.endsWith('/admin')) {
            if (!token) {
                setIsModalVisible(true);
            } else {
                validateToken();
            }
        }
    }, [location.pathname, validateToken]);

    useEffect(() => {
        checkAdminStatus();
    }, [checkAdminStatus]);

    const handlePasswordSubmit = () => {
        validatePassword(password, {
            onSuccess: () => {
                message.success('Authenticated as admin');
                setIsModalVisible(false);
                setPassword('');
            },
            onError: () => {
                message.error('Invalid password');
                setPassword('');
            },
        });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const AdminAuthModal = () => (
        <Modal
            title="Administratorska autentifikacija"
            open={isModalVisible}
            onCancel={() => navigate('/')}
            maskClosable={false}
            closable={false}
            keyboard={false}
            footer={[
                <Button key="cancel" onClick={() => navigate('/')}>
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
                onChange={handlePasswordChange}
                onPressEnter={handlePasswordSubmit}
                placeholder="Unesite šifru"
            />
        </Modal>
    );

    return { isAdmin, AdminAuthModal, setIsModalVisible };
};

