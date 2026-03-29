import type {Column} from '@/components/DataTable/DataTable.types.ts';

import {Checkbox} from '@mui/material';
import {LeaderboardStatusChip} from "@/features/leaderboard/components/LeaderboardStatusChip/LeaderboardStatusChip.tsx";
import type {ILeaderboard} from "@/features/leaderboard/types/leaderboard.types.ts";
import {LeaderboardActions} from "@/features/leaderboard/components/LeaderboardActions/LeaderboardActions.tsx";

export const getLeaderboardColumns = (
    selectedIds: string[],
    onToggle: (id: string) => void,
): Column<ILeaderboard>[] => [
    {
        key: 'select',
        label: '',
        render: (row) => (
            <Checkbox
                size="small"
                checked={selectedIds.includes(row.id)}
                onChange={() => onToggle(row.id)}
                onClick={(e) => e.stopPropagation()}
            />
        ),
    },
    {key: 'title', label: 'Title', sortable: true},
    {
        key: 'status',
        label: 'Status',
        render: (row) => <LeaderboardStatusChip status={row.status}/>,
    },
    {key: 'scoringType', label: 'Scoring Type'},
    {key: 'maxParticipants', label: 'Max Participants'},
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
        key: 'prizes',
        label: 'Prizes',
        render: (row) => row.prizes.length,
    },
    {
        key: 'actions',
        label: '',
        align: 'right',
        render: (row) => <LeaderboardActions leaderboard={row}/>,
    },
];