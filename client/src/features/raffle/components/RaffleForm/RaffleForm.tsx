import {Box, Button, Paper} from '@mui/material';
import {
    RaffleBasicFields
} from "@/features/raffle/components/RaffleForm/components/RaffleBasicFields/RaffleBasicFields.tsx";
import {
    RafflePrizeList
} from "@/features/raffle/components/RaffleForm/components/RafflePrizeList.tsx/RafflePrizeList.tsx";


interface RaffleFormProps {
    isPending: boolean;
    submitLabel?: string;
}

export const RaffleForm = ({isPending, submitLabel = 'Create Raffle'}: RaffleFormProps) => (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <Paper sx={{p: 2}}>
            <RaffleBasicFields/>
        </Paper>

        <Paper sx={{p: 2}}>
            <RafflePrizeList/>
        </Paper>

        <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
            fullWidth
        >
            {isPending ? 'Saving...' : submitLabel}
        </Button>
    </Box>
);