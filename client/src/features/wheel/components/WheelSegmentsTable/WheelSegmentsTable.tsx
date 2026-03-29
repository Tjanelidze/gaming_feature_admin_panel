import {Box, Chip, Divider, Typography} from '@mui/material';
import type {WheelSegment} from '@/features/wheel/types/wheel.types.ts';
import {SectionCard} from '@/components/SectionCard/SectionCard.tsx';
import {wheelSegmentsTableStyles} from "@/features/wheel/components/WheelSegmentsTable/WheelSegmentsTable.styles.ts";

const COLUMNS = ['Label', 'Color', 'Weight', 'Prize Type', 'Amount'];

interface WheelSegmentsTableProps {
    segments: WheelSegment[];
}

export const WheelSegmentsTable = ({segments}: WheelSegmentsTableProps) => (
    <SectionCard title={`Segments (${segments.length})`}>
        <Box sx={wheelSegmentsTableStyles.header()}>
            {COLUMNS.map((col) => (
                <Typography key={col} variant="caption" color="text.secondary" fontWeight={600}>
                    {col}
                </Typography>
            ))}
        </Box>
        <Divider sx={wheelSegmentsTableStyles.divider()}/>
        {segments.map((seg) => (
            <Box
                key={seg.id}
                sx={wheelSegmentsTableStyles.row()}
            >
                <Typography variant="body2">{seg.label}</Typography>
                <Box sx={wheelSegmentsTableStyles.colorSwatch(seg.color)}/>
                <Typography variant="body2">{seg.weight}%</Typography>
                <Chip label={seg.prizeType} size="small" variant="outlined"/>
                <Typography variant="body2">{seg.prizeAmount}</Typography>
            </Box>
        ))}
    </SectionCard>
);