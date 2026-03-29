import type {SxProps, Theme} from '@mui/material';

export const wheelSegmentsTableStyles = {
    header: (): SxProps<Theme> => ({
        display: 'grid',
        gridTemplateColumns: '2fr 44px 70px 120px 90px',
        gap: 0.5,
        px: 0.5,
        mt: 1,
    }),
    divider: (): SxProps<Theme> => ({
        my: 1,
    }),
    row: (): SxProps<Theme> => ({
        display: 'grid',
        gridTemplateColumns: '2fr 44px 70px 120px 90px',
        gap: 0.5,
        px: 0.5,
        py: 0.75,
        alignItems: 'center',
        '&:not(:last-child)': {borderBottom: 1, borderColor: 'divider'},
    }),
    colorSwatch: (color: string): SxProps<Theme> => ({
        width: 28,
        height: 28,
        borderRadius: 1,
        bgcolor: color,
        border: 1,
        borderColor: 'divider',
    }),
};