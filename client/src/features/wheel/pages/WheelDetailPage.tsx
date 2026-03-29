import {Box, CircularProgress, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {Edit} from '@mui/icons-material';
import {useWheel} from '@/features/wheel/hooks/useWheel.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {WheelStatusChip} from '@/features/wheel/components/WheelStatusChip/WheelStatusChip.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import {WheelPreview} from "@/features/wheel/components/WheelForm/components/WheelPreview/WheelPreview.tsx";
import {DetailLayout} from "@/components/DetailLayout/DetailLayout.tsx";
import {SectionCard} from "@/components/SectionCard/SectionCard.tsx";
import {ReadOnlyField} from "@/components/ReadOnlyField/ReadOnlyField.tsx";
import {WheelSegmentsTable} from "@/features/wheel/components/WheelSegmentsTable/WheelSegmentsTable.tsx";
import {ColorReadOnly} from "@/components/ColorReadOnly/ColorReadOnly.tsx";
import {DetailMetadata} from "@/components/DetailMetadata/DetailMetadata.tsx";


export const WheelDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useWheel(id!);

    if (isLoading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}}><CircularProgress/></Box>;
    if (isError || !data) return <Typography color="error">Failed to load wheel</Typography>;

    const wheel = data.data.wheel;

    return (
        <Box>
            <PageHeader
                title={wheel.name}
                breadcrumbs={[
                    {label: 'Wheels', path: RoutesPaths.WHEEL},
                    {label: wheel.name},
                ]}
                onCreateClick={() => navigate(`${RoutesPaths.WHEEL}/${id}/edit`)}
                createLabel="Edit Wheel"
                createIcon={<Edit/>}
            />

            <DetailLayout
                main={
                    <>
                        <SectionCard title="Basic Info">
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1.5}}>
                                <ReadOnlyField label="Name" value={wheel.name}/>
                                <ReadOnlyField label="Description" value={wheel.description || '—'}/>
                                <Box sx={{display: 'flex', gap: 4}}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Status</Typography>
                                        <Box sx={{mt: 0.5}}><WheelStatusChip status={wheel.status}/></Box>
                                    </Box>
                                    <ReadOnlyField label="Spin Cost" value={wheel.spinCost}/>
                                    <ReadOnlyField label="Max Spins / User" value={wheel.maxSpinsPerUser}/>
                                </Box>
                                <Box sx={{display: 'flex', gap: 4}}>
                                    <ColorReadOnly label="Background Color" value={wheel.backgroundColor}/>
                                    <ColorReadOnly label="Border Color" value={wheel.borderColor}/>
                                </Box>
                            </Box>
                        </SectionCard>

                        <WheelSegmentsTable segments={wheel.segments}/>
                        <DetailMetadata createdAt={wheel.createdAt} updatedAt={wheel.updatedAt}/>
                    </>
                }
                aside={
                    <WheelPreview
                        segments={wheel.segments}
                        backgroundColor={wheel.backgroundColor}
                        borderColor={wheel.borderColor}
                    />
                }
            />
        </Box>
    );
};