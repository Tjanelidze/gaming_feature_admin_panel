import type {SxProps, Theme} from '@mui/material';

export const colorReadOnlyStyles = {
    row: (): SxProps<Theme> => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: 0.5,
    }),
    swatch: (value: string): SxProps<Theme> => ({
        width: 20,
        height: 20,
        borderRadius: 0.5,
        bgcolor: value,
        border: 1,
        borderColor: 'divider',
    }),
};