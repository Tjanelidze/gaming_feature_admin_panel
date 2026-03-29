import {useMutation, useQueryClient} from '@tanstack/react-query';
import {leaderboardApi} from '../api/leaderboard.api.ts';
import {LEADERBOARD_QUERY_KEYS} from '../constants/leaderboard.query-keys.ts';
import toast from 'react-hot-toast';
import type {LeaderboardReqBody} from '../validators/leaderboard.validator.ts';

export const useCreateLeaderboard = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: LeaderboardReqBody) => leaderboardApi.create(body),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: LEADERBOARD_QUERY_KEYS.all});
            toast.success('Leaderboard created successfully');
            onSuccess?.();
        },
        onError: () => {
            toast.error('Failed to create leaderboard');
        },
    });
};