import {Component, type ReactNode} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {ErrorOutline} from '@mui/icons-material';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = {hasError: false, error: null};

    static getDerivedStateFromError(error: Error): State {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error) {
        console.error('ErrorBoundary caught:', error);
    }

    handleReset = () => {
        this.setState({hasError: false, error: null});
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 400,
                        gap: 2,
                        p: 4,
                    }}
                >
                    <ErrorOutline sx={{fontSize: 64, color: 'error.main'}}/>
                    <Typography variant="h5" fontWeight={700}>
                        Something went wrong
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={400}>
                        {this.state.error?.message ?? 'An unexpected error occurred'}
                    </Typography>
                    <Button variant="contained" onClick={this.handleReset}>
                        Try Again
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}