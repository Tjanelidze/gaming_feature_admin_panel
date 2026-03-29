import {Chip} from '@mui/material';
import type {RaffleStatus} from '../../types/raffle.types.ts';

const STATUS_COLORS: Record<RaffleStatus, 'default' | 'success' | 'error' | 'warning'> = {
    draft: 'default',
    active: 'success',
    drawn: 'warning',
    cancelled: 'error',
};

export const RaffleStatusChip = ({status}: { status: RaffleStatus }) => (
    <Chip label={status} color={STATUS_COLORS[status]} size="small"/>
);