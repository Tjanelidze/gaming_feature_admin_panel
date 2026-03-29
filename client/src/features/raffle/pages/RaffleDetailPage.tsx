import {Box, CircularProgress, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {Edit} from '@mui/icons-material';
import {useRaffle} from '../hooks/useRaffle.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {DetailLayout} from '@/components/DetailLayout/DetailLayout.tsx';
import {SectionCard} from '@/components/SectionCard/SectionCard.tsx';
import {ReadOnlyField} from '@/components/ReadOnlyField/ReadOnlyField.tsx';
import {DetailMetadata} from '@/components/DetailMetadata/DetailMetadata.tsx';
import {RaffleStatusChip} from '../components/RaffleStatusChip/RaffleStatusChip.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import {RafflePrizesTable} from "@/features/raffle/components/RafflePrizesTable/RafflePrizesTable.tsx";

export const RaffleDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useRaffle(id!);

    if (isLoading) return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}}>
            <CircularProgress/>
        </Box>
    );

    if (isError || !data) return (
        <Typography color="error" sx={{mt: 4}}>Failed to load raffle</Typography>
    );

    const raffle = data.data.raffle;

    return (
        <Box>
            <PageHeader
                title={raffle.name}
                breadcrumbs={[
                    {label: 'Raffles', path: RoutesPaths.RAFFLE},
                    {label: raffle.name},
                ]}
                onCreateClick={() => navigate(`${RoutesPaths.RAFFLE}/${id}/edit`)}
                createLabel="Edit Raffle"
                createIcon={<Edit/>}
            />

            <DetailLayout
                main={
                    <>
                        <SectionCard title="Basic Info">
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1.5}}>
                                <ReadOnlyField label="Name" value={raffle.name}/>
                                <ReadOnlyField label="Description" value={raffle.description || '—'}/>
                                <Box sx={{display: 'flex', gap: 4}}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Status</Typography>
                                        <Box sx={{mt: 0.5}}>
                                            <RaffleStatusChip status={raffle.status}/>
                                        </Box>
                                    </Box>
                                    <ReadOnlyField label="Ticket Price" value={raffle.ticketPrice}/>
                                    <ReadOnlyField label="Max Tickets / User" value={raffle.maxTicketsPerUser}/>
                                    <ReadOnlyField label="Total Ticket Limit"
                                                   value={raffle.totalTicketLimit ?? 'Unlimited'}/>
                                </Box>
                            </Box>
                        </SectionCard>

                        <SectionCard title="Dates">
                            <Box sx={{display: 'flex', gap: 4, mt: 1.5}}>
                                <ReadOnlyField label="Start Date"
                                               value={new Date(raffle.startDate).toLocaleDateString()}/>
                                <ReadOnlyField label="End Date" value={new Date(raffle.endDate).toLocaleDateString()}/>
                                <ReadOnlyField label="Draw Date"
                                               value={new Date(raffle.drawDate).toLocaleDateString()}/>
                            </Box>
                        </SectionCard>

                        <DetailMetadata createdAt={raffle.createdAt} updatedAt={raffle.updatedAt}/>
                    </>
                }
                aside={
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <SectionCard title="Quick Stats">
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5}}>
                                <ReadOnlyField label="Total Prizes" value={raffle.prizes.length}/>
                                <ReadOnlyField
                                    label="Days Until Draw"
                                    value={
                                        Math.max(0, Math.ceil(
                                            (new Date(raffle.drawDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                        ))
                                    }
                                />
                                <ReadOnlyField
                                    label="Total Reward Pool"
                                    value={raffle.prizes.reduce((sum, p) => sum + p.amount * p.quantity, 0)}
                                />
                            </Box>
                        </SectionCard>

                        <RafflePrizesTable prizes={raffle.prizes}/>
                    </Box>
                }
            />
        </Box>
    );
};