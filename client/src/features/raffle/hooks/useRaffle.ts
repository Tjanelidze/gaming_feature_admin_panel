import {useQuery} from '@tanstack/react-query';
import {raffleApi} from '../api/raffle.api.ts';
import {RAFFLE_QUERY_KEYS} from '../constants/raffle.query-keys.ts';

export const useRaffle = (id: string) =>
    useQuery({
        queryKey: RAFFLE_QUERY_KEYS.detail(id),
        queryFn: () => raffleApi.getById(id).then((res) => res.data),
        enabled: !!id,
    });