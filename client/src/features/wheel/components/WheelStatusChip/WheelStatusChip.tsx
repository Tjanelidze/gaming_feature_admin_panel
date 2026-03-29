import {Chip} from '@mui/material';
import type {WheelStatus} from "@/features/wheel/types/wheel.types.ts";


const STATUS_COLORS: Record<WheelStatus, 'default' | 'success' | 'warning'> = {
    draft: 'default',
    active: 'success',
    inactive: 'warning',
};

interface WheelStatusChipProps {
    status: WheelStatus;
}

export const WheelStatusChip = ({status}: WheelStatusChipProps) => (
    <Chip label={status} color={STATUS_COLORS[status]} size="small"/>
);