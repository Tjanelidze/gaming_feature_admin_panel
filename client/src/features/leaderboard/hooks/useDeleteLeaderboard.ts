import {useMutation, useQueryClient} from '@tanstack/react-query';
import {leaderboardApi} from '../api/leaderboard.api.ts';
import {LEADERBOARD_QUERY_KEYS} from '../constants/leaderboard.query-keys.ts';
import toast from 'react-hot-toast';

export const useDeleteLeaderboard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => leaderboardApi.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: LEADERBOARD_QUERY_KEYS.all});
            toast.success('Leaderboard deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete leaderboard');
        },
    });
};