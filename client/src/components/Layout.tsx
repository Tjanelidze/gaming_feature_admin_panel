import {Sidebar,} from "./Sidebar/Sidebar.tsx";
import {Box, useMediaQuery, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Topbar} from "./Topbar/Topbar.tsx";
import {ErrorBoundary} from "@/components/ErrorBoundary/ErrorBoundary.tsx";
import {SIDEBAR_WIDTH, SIDEBAR_WIDTH_SM} from "@/components/Sidebar/constants.ts";

export const Layout = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down(1070));
    const sidebarWidth = isSmall ? SIDEBAR_WIDTH_SM : SIDEBAR_WIDTH;

    return (
        <Box sx={{display: 'flex', minHeight: '100vh', minWidth: 1024}}>
            <Sidebar/>
            <Box sx={{
                flex: 1,
                ml: `${sidebarWidth}px`,
                width: `calc(100% - ${sidebarWidth}px)`,
                minWidth: 0,
            }}>
                <Topbar/>
                <Box component="main" sx={{p: 3}}>
                    <ErrorBoundary>
                        <Outlet/>
                    </ErrorBoundary>
                </Box>
            </Box>
        </Box>
    );
};