import {Divider, Paper, Typography} from '@mui/material';
import type {ReactNode} from 'react';

interface SectionCardProps {
    title: string;
    children: ReactNode;
}

export const SectionCard = ({title, children}: SectionCardProps) => (
    <Paper sx={{p: 2}}>
        <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary">
            {title}
        </Typography>
        <Divider sx={{my: 1}}/>
        {children}
    </Paper>
);