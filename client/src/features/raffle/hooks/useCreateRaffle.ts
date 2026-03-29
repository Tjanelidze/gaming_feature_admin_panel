import {useMutation, useQueryClient} from '@tanstack/react-query';
import {raffleApi} from '../api/raffle.api.ts';
import {RAFFLE_QUERY_KEYS} from '../constants/raffle.query-keys.ts';
import toast from 'react-hot-toast';
import type {RaffleReqBody} from '../validators/raffle.validator.ts';

export const useCreateRaffle = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: RaffleReqBody) => raffleApi.create(body),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: RAFFLE_QUERY_KEYS.all});
            toast.success('Raffle created successfully');
            onSuccess?.();
        },
        onError: () => {
            toast.error('Failed to create raffle');
        },
    });
};