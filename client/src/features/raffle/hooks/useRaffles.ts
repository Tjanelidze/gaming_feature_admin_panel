import {useQuery} from '@tanstack/react-query';
import {raffleApi} from '../api/raffle.api.ts';
import {RAFFLE_QUERY_KEYS} from '../constants/raffle.query-keys.ts';
import type {RaffleQueryParams} from '../types/raffle.types.ts';

export const useRaffles = (params?: RaffleQueryParams) =>
    useQuery({
        queryKey: [...RAFFLE_QUERY_KEYS.all, params],
        queryFn: () => raffleApi.getAll(params).then((res) => res.data),
    });