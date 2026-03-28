import {Box, Typography} from "@mui/material";
import {Casino, ConfirmationNumber, Leaderboard,} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {sidebarStyles} from "./Sidebar.styles.ts";
import {RoutesPaths} from "../../routes/routesPaths.ts";
import {useThemeContext} from "../../context/ThemeContext.tsx";

const SIDEBAR_WIDTH = 240;

const navItems = [
    {label: 'Leaderboard', icon: <Leaderboard fontSize="small"/>, path: RoutesPaths.LEADERBOARD},
    {label: 'Raffle', icon: <ConfirmationNumber fontSize="small"/>, path: RoutesPaths.RAFFLE},
    {label: 'Wheel', icon: <Casino fontSize="small"/>, path: RoutesPaths.WHEEL},
];


export const Sidebar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {mode} = useThemeContext();

    return (
        <Box sx={sidebarStyles.container(SIDEBAR_WIDTH)}>
            <Box sx={sidebarStyles.logo()}>
                <img
                    src="/logo"
                    alt="OnAim"
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                        mixBlendMode: mode === 'dark' ? 'screen' : 'normal',
                        filter: mode === 'light'
                            ? 'invert(1) hue-rotate(175deg) saturate(2.5) brightness(1.05)'
                            : 'none',
                    }}
                />
            </Box>

            <Box sx={{flex: 1}}>
                {navItems.map((item) => (
                    <Box
                        key={item.label}
                        sx={sidebarStyles.navItem(pathname === item.path)}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <Typography variant="body2" fontWeight={pathname === item.path ? 600 : 400}>
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export {SIDEBAR_WIDTH};