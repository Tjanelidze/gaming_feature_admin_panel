import {useMutation, useQueryClient} from '@tanstack/react-query';
import {wheelApi} from '@/features/wheel/api/wheel.api.ts';
import toast from 'react-hot-toast';
import {WHEEL_QUERY_KEYS} from "@/features/wheel/constants/wheel.query-keys.ts";

export const useDeleteWheel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => wheelApi.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: WHEEL_QUERY_KEYS.all});
            toast.success('Wheel deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete wheel');
        },
    });
};