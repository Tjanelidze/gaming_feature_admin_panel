import {useQuery} from '@tanstack/react-query';
import {leaderboardApi} from '../api/leaderboard.api.ts';
import {LEADERBOARD_QUERY_KEYS} from '../constants/leaderboard.query-keys.ts';
import type {LeaderboardQueryParams} from '../types/leaderboard.types.ts';

export const useLeaderboards = (params?: LeaderboardQueryParams) =>
    useQuery({
        queryKey: [...LEADERBOARD_QUERY_KEYS.all, params],
        queryFn: () => leaderboardApi.getAll(params).then((res) => res.data),
    });