import axios from 'axios';

const useValidateToken = (navigate) => {
    return async (token) => {
        try {
            const response = await axios.post('http://localhost:8080/api/admin/validate-token', { token });
            if (!response.data) {
                throw new Error('Invalid token');
            }
        } catch (error) {
            message.error('Nemate administratorski pristup. Preusmjeravamo na login...');
            localStorage.removeItem('adminToken');
            navigate('/admin');
        }
    };
};

export default useValidateToken;
