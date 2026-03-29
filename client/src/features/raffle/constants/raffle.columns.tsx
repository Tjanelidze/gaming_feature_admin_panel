import type {Column} from '@/components/DataTable/DataTable.types.ts';
import type {IRaffle} from '../types/raffle.types.ts';
import {RaffleStatusChip} from '../components/RaffleStatusChip/RaffleStatusChip.tsx';
import {RaffleActions} from '../components/RaffleActions/RaffleActions.tsx';

export const RAFFLE_COLUMNS: Column<IRaffle>[] = [
    {key: 'name', label: 'Name', sortable: true},
    {
        key: 'status',
        label: 'Status',
        render: (row) => <RaffleStatusChip status={row.status}/>,
    },
    {
        key: 'ticketPrice',
        label: 'Ticket Price',
    },
    {
        key: 'startDate',
        label: 'Start Date',
        sortable: true,
        render: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
        key: 'endDate',
        label: 'End Date',
        sortable: true,
        render: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
        key: 'drawDate',
        label: 'Draw Date',
        sortable: true,
        render: (row) => new Date(row.drawDate).toLocaleDateString(),
    },
    {
        key: 'prizes',
        label: 'Prizes',
        render: (row) => row.prizes.length,
    },
    {
        key: 'actions',
        label: '',
        align: 'right',
        render: (row) => <RaffleActions raffle={row}/>,
    },
];