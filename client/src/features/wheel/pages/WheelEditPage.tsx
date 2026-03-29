import {useEffect} from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useBlocker, useNavigate, useParams} from 'react-router-dom';
import {updateWheelSchema, type WheelUpdateBody} from '@/features/wheel/validators/wheel.validator.ts';
import {useWheel} from '@/features/wheel/hooks/useWheel.ts';
import {useUpdateWheel} from '@/features/wheel/hooks/useUpdateWheel.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {WheelForm} from '@/features/wheel/components/WheelForm/WheelForm.tsx';

import RoutesPaths from '@/routes/routesPaths.ts';
import {WheelPreviewObserver} from "@/features/wheel/components/WheelPreviewObserver/WheelPreviewObserver.tsx";
import {ConfirmDialog} from "@/components/ConfirmDialog/ConfirmDialog.tsx";
import {flushSync} from "react-dom";

export const WheelEditPage = () => {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading, isError} = useWheel(id!);
    const methods = useForm<WheelUpdateBody>({
        resolver: zodResolver(updateWheelSchema),
    });
    const navigate = useNavigate();
    const {mutate: updateWheel, isPending} = useUpdateWheel(id!, () => {
        flushSync(() => {
            methods.reset(methods.getValues());
        });
        navigate(RoutesPaths.WHEEL);
    });
    
    const {formState: {isDirty}} = methods;
    const blocker = useBlocker(isDirty);

    useEffect(() => {
        if (data?.data.wheel) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {id: _, createdAt: __, updatedAt: ___, ...rest} = data.data.wheel;
            methods.reset(rest);
        }
    }, [data, methods]);

    const onSubmit = (formData: WheelUpdateBody) => updateWheel(formData);

    if (isLoading) return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}}>
            <CircularProgress/>
        </Box>
    );

    if (isError) return (
        <Typography color="error" sx={{mt: 4}}>
            Failed to load wheel
        </Typography>
    );

    return (
        <Box>
            {isDirty && (
                <ConfirmDialog
                    open={blocker.state === 'blocked'}
                    title="Unsaved Changes"
                    description="You have unsaved changes. Are you sure you want to leave? All changes will be lost."
                    onConfirm={() => blocker.proceed?.()}
                    onCancel={() => blocker.reset?.()}
                    confirmLabel="Leave"
                    cancelLabel="Stay"
                />
            )}
            <PageHeader
                title="Edit Wheel"
                breadcrumbs={[
                    {label: 'Wheels', path: RoutesPaths.WHEEL},
                    {label: data?.data.wheel.name ?? 'Edit'},
                ]}
            />

            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    sx={{display: 'flex', gap: 2, alignItems: 'flex-start'}}
                >
                    <Box sx={{flex: '0 0 60%'}}>
                        <WheelForm isPending={isPending} submitLabel="Save Changes"/>
                    </Box>

                    <Box sx={{flex: '0 0 40%', position: 'sticky', top: 80}}>
                        {data && (
                            <WheelPreviewObserver
                                key={data.data.wheel.id}
                                initialSegments={data.data.wheel.segments}
                                initialBg={data.data.wheel.backgroundColor}
                                initialBorderColor={data.data.wheel.borderColor}
                            />
                        )}
                    </Box>
                </Box>
            </FormProvider>
        </Box>
    );
};