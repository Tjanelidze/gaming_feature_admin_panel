import {Box, Typography} from '@mui/material';
import {colorReadOnlyStyles} from "@/components/ColorReadOnly/ColorReadOnly.styles.ts";

interface ColorReadOnlyProps {
    label: string;
    value: string;
}

export const ColorReadOnly = ({label, value}: ColorReadOnlyProps) => (
    <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Box sx={colorReadOnlyStyles.row()}>
            <Box sx={colorReadOnlyStyles.swatch(value)}/>
            <Typography variant="body2" fontWeight={500}>{value}</Typography>
        </Box>
    </Box>
);