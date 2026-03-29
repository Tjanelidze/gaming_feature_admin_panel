import type {SxProps, Theme} from '@mui/material';

export const colorFieldStyles = {
    swatchWrapper: (): SxProps<Theme> => ({
        position: 'relative',
        width: 32,
        height: 32,
        flexShrink: 0,
    }),

    swatch: (value: string): SxProps<Theme> => ({
        width: 32,
        height: 32,
        borderRadius: 1,
        bgcolor: value,
        border: 1,
        borderColor: 'divider',
        cursor: 'pointer',
    }),
};