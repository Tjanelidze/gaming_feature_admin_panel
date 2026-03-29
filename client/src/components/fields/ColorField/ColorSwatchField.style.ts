import type {SxProps, Theme} from '@mui/material';

export const colorSwatchFieldStyles = {
    wrapper: (): SxProps<Theme> => ({
        position: 'relative',
        width: 40,
        height: 40,
    }),

    swatch: (value: string): SxProps<Theme> => ({
        width: 40,
        height: 40,
        borderRadius: 1,
        bgcolor: value,
        border: 1,
        borderColor: 'divider',
        cursor: 'pointer',
    }),
};