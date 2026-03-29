import {Box,} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

import type {SortOrder, WheelSortBy, WheelStatus} from "@/features/wheel/types/wheel.types.ts";
import {useWheels} from "@/features/wheel/hooks/useWheels.ts";
import RoutesPaths from "@/routes/routesPaths.ts";
import {STATUS_OPTIONS} from "@/features/wheel/constants/constants.ts";
import {PageHeader} from "@/components/PageHeader/PageHeader.tsx";
import {TableFilters} from "@/components/TableFilters/TableFilters.tsx";
import {StatusFilter} from "@/components/StatusFilter/StatusFilter.tsx";
import {DataTable} from "@/components/DataTable/DataTable.tsx";
import {WHEEL_COLUMNS} from "@/features/wheel/constants/wheel.columns.tsx";
import {TablePagination} from "@/components/TablePagination/TablePagination";

export const WheelListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const page = Number(searchParams.get('page') ?? 1);
    const status = (searchParams.get('status') ?? '') as WheelStatus | '';
    const sortBy = (searchParams.get('sortBy') ?? 'createdAt') as WheelSortBy;
    const order = (searchParams.get('order') ?? 'desc') as SortOrder;

    const {data, isLoading, isError} = useWheels({
        page,
        limit: 10,
        sortBy,
        order,
        status: status || undefined,
    });

    const updateParams = (updates: Record<string, string>) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    next.set(key, value);
                } else {
                    next.delete(key);
                }
            });

            return next;
        });
    };

    const handleSort = (key: string) => {
        if (sortBy === key) {
            updateParams({sortBy: key, order: order === 'asc' ? 'desc' : 'asc'});
        } else {
            updateParams({sortBy: key, order: 'asc'});
        }
    };

    const handleStatusChange = (val: WheelStatus | '') => {
        updateParams({status: val, page: '1'});
    };

    const handlePageChange = (val: number) => {
        updateParams({page: String(val)});
    };


    return (
        <Box>
            <PageHeader
                title="Wheels"
                onCreateClick={() => navigate(`${RoutesPaths.WHEEL}/create`)}
                createLabel={"Create Wheel"}
                breadcrumbs={[
                    {label: 'List'},
                ]}
            />
            <TableFilters>
                <StatusFilter
                    value={status}
                    onChange={handleStatusChange}
                    options={STATUS_OPTIONS}
                />
            </TableFilters>

            <DataTable
                columns={WHEEL_COLUMNS}
                rows={data?.data.wheels ?? []}
                isLoading={isLoading}
                isError={isError}
                sortBy={sortBy}
                order={order}
                onSort={handleSort}
                keyExtractor={(row) => row.id}
            />

            {data && data.totalPages > 1 && (
                <TablePagination
                    page={page}
                    totalPages={data?.totalPages ?? 0}
                    onChange={handlePageChange}
                />
            )}
        </Box>
    );
};