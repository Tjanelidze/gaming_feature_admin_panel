import type {SxProps, Theme} from "@mui/material";

export const sidebarStyles = {
    container: (width: number): SxProps<Theme> => ({
        width,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
    }),

    logo: (): SxProps<Theme> => ({
        display: 'flex',
        justifyContent: 'center',
        pb: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        mb: 2,
    }),

    navItem: (active: boolean): SxProps<Theme> => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.2,
        mx: 1,
        borderRadius: 1.5,
        cursor: 'pointer',
        color: active ? 'primary.main' : 'text.secondary',
        bgcolor: active ? 'action.selected' : 'transparent',
        borderLeft: active ? 3 : 3,
        borderColor: active ? 'primary.main' : 'transparent',
        transition: 'all 0.2s',
        '&:hover': {
            bgcolor: 'action.hover',
            color: 'text.primary',
        },
    }),
};