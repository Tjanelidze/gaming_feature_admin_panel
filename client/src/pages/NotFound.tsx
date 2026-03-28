import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SentimentDissatisfied} from "@mui/icons-material";
import {RoutesPaths} from "../routes/routesPaths.ts";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                gap: 2,
            }}
        >
            <SentimentDissatisfied sx={{fontSize: 80, color: 'text.disabled'}}/>

            <Typography variant="h1" fontWeight={700} color="primary">
                404
            </Typography>

            <Typography variant="h5" fontWeight={600}>
                Page Not Found
            </Typography>

            <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={400}>
                The page you're looking for doesn't exist or has been moved.
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={() => navigate(RoutesPaths.LEADERBOARD)}
                sx={{mt: 2}}
            >
                Back to Home
            </Button>
        </Box>
    );
};