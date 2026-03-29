import {useMutation, useQueryClient} from '@tanstack/react-query';
import {wheelApi} from '@/features/wheel/api/wheel.api.ts';
import toast from 'react-hot-toast';
import type {WheelUpdateBody} from '@/features/wheel/validators/wheel.validator.ts';
import {WHEEL_QUERY_KEYS} from "@/features/wheel/constants/wheel.query-keys.ts";

export const useUpdateWheel = (id: string, onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: WheelUpdateBody) => wheelApi.update(id, body),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: WHEEL_QUERY_KEYS.all});
            void queryClient.invalidateQueries({queryKey: WHEEL_QUERY_KEYS.detail(id)});
            toast.success('Wheel updated successfully');
            onSuccess?.();
        },
        onError: () => {
            toast.error('Failed to update wheel');
        },
    });
};