import {createTheme, type Theme} from "@mui/material";
import {colors} from "./colors.style.ts";

export const rootTheme = (mode: 'light' | 'dark'): Theme => createTheme({
    palette: {
        mode,
        primary: {
            main: colors.primary.main
        },
        secondary: {
            main: mode === 'dark' ? colors.secondary.dark : colors.secondary.light
        },
        error: {
            main: colors.error.main
        },
        background: {
            default: mode === 'dark' ? colors.background.dark : colors.background.light,
            paper: mode === 'dark' ? colors.background.darkPaper : colors.background.lightPaper,
        }
    },
    components: {
        MuiTableSortLabel: {
            styleOverrides: {
                icon: {
                    opacity: 1,
                },
            },
        },
    }
});