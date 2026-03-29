import type {Column} from "@/components/DataTable/DataTable.types.ts";
import type {IWheel} from "@/features/wheel/types/wheel.types.ts";
import {WheelStatusChip} from "@/features/wheel/components/WheelStatusChip/WheelStatusChip.tsx";
import {WheelActions} from "@/features/wheel/components/WheelActions/WheelActions.tsx";

export const WHEEL_COLUMNS: Column<IWheel>[] = [
    {key: 'name', label: 'Name', sortable: true},
    {
        key: 'status',
        label: 'Status',
        render: (row) => <WheelStatusChip status={row.status}/>,
    },
    {
        key: 'segments',
        label: 'Segments',
        render: (row) => row.segments.length,
    },
    {key: 'spinCost', label: 'Spin Cost'},
    {key: 'maxSpinsPerUser', label: 'Max Spins'},
    {
        key: 'createdAt',
        label: 'Created At',
        sortable: true,
        render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
        key: 'actions',
        label: '',
        align: 'right',
        render: (row) => <WheelActions wheel={row}/>,
    },
];