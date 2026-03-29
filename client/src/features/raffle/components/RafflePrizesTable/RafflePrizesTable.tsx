import {Box, Chip, Divider, Typography} from '@mui/material';
import {SectionCard} from '@/components/SectionCard/SectionCard.tsx';
import type {RafflePrize} from "@/features/raffle/types/raffle.types.ts";


const COLUMNS = ['Name', 'Type', 'Amount', 'Quantity'];
const GRID = '2fr 120px 100px 100px';

export const RafflePrizesTable = ({prizes}: { prizes: RafflePrize[] }) => (
    <SectionCard title={`Prizes (${prizes.length})`}>
        <Box sx={{display: 'grid', gridTemplateColumns: GRID, gap: 0.5, px: 0.5, mt: 1}}>
            {COLUMNS.map((col) => (
                <Typography key={col} variant="caption" color="text.secondary" fontWeight={600}>{col}</Typography>
            ))}
        </Box>
        <Divider sx={{my: 1}}/>
        {prizes.map((prize) => (
            <Box
                key={prize.id}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: GRID,
                    gap: 0.5,
                    px: 0.5,
                    py: 0.75,
                    alignItems: 'center',
                    '&:not(:last-child)': {borderBottom: 1, borderColor: 'divider'},
                }}
            >
                <Typography variant="body2">{prize.name}</Typography>
                <Chip label={prize.type} size="small" variant="outlined"/>
                <Typography variant="body2">{prize.amount}</Typography>
                <Typography variant="body2">{prize.quantity}</Typography>
            </Box>
        ))}
    </SectionCard>
);