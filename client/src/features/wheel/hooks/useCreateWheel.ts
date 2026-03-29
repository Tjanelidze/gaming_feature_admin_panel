import {useMutation, useQueryClient} from '@tanstack/react-query';
import {wheelApi} from '@/features/wheel/api/wheel.api.ts';
import toast from 'react-hot-toast';
import type {WheelReqBody} from '@/features/wheel/validators/wheel.validator.ts';
import {WHEEL_QUERY_KEYS} from "@/features/wheel/constants/wheel.query-keys.ts";

export const useCreateWheel = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: WheelReqBody) => wheelApi.create(body),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: WHEEL_QUERY_KEYS.all});
            toast.success('Wheel created successfully');
            onSuccess?.();
        },
        onError: () => {
            toast.error('Failed to create wheel');
        },
    });
};