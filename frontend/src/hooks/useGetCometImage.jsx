import { useQuery } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';

export function useGetCometImage(uuid) {
    return useQuery({
        queryKey: ['image', uuid],
        queryFn: async () => {
            const response = await apiClient.get(`/api/comet/image/${uuid}`, {
                responseType: 'blob',
                headers: {
                    Accept: 'image/jpeg',
                },
            });
            return URL.createObjectURL(response.data);
        },
    });
}
