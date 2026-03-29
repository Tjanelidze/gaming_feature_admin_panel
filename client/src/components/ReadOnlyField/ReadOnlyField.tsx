import {Box, Typography} from '@mui/material';

interface ReadOnlyFieldProps {
    label: string;
    value: string | number;
}

export const ReadOnlyField = ({label, value}: ReadOnlyFieldProps) => (
    <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="body2" fontWeight={500}>{value}</Typography>
    </Box>
);