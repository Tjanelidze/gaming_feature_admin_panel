import instance from '@/api/axios.instance.ts';
import type {IRaffle, RaffleListResponse, RaffleQueryParams} from '../types/raffle.types.ts';
import type {RaffleReqBody, RaffleUpdateBody} from '@/features/raffle/validators/raffle.validator.ts';

const BASE = '/api/v1/raffle';

export const raffleApi = {
    getAll: (params?: RaffleQueryParams) =>
        instance.get<RaffleListResponse>(BASE, {params}),

    getById: (id: string) =>
        instance.get<{ data: { raffle: IRaffle } }>(`${BASE}/${id}`),

    create: (body: RaffleReqBody) =>
        instance.post<{ data: { raffle: IRaffle } }>(BASE, body),

    update: (id: string, body: RaffleUpdateBody) =>
        instance.patch<{ data: { raffle: IRaffle } }>(`${BASE}/${id}`, body),

    delete: (id: string) =>
        instance.delete(`${BASE}/${id}`),
};