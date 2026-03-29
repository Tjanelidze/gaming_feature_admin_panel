import {Box} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useBlocker, useNavigate} from 'react-router-dom';
import {flushSync} from 'react-dom';
import {createRaffleSchema, type RaffleReqBody} from '../validators/raffle.validator.ts';
import {useCreateRaffle} from '../hooks/useCreateRaffle.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {RaffleForm} from '../components/RaffleForm/RaffleForm.tsx';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import {RAFFLE_DEFAULT_VALUES} from '../constants/raffle.constants.ts';
import RoutesPaths from '@/routes/routesPaths.ts';

export const RaffleCreatePage = () => {
    const navigate = useNavigate();

    const methods = useForm<RaffleReqBody>({
        resolver: zodResolver(createRaffleSchema),
        defaultValues: RAFFLE_DEFAULT_VALUES,
    });

    const {formState: {isDirty}} = methods;
    const blocker = useBlocker(isDirty);

    const {mutate: createRaffle, isPending} = useCreateRaffle(() => {
        flushSync(() => {
            methods.reset();
        });
        navigate(RoutesPaths.RAFFLE);
    });

    const onSubmit = (data: RaffleReqBody) => {
        console.log('start');
        createRaffle(data);
    };

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
                title="Create Raffle"
                breadcrumbs={[
                    {label: 'Raffles', path: RoutesPaths.RAFFLE},
                    {label: 'Create'},
                ]}
            />

            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log('Validation errors:', errors))}
                >
                    <RaffleForm isPending={isPending}/>
                </Box>
            </FormProvider>
        </Box>
    );
};