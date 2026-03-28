import {Sidebar, SIDEBAR_WIDTH} from "./Sidebar/Sidebar.tsx";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Topbar} from "./Topbar/Topbar.tsx";

export const Layout = () => (
    <Box sx={{display: 'flex', minHeight: '100vh'}}>
        <Sidebar/>

        <Box sx={{flex: 1, ml: `${SIDEBAR_WIDTH}px`}}>
            <Topbar/>


            <Box component="main" sx={{p: 3}}>
                <Outlet/>
            </Box>
        </Box>
    </Box>
);