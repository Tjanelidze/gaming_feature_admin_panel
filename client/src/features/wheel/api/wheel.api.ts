import type {IWheel, WheelQueryParams} from "@/features/wheel/types/wheel.types.ts";
import instance from "@/api/axios.instance.ts";
import type {WheelReqBody, WheelUpdateBody} from "@/features/wheel/validators/wheel.validator.ts";

const BASE = "/api/v1/wheels";

export const wheelApi = {
    getAll: (params?: WheelQueryParams) => instance.get<{
        data: { wheels: IWheel[] },
        total: number;
        totalPages: number
    }>(BASE, {params}),

    create: (body: WheelReqBody) =>
        instance.post<{ data: { wheel: IWheel } }>(BASE, body),

    getById: (id: string) =>
        instance.get<{ data: { wheel: IWheel } }>(`${BASE}/${id}`),

    update: (id: string, body: WheelUpdateBody) =>
        instance.patch<{ data: { wheel: IWheel } }>(`${BASE}/${id}`, body),

    delete: (id: string) =>
        instance.delete(`${BASE}/${id}`),
};