import type {SxProps, Theme} from "@mui/material";

export const detailLayoutStyles = {
    container: (): SxProps<Theme> => ({
        display: 'flex',
        gap: 3,
        alignItems: 'flex-start',
    }),
    main: (): SxProps<Theme> => ({
        flex: '0 0 60%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }),
    aside: (): SxProps<Theme> => ({
        flex: '0 0 40%',
        position: 'sticky',
        top: 80,
    }),
};