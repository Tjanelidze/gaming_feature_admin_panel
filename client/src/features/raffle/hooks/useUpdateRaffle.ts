import {useMutation, useQueryClient} from '@tanstack/react-query';
import {raffleApi} from '../api/raffle.api.ts';
import {RAFFLE_QUERY_KEYS} from '../constants/raffle.query-keys.ts';
import toast from 'react-hot-toast';
import type {RaffleUpdateBody} from '../validators/raffle.validator.ts';

export const useUpdateRaffle = (id: string, onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: RaffleUpdateBody) => raffleApi.update(id, body),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: RAFFLE_QUERY_KEYS.all});
            void queryClient.invalidateQueries({queryKey: RAFFLE_QUERY_KEYS.detail(id)});
            toast.success('Raffle updated successfully');
            onSuccess?.();
        },
        onError: () => {
            toast.error('Failed to update raffle');
        },
    });
};