import {Box, Pagination} from '@mui/material';

interface TablePaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export const TablePagination = ({page, totalPages, onChange}: TablePaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => onChange(value)}
                color="primary"
            />
        </Box>
    );
};