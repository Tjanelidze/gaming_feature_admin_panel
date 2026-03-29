import instance from '@/api/axios.instance.ts';
import type {ILeaderboard, LeaderboardListResponse, LeaderboardQueryParams} from '../types/leaderboard.types.ts';
import type {
    LeaderboardReqBody,
    LeaderboardUpdateBody
} from "@/features/leaderboard/validators/leaderboard.validator.ts";

const BASE = '/api/v1/leaderboard';

export const leaderboardApi = {
    getAll: (params?: LeaderboardQueryParams) =>
        instance.get<LeaderboardListResponse>(BASE, {params}),

    getById: (id: string) =>
        instance.get<{ data: { leaderboard: ILeaderboard } }>(`${BASE}/${id}`),

    create: (body: LeaderboardReqBody) =>
        instance.post<{ data: { leaderboard: ILeaderboard } }>(BASE, body),

    update: (id: string, body: LeaderboardUpdateBody) =>
        instance.patch<{ data: { leaderboard: ILeaderboard } }>(`${BASE}/${id}`, body),

    delete: (id: string) =>
        instance.delete(`${BASE}/${id}`),

    bulkUpdateStatus: (ids: string[], status: string) =>
        instance.patch(`${BASE}/bulk-status`, {ids, status}),
};