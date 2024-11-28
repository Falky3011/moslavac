import { useQuery } from '@tanstack/react-query';

const fetchMatchesFromBackend = async () => {
    const response = await fetch('http://localhost:8080/api/matches');
    if (!response.ok) {
        throw new Error('Error fetching matches from backend');
    }
    return response.json();
};

const useGetAllMatches = () => {
    return useQuery({
        queryKey: ['allMatches'],
        queryFn: fetchMatchesFromBackend,
    });
};

export default useGetAllMatches;
