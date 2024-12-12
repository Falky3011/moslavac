import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { message } from 'antd';

const useValidateToken = (navigate) => {
    const validateTokenQuery = (token) => async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/admin/validate-token', { token });
            if (!response.data) {
                throw new Error('Invalid token');
            }
            return response.data;
        } catch (error) {
            throw new Error('Nemate administratorski pristup');
        }
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['validateToken'],
        queryFn: validateTokenQuery(localStorage.getItem('adminToken')),
        enabled: false, // Disabled by default, manually triggered
        onError: () => {
            message.error('Nemate administratorski pristup. Preusmjeravamo na login...');
            localStorage.removeItem('adminToken');
            navigate('/admin');
        },
    });

    return { isLoading, error, refetch, isAdmin: !!data };
};

export default useValidateToken;
