import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';
import { message } from 'antd';

const useValidateToken = (navigate) => {
    const validateTokenQuery = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await apiClient.post(
            '/api/admin/validate-token',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.data) {
            throw new Error('Invalid token');
        }
        return response.data;
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['validateToken'],
        queryFn: validateTokenQuery,
        enabled: false,
        onError: () => {
            message.error('Vaša sesija je istekla. Molimo prijavite se ponovno.');
            localStorage.removeItem('adminToken');
            navigate('/admin');
        },
    });

    return { isLoading, error, refetch, isAdmin: !!data };
};

export default useValidateToken;
