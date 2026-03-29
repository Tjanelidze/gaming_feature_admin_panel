import type {SxProps, Theme} from "@mui/material";

export const pageHeaderStyles = {
    breadcrumbActive: (): SxProps<Theme> => ({
        color: 'primary.main',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1,
    }),

    breadcrumbLink: (): SxProps<Theme> => ({
        color: 'text.disabled',
        cursor: 'pointer',
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 500,
        '&:hover': {color: 'text.secondary'},
    }),

    headerRow: (): SxProps<Theme> => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 2,
        borderBottom: 2,
        borderColor: 'primary.main',
    }),

    titleWrapper: (): SxProps<Theme> => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
    }),

    titleAccent: (): SxProps<Theme> => ({
        width: 4,
        height: 32,
        bgcolor: 'primary.main',
        borderRadius: 1,
    }),

    createButton: (): SxProps<Theme> => ({
        borderRadius: 2,
    }),
};