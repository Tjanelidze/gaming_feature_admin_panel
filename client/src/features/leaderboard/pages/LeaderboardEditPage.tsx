import {useEffect} from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useBlocker, useNavigate, useParams} from 'react-router-dom';
import {flushSync} from 'react-dom';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import {
    type LeaderboardUpdateBody,
    updateLeaderboardSchema
} from "@/features/leaderboard/validators/leaderboard.validator.ts";
import {LeaderboardForm} from "@/features/leaderboard/components/LeaderboardForm/LeaderboardForm.tsx";
import {useUpdateLeaderboard} from "@/features/leaderboard/hooks/useUpdateLeaderboard.ts";
import {useLeaderboard} from "@/features/leaderboard/hooks/useLeaderboard.ts";

export const LeaderboardEditPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useLeaderboard(id!);

    const methods = useForm<LeaderboardUpdateBody>({
        resolver: zodResolver(updateLeaderboardSchema),
    });

    const {formState: {isDirty}} = methods;
    const blocker = useBlocker(isDirty);

    const {mutate: updateLeaderboard, isPending} = useUpdateLeaderboard(id!, () => {
        flushSync(() => {
            methods.reset(methods.getValues());
        });
        navigate(RoutesPaths.LEADERBOARD);
    });

    useEffect(() => {
        if (data?.data.leaderboard) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {id: _, createdAt: __, updatedAt: ___, ...rest} = data.data.leaderboard;
            methods.reset(rest);
        }
    }, [data, methods]);

    const onSubmit = (formData: LeaderboardUpdateBody) => updateLeaderboard(formData);

    if (isLoading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}}><CircularProgress/></Box>;
    if (isError || !data) return <Typography color="error">Failed to load leaderboard</Typography>;

    return (
        <Box>
            <ConfirmDialog
                open={blocker.state === 'blocked'}
                title="Unsaved Changes"
                description="You have unsaved changes. Are you sure you want to leave?"
                onConfirm={() => blocker.proceed?.()}
                onCancel={() => blocker.reset?.()}
                confirmLabel="Leave"
                cancelLabel="Stay"
            />

            <PageHeader
                title="Edit Leaderboard"
                breadcrumbs={[
                    {label: 'Leaderboards', path: RoutesPaths.LEADERBOARD},
                    {label: data.data.leaderboard.title},
                ]}
            />

            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <LeaderboardForm isPending={isPending} submitLabel="Save Changes"/>
                </Box>
            </FormProvider>
        </Box>
    );
};