import {useMutation, useQueryClient} from '@tanstack/react-query';
import {leaderboardApi} from '../api/leaderboard.api.ts';
import {LEADERBOARD_QUERY_KEYS} from '../constants/leaderboard.query-keys.ts';
import toast from 'react-hot-toast';
import type {LeaderboardStatus} from '../types/leaderboard.types.ts';

export const useBulkUpdateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ids, status}: { ids: string[]; status: LeaderboardStatus }) =>
            leaderboardApi.bulkUpdateStatus(ids, status),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: LEADERBOARD_QUERY_KEYS.all});
            toast.success('Status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update status');
        },
    });
};