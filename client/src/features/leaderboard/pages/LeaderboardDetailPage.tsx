import {Box, CircularProgress, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {Edit} from '@mui/icons-material';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {DetailLayout} from '@/components/DetailLayout/DetailLayout.tsx';
import {SectionCard} from '@/components/SectionCard/SectionCard.tsx';
import {ReadOnlyField} from '@/components/ReadOnlyField/ReadOnlyField.tsx';
import {DetailMetadata} from '@/components/DetailMetadata/DetailMetadata.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import {
    LeaderboardPrizesTable
} from "@/features/leaderboard/components/LeaderboardForm/components/LeaderboardPrizesTable/LeaderboardPrizesTable.tsx";
import {LeaderboardStatusChip} from "@/features/leaderboard/components/LeaderboardStatusChip/LeaderboardStatusChip.tsx";
import {useLeaderboard} from "@/features/leaderboard/hooks/useLeaderboard.ts";

export const LeaderboardDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useLeaderboard(id!);

    if (isLoading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}}><CircularProgress/></Box>;
    if (isError || !data) return <Typography color="error">Failed to load leaderboard</Typography>;

    const lb = data.data.leaderboard;

    return (
        <Box>
            <PageHeader
                title={lb.title}
                breadcrumbs={[
                    {label: 'Leaderboards', path: RoutesPaths.LEADERBOARD},
                    {label: lb.title},
                ]}
                onCreateClick={() => navigate(`${RoutesPaths.LEADERBOARD}/${id}/edit`)}
                createLabel="Edit Leaderboard"
                createIcon={<Edit/>}
            />

            <DetailLayout
                main={
                    <>
                        <SectionCard title="Basic Info">
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1.5}}>
                                <ReadOnlyField label="Title" value={lb.title}/>
                                <ReadOnlyField label="Description" value={lb.description || '—'}/>
                                <Box sx={{display: 'flex', gap: 4}}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Status</Typography>
                                        <Box sx={{mt: 0.5}}><LeaderboardStatusChip status={lb.status}/></Box>
                                    </Box>
                                    <ReadOnlyField label="Scoring Type" value={lb.scoringType}/>
                                    <ReadOnlyField label="Max Participants" value={lb.maxParticipants}/>
                                </Box>
                            </Box>
                        </SectionCard>

                        <SectionCard title="Dates">
                            <Box sx={{display: 'flex', gap: 4, mt: 1.5}}>
                                <ReadOnlyField label="Start Date" value={new Date(lb.startDate).toLocaleDateString()}/>
                                <ReadOnlyField label="End Date" value={new Date(lb.endDate).toLocaleDateString()}/>
                            </Box>
                        </SectionCard>

                        <LeaderboardPrizesTable prizes={lb.prizes}/>
                    </>
                }
                aside={
                    <Box display={'flex'} flexDirection={"column"} gap={3}>
                        <SectionCard title="Quick Stats">
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5}}>
                                <ReadOnlyField label="Total Prizes" value={lb.prizes.length}/>
                                <ReadOnlyField
                                    label="Days Remaining"
                                    value={Math.max(0, Math.ceil(
                                        (new Date(lb.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                    ))}
                                />
                                <ReadOnlyField
                                    label="Total Prize Pool"
                                    value={lb.prizes.reduce((sum, p) => sum + p.amount, 0)}
                                />
                            </Box>
                        </SectionCard>
                        <DetailMetadata createdAt={lb.createdAt} updatedAt={lb.updatedAt}/>
                    </Box>

                }
            />
        </Box>
    );
};