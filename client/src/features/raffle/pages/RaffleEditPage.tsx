import {useEffect} from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useBlocker, useNavigate, useParams} from 'react-router-dom';
import {flushSync} from 'react-dom';
import {type RaffleUpdateBody, updateRaffleSchema} from '../validators/raffle.validator.ts';
import {useRaffle} from '../hooks/useRaffle.ts';
import {useUpdateRaffle} from '../hooks/useUpdateRaffle.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {RaffleForm} from '../components/RaffleForm/RaffleForm.tsx';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';

export const RaffleEditPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useRaffle(id!);

    const methods = useForm<RaffleUpdateBody>({
        resolver: zodResolver(updateRaffleSchema),
    });

    const {formState: {isDirty}} = methods;
    const blocker = useBlocker(isDirty);

    const {mutate: updateRaffle, isPending} = useUpdateRaffle(id!, () => {
        flushSync(() => {
            methods.reset(methods.getValues());
        });
        navigate(RoutesPaths.RAFFLE);
    });

    useEffect(() => {
        if (data?.data.raffle) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {id: _, createdAt: __, updatedAt: ___, ...rest} = data.data.raffle;
            methods.reset(rest);
        }
    }, [data, methods]);

    const onSubmit = (formData: RaffleUpdateBody) => updateRaffle(formData);

    if (isLoading) return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}}>
            <CircularProgress/>
        </Box>
    );

    if (isError || !data) return (
        <Typography color="error" sx={{mt: 4}}>Failed to load raffle</Typography>
    );

    return (
        <Box>
            <ConfirmDialog
                open={blocker.state === 'blocked'}
                title="Unsaved Changes"
                description="You have unsaved changes. Are you sure you want to leave? All changes will be lost."
                onConfirm={() => blocker.proceed?.()}
                onCancel={() => blocker.reset?.()}
                confirmLabel="Leave"
                cancelLabel="Stay"
            />

            <PageHeader
                title="Edit Raffle"
                breadcrumbs={[
                    {label: 'Raffles', path: RoutesPaths.RAFFLE},
                    {label: data.data.raffle.name},
                ]}
            />

            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <RaffleForm isPending={isPending} submitLabel="Save Changes"/>
                </Box>
            </FormProvider>
        </Box>
    );
};