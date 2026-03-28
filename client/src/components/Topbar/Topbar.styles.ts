import type {SxProps, Theme} from "@mui/material";

export const topbarStyles = {
    container: (): SxProps<Theme> => ({
        height: 64,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: 3,
    }),
};