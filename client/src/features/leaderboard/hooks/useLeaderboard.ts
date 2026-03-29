import {useQuery} from '@tanstack/react-query';
import {leaderboardApi} from '../api/leaderboard.api.ts';
import {LEADERBOARD_QUERY_KEYS} from '../constants/leaderboard.query-keys.ts';

export const useLeaderboard = (id: string) =>
    useQuery({
        queryKey: LEADERBOARD_QUERY_KEYS.detail(id),
        queryFn: () => leaderboardApi.getById(id).then((res) => res.data),
        enabled: !!id,
    });