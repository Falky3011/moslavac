import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const sendNotification = async (notificationData) => {
    const response = await axios.post('http://localhost:8080/api/notifications/send', notificationData); // Ispravan backend URL
    return response.data;
};

export default function useSendNotification() {
    return useMutation({
        mutationFn: sendNotification, // Ispravan način prosljeđivanja funkcije u verziji 4.x
        onSuccess: () => {
            console.log('Notification sent successfully!');
        },
        onError: (error) => {
            console.error('Failed to send notification:', error);
        },
    });
}
