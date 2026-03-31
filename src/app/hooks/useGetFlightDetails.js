import { useQuery } from '@tanstack/react-query';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';

export const useGetFlightDetails = () => {
    return useQuery({
        queryKey: ['flightDetails'],
        queryFn: async () => {
            // Placeholder: The endpoint string provided in the prompt was an empty space " "
            const response = await axiosFrontNodeInstance.get('access-type/list');
            return response.data;
        },
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
