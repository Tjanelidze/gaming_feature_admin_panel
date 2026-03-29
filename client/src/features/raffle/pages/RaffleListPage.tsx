import {Box} from '@mui/material';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useRaffles} from '../hooks/useRaffles.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {TableFilters} from '@/components/TableFilters/TableFilters.tsx';
import {StatusFilter} from '@/components/StatusFilter/StatusFilter.tsx';
import {DataTable} from '@/components/DataTable/DataTable.tsx';
import {TablePagination} from '@/components/TablePagination/TablePagination.tsx';
import {RAFFLE_COLUMNS} from '../constants/raffle.columns.tsx';
import {RAFFLE_STATUS_OPTIONS} from '../constants/raffle.constants.ts';
import RoutesPaths from '@/routes/routesPaths.ts';
import type {RaffleSortBy, RaffleStatus, SortOrder} from '../types/raffle.types.ts';
import {DateRangeFilter} from "@/components/DateRangeFilter/DateRangeFilter.tsx";

export const RaffleListPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? 1);
    const status = (searchParams.get('status') ?? '') as RaffleStatus | '';
    const sortBy = (searchParams.get('sortBy') ?? 'createdAt') as RaffleSortBy;
    const order = (searchParams.get('order') ?? 'desc') as SortOrder;

    const startDateFrom = searchParams.get('startDateFrom') ?? '';
    const endDateTo = searchParams.get('endDateTo') ?? '';

    const {data, isLoading, isError} = useRaffles({
        page,
        limit: 10,
        sortBy,
        order,
        status: status || undefined,
        startDateFrom: startDateFrom || undefined,
        endDateTo: endDateTo || undefined,
    });


    const updateParams = (updates: Record<string, string>) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            Object.entries(updates).forEach(([key, value]) => {
                if (value) next.set(key, value);
                else next.delete(key);
            });

            return next;
        });
    };

    const handleSort = (key: string) => {
        if (sortBy === key) updateParams({sortBy: key, order: order === 'asc' ? 'desc' : 'asc'});
        else updateParams({sortBy: key, order: 'asc'});
    };

    return (
        <Box>
            <PageHeader
                title="Raffles"
                onCreateClick={() => navigate(RoutesPaths.RAFFLE_CREATE)}
                createLabel="Create Raffle"
                breadcrumbs={[
                    {label: 'Raffles'},
                ]}
            />

            <TableFilters>
                <StatusFilter
                    value={status}
                    onChange={(val) => updateParams({status: val, page: '1'})}
                    options={RAFFLE_STATUS_OPTIONS}
                />
                <DateRangeFilter
                    label="Start Date"
                    fromValue={startDateFrom}
                    toValue={endDateTo}
                    onFromChange={(val) => updateParams({startDateFrom: val, page: '1'})}
                    onToChange={(val) => updateParams({endDateTo: val, page: '1'})}
                    onClear={() => updateParams({startDateFrom: '', endDateTo: '', page: '1'})}
                />
            </TableFilters>

            <DataTable
                columns={RAFFLE_COLUMNS}
                rows={data?.data.raffles ?? []}
                isLoading={isLoading}
                isError={isError}
                sortBy={sortBy}
                order={order}
                onSort={handleSort}
                keyExtractor={(row) => row.id}
            />

            <TablePagination
                page={page}
                totalPages={data?.totalPages ?? 0}
                onChange={(val) => updateParams({page: String(val)})}
            />
        </Box>
    );
};