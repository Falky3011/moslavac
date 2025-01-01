import { useMutation } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';
import { message } from 'antd';

const useValidatePassword = (validateToken, setIsModalVisible) => {
    return useMutation({
        mutationFn: async (password) => {
            const response = await apiClient.post('/api/admin/validate-password', { password });
            if (!response.data || !response.data.token) {
                throw new Error('Pogrešna šifra!');
            }
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('adminToken', data.token);
            message.success('Uspješna autentifikacija!');
            validateToken();
            setIsModalVisible(false);
        },
        onError: () => {
            message.error('Pogrešna šifra!');
        },
    });
};

export default useValidatePassword;
