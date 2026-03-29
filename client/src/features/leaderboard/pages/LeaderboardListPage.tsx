import {useState} from 'react';
import {Box, Button, ButtonGroup} from '@mui/material';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useLeaderboards} from '../hooks/useLeaderboards.ts';
import {useBulkUpdateStatus} from '../hooks/useBulkUpdateStatus.ts';
import {PageHeader} from '@/components/PageHeader/PageHeader.tsx';
import {TableFilters} from '@/components/TableFilters/TableFilters.tsx';
import {StatusFilter} from '@/components/StatusFilter/StatusFilter.tsx';
import {DataTable} from '@/components/DataTable/DataTable.tsx';
import {TablePagination} from '@/components/TablePagination/TablePagination.tsx';
import {getLeaderboardColumns} from '../constants/leaderboard.columns.tsx';
import {LEADERBOARD_STATUS_OPTIONS} from '../constants/leaderboard.constants.ts';
import RoutesPaths from '@/routes/routesPaths.ts';
import type {LeaderboardSortBy, LeaderboardStatus, SortOrder} from '../types/leaderboard.types.ts';

export const LeaderboardListPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const page = Number(searchParams.get('page') ?? 1);
    const status = (searchParams.get('status') ?? '') as LeaderboardStatus | '';
    const sortBy = (searchParams.get('sortBy') ?? 'createdAt') as LeaderboardSortBy;
    const order = (searchParams.get('order') ?? 'desc') as SortOrder;

    const {data, isLoading, isError} = useLeaderboards({
        page,
        limit: 10,
        sortBy,
        order,
        status: status || undefined,
    });

    const {mutate: bulkUpdate, isPending: isBulkPending} = useBulkUpdateStatus();

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

    const handleToggle = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleBulkStatus = (newStatus: LeaderboardStatus) => {
        if (!selectedIds.length) return;
        bulkUpdate({ids: selectedIds, status: newStatus}, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const columns = getLeaderboardColumns(selectedIds, handleToggle);

    return (
        <Box>
            <PageHeader
                title="Leaderboards"
                onCreateClick={() => navigate(RoutesPaths.LEADERBOARD_CREATE)}
                createLabel="Create Leaderboard"
                breadcrumbs={[
                    {label: 'Leaderboards'},
                ]}
            />

            <TableFilters>
                <StatusFilter
                    value={status}
                    onChange={(val) => updateParams({status: val, page: '1'})}
                    options={LEADERBOARD_STATUS_OPTIONS}
                />

                {selectedIds.length > 0 && (
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, ml: 'auto'}}>
                        <Box sx={{fontSize: 12, color: 'text.secondary'}}>
                            {selectedIds.length} selected
                        </Box>
                        <ButtonGroup size="small" disabled={isBulkPending}>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => handleBulkStatus('active')}
                            >
                                Set Active
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleBulkStatus('draft')}
                            >
                                Set Draft
                            </Button>
                        </ButtonGroup>
                    </Box>
                )}
            </TableFilters>

            <DataTable
                columns={columns}
                rows={data?.data.leaderboards ?? []}
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