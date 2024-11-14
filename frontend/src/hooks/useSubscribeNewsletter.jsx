import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubscribeNewsletter() {
    const queryClient = useQueryClient();

    const subscribeMutation = useMutation({
        mutationFn: async (email) => {
            const response = await fetch(`http://localhost:8080/api/newsletter/subscribe?email=${encodeURIComponent(email)}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Pretplata nije uspjela');
            }

            return response.json();
        },
        onSuccess: () => {
            alert('Uspješno ste se pretplatili na newsletter.');
            queryClient.invalidateQueries(['subscribers']);
        },
        onError: (error) => {
            alert(error.message);
        },
    });


    return {
        subscribe: subscribeMutation.mutate,
    };
}
