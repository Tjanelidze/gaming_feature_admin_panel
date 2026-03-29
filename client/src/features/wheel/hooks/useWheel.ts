import {useQuery} from '@tanstack/react-query';
import {wheelApi} from '@/features/wheel/api/wheel.api.ts';
import {WHEEL_QUERY_KEYS} from "@/features/wheel/constants/wheel.query-keys.ts";

export const useWheel = (id: string) =>
    useQuery({
        queryKey: WHEEL_QUERY_KEYS.detail(id),
        queryFn: () => wheelApi.getById(id).then((res) => res.data),
        enabled: !!id,
    });