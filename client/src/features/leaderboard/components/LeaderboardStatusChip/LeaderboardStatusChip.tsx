import {Chip} from '@mui/material';
import type {LeaderboardStatus} from '../../types/leaderboard.types.ts';

const STATUS_COLORS: Record<LeaderboardStatus, 'default' | 'success' | 'warning'> = {
    draft: 'default',
    active: 'success',
    completed: 'warning',
};

export const LeaderboardStatusChip = ({status}: { status: LeaderboardStatus }) => (
    <Chip label={status} color={STATUS_COLORS[status]} size="small"/>
);