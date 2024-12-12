import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { message } from 'antd';

const useValidatePassword = (validateToken, setIsModalVisible) => {
    return useMutation({
        mutationFn: async (password) => {
            const response = await axios.post('http://localhost:8080/api/admin/validate-password', { password });
            if (!response.data || !response.data.token) {
                throw new Error('Pogrešna šifra!');
            }
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('adminToken', data.token);
            message.success('Uspješna autentifikacija!');
            validateToken(); // Revalidate the token after successful password submission
            setIsModalVisible(false);
        },
        onError: () => {
            message.error('Pogrešna šifra!');
        },
    });
};

export default useValidatePassword;
