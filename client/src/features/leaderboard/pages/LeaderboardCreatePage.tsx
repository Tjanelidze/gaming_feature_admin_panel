import {Box} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useBlocker, useNavigate} from 'react-router-dom';
import {flushSync} from 'react-dom';


import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import {LeaderboardForm} from "@/features/leaderboard/components/LeaderboardForm/LeaderboardForm.tsx";
import {
    createLeaderboardSchema,
    type LeaderboardReqBody
} from "@/features/leaderboard/validators/leaderboard.validator.ts";
import {useCreateLeaderboard} from "@/features/leaderboard/hooks/useCreateLeaderboard.ts";
import {LEADERBOARD_DEFAULT_VALUES} from "@/features/leaderboard/constants/leaderboard.constants.ts";

export const LeaderboardCreatePage = () => {
    const navigate = useNavigate();

    const methods = useForm<LeaderboardReqBody>({
        resolver: zodResolver(createLeaderboardSchema),
        defaultValues: LEADERBOARD_DEFAULT_VALUES,
    });

    const {formState: {isDirty}} = methods;
    const blocker = useBlocker(isDirty);

    const {mutate: createLeaderboard, isPending} = useCreateLeaderboard(() => {
        flushSync(() => {
            methods.reset();
        });
        navigate(RoutesPaths.LEADERBOARD);
    });

    const onSubmit = (data: LeaderboardReqBody) => createLeaderboard(data);

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
                title="Create wLeaderboard"
                breadcrumbs={[
                    {label: 'Leaderboards', path: RoutesPaths.LEADERBOARD},
                    {label: 'Create'},
                ]}
            />

            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <LeaderboardForm isPending={isPending}/>
                </Box>
            </FormProvider>
        </Box>
    );
};