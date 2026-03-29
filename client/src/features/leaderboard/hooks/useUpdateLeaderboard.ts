import {useMutation, useQueryClient} from '@tanstack/react-query';
import {leaderboardApi} from '../api/leaderboard.api.ts';
import {LEADERBOARD_QUERY_KEYS} from '../constants/leaderboard.query-keys.ts';
import toast from 'react-hot-toast';
import type {LeaderboardUpdateBody} from '../validators/leaderboard.validator.ts';

export const useUpdateLeaderboard = (id: string, onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: LeaderboardUpdateBody) => leaderboardApi.update(id, body),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: LEADERBOARD_QUERY_KEYS.all});
            void queryClient.invalidateQueries({queryKey: LEADERBOARD_QUERY_KEYS.detail(id)});
            toast.success('Leaderboard updated successfully');
            onSuccess?.();
        },
        onError: () => {
            toast.error('Failed to update leaderboard');
        },
    });
};