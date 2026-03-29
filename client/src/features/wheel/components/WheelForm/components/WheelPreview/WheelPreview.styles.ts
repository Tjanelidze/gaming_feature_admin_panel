import type {SxProps, Theme} from '@mui/material';

export const wheelPreviewStyles = {
    container: (): SxProps<Theme> => ({
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        position: 'sticky',
        top: 80,
    }),

    weightIndicator: (isValid: boolean): SxProps<Theme> => ({
        color: isValid ? 'success.main' : 'error.main',
        fontWeight: 600,
    }),

    pointer: (): SxProps<Theme> => ({
        position: 'absolute',
        top: -8,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '20px solid rgba(255,255,255,0.3)',
        zIndex: 1,
    }),

    legend: (): SxProps<Theme> => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
    }),

    legendItem: (): SxProps<Theme> => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1,
    }),

    legendDot: (color: string): SxProps<Theme> => ({
        width: 10,
        height: 10,
        borderRadius: '50%',
        bgcolor: color,
        flexShrink: 0,
    }),
};