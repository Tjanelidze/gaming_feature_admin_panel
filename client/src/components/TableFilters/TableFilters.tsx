import {Box} from '@mui/material';
import type {ReactNode} from "react";

interface TableFiltersProps {
    children: ReactNode;
}

export const TableFilters = ({children}: TableFiltersProps) => {
    return (
        <Box sx={{display: 'flex', gap: 2, mb: 2, alignItems: 'center'}}>
            {children}
        </Box>
    );
};