import {Box} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createWheelSchema, type WheelReqBody} from '@/features/wheel/validators/wheel.validator.ts';
import {useCreateWheel} from '@/features/wheel/hooks/useCreateWheel.ts';
import {PageHeader} from "@/components/PageHeader/PageHeader.tsx";

import RoutesPaths from '@/routes/routesPaths.ts';
import {WheelForm} from "@/features/wheel/components/WheelForm/WheelForm.tsx";
import {DEFAULT_VALUES} from "@/features/wheel/constants/constants.ts";
import {WheelPreviewObserver} from "@/features/wheel/components/WheelPreviewObserver/WheelPreviewObserver.tsx";
import {useBlocker, useNavigate} from "react-router-dom";
import {ConfirmDialog} from "@/components/ConfirmDialog/ConfirmDialog.tsx";
import {flushSync} from "react-dom";


export const WheelCreatePage = () => {
    const methods = useForm<WheelReqBody>({
        resolver: zodResolver(createWheelSchema),
        defaultValues: DEFAULT_VALUES,
    });
    const {formState: {isDirty}} = methods;
    const blocker = useBlocker(isDirty);
    const navigate = useNavigate();

    const {mutate: createWheel, isPending} = useCreateWheel(() => {
        flushSync(() => {
            methods.reset();
        });
        navigate(RoutesPaths.WHEEL);
    });

    const onSubmit = (data: WheelReqBody) => createWheel(data);

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
                title="Create Wheel"
                breadcrumbs={[
                    {label: 'Wheels', path: RoutesPaths.WHEEL},
                    {label: 'Create'},
                ]}
            />

            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    sx={{display: 'flex', gap: 2, alignItems: 'flex-start'}}
                >
                    <Box sx={{flex: '0 0 60%'}}>
                        <WheelForm isPending={isPending}/>
                    </Box>

                    <Box sx={{flex: '0 0 40%', position: 'sticky', top: 80}}>
                        <WheelPreviewObserver
                            initialSegments={DEFAULT_VALUES.segments}
                            initialBg={DEFAULT_VALUES.backgroundColor}
                            initialBorderColor={DEFAULT_VALUES.borderColor}
                        />
                    </Box>
                </Box>
            </FormProvider>
        </Box>
    );
};