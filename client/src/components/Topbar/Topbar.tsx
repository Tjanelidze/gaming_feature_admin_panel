import {Box, IconButton, Tooltip} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";
import {useThemeContext} from "../../context/ThemeContext.tsx";
import {topbarStyles} from "./Topbar.styles.ts";

export const Topbar = () => {
    const {mode, toggleMode} = useThemeContext();

    return (
        <Box component="header" sx={topbarStyles.container()}>
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton onClick={toggleMode} color="inherit">
                    {mode === 'dark' ? <LightMode/> : <DarkMode/>}
                </IconButton>
            </Tooltip>
        </Box>
    );
};