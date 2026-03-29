import type {SxProps, Theme} from '@mui/material';

export const dateRangeFilterStyles = {
    container: (): SxProps<Theme> => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        px: 1.5,
        height: 40,
        bgcolor: 'background.paper',
    }),

    label: (): SxProps<Theme> => ({
        whiteSpace: 'nowrap',
        fontWeight: 600,
        fontSize: 12,
    }),

    input: (): SxProps<Theme> => ({
        width: 130,
        '& .MuiOutlinedInput-root': {
            height: 28,
            fontSize: 12,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid',
            borderColor: 'divider',
        },
        '& .MuiInputBase-input': {
            px: 1,
            py: 0,
            fontSize: 12,
        },
        '& input[type=date]::-webkit-calendar-picker-indicator': {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
        },
    }),

    separator: (): SxProps<Theme> => ({
        color: 'text.disabled',
        fontSize: 12,
    }),

    clearButton: (): SxProps<Theme> => ({
        color: 'primary.main',
        cursor: 'pointer',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        '&:hover': {opacity: 0.8},
    }),
};