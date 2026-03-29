import {
    Box,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import type {Column} from './DataTable.types.ts';
import type {SortOrder} from '@/features/wheel/types/wheel.types.ts';

interface DataTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    isLoading?: boolean;
    isError?: boolean;
    sortBy?: string;
    order?: SortOrder;
    onSort?: (key: string) => void;
    keyExtractor: (row: T) => string;
}

export const DataTable = <T, >({
                                   columns,
                                   rows,
                                   isLoading,
                                   isError,
                                   sortBy,
                                   order,
                                   onSort,
                                   keyExtractor,
                               }: DataTableProps<T>) => {
    const renderBody = () => {
        if (isLoading) {
            return Array.from({length: 5}).map((_, i) => (
                <TableRow key={i}>
                    {columns.map((_, j) => (
                        <TableCell key={j}><Skeleton/></TableCell>
                    ))}
                </TableRow>
            ));
        }

        if (isError) {
            return (
                <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                        <Typography color="error" sx={{py: 4}}>
                            Failed to load data
                        </Typography>
                    </TableCell>
                </TableRow>
            );
        }

        if (!rows.length) {
            return (
                <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                        <Box sx={{py: 6}}>
                            <Typography color="text.secondary" variant="h6">
                                No data found
                            </Typography>
                            <Typography color="text.disabled" variant="body2">
                                Try adjusting your filters
                            </Typography>
                        </Box>
                    </TableCell>
                </TableRow>
            );
        }

        return rows.map((row) => (
            <TableRow key={keyExtractor(row)} hover>
                {columns.map((col) => (
                    <TableCell key={String(col.key)} align={col.align ?? 'left'}>
                        {col.render
                            ? col.render(row)
                            : String(row[col.key as keyof T] ?? '')}
                    </TableCell>
                ))}
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} sx={{overflowX: 'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={String(col.key)} align={col.align ?? 'left'}>
                                {col.sortable && onSort ? (
                                    <TableSortLabel
                                        active={sortBy === col.key}
                                        direction={sortBy === col.key ? order : 'asc'}
                                        onClick={() => onSort(String(col.key))}
                                        hideSortIcon={false}
                                    >
                                        {col.label}
                                    </TableSortLabel>
                                ) : (
                                    col.label
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderBody()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};