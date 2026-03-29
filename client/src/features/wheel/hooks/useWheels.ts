import type {WheelQueryParams} from "@/features/wheel/types/wheel.types.ts";
import {useQuery} from "@tanstack/react-query";
import {wheelApi} from "@/features/wheel/api/wheel.api.ts";
import {WHEEL_QUERY_KEYS} from "@/features/wheel/constants/wheel.query-keys.ts";

export const useWheels = (params?: WheelQueryParams) => useQuery({
    queryKey: WHEEL_QUERY_KEYS.all,
    queryFn: () => wheelApi.getAll(params).then(res => res.data),
});