import type {LeaderboardReqBody} from '../validators/leaderboard.validator.ts';
import type {LeaderboardStatus} from '../types/leaderboard.types.ts';

export const LEADERBOARD_STATUS_OPTIONS: { label: string; value: LeaderboardStatus | '' }[] = [
    {label: 'All', value: ''},
    {label: 'Draft', value: 'draft'},
    {label: 'Active', value: 'active'},
    {label: 'Completed', value: 'completed'},
];

export const LEADERBOARD_DEFAULT_VALUES: LeaderboardReqBody = {
    title: '',
    description: '',
    status: 'draft',
    startDate: '',
    endDate: '',
    scoringType: 'points',
    maxParticipants: 10,
    prizes: [
        {rank: 1, name: '', type: 'coins', amount: 0, imageUrl: ''},
    ],
};