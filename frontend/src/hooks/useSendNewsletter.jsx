// /src/hooks/useSendNewsletter.jsx
import { useMutation } from '@tanstack/react-query';

export function useSendNewsletter() {
    const sendNewsletterMutation = useMutation(
        ({ subject, content }) =>
            fetch('http://localhost:8080/api/newsletter/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, content }),
            }).then((res) => {
                if (!res.ok) throw new Error('Slanje newslettera nije uspjelo');
                return res.text();
            }),
        {
            onSuccess: () => {
                alert('Newsletter je uspješno poslan svim pretplatnicima.');
            },
            onError: (error) => {
                alert(error.message);
            },
        }
    );

    return {
        sendNewsletter: sendNewsletterMutation.mutate,
    };
};

