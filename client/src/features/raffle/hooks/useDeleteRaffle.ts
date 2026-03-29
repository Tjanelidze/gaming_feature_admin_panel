import {useMutation, useQueryClient} from '@tanstack/react-query';
import {raffleApi} from '../api/raffle.api.ts';
import {RAFFLE_QUERY_KEYS} from '../constants/raffle.query-keys.ts';
import toast from 'react-hot-toast';

export const useDeleteRaffle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => raffleApi.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: RAFFLE_QUERY_KEYS.all});
            toast.success('Raffle deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete raffle');
        },
    });
};