import {Box, Button, Paper} from '@mui/material';
import {
    LeaderboardBasicFields
} from "@/features/leaderboard/components/LeaderboardForm/components/LeaderboardBasicFields/LeaderboardBasicFields.tsx";
import {
    LeaderboardPrizeList
} from "@/features/leaderboard/components/LeaderboardForm/components/LeaderboardPrizeList/LeaderboardPrizeList.tsx";


interface LeaderboardFormProps {
    isPending: boolean;
    submitLabel?: string;
}

export const LeaderboardForm = ({isPending, submitLabel = 'Create Leaderboard'}: LeaderboardFormProps) => (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Paper sx={{p: 2}}>
            <LeaderboardBasicFields/>
        </Paper>
        <Paper sx={{p: 2}}>
            <LeaderboardPrizeList/>
        </Paper>
        <Button type="submit" variant="contained" size="large" disabled={isPending} fullWidth>
            {isPending ? 'Saving...' : submitLabel}
        </Button>
    </Box>
);