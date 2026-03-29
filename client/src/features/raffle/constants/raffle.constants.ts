import type {RaffleStatus} from '../types/raffle.types.ts';
import type {RaffleReqBody} from '../validators/raffle.validator.ts';

export const RAFFLE_STATUS_OPTIONS: { label: string; value: RaffleStatus | '' }[] = [
    {label: 'All', value: ''},
    {label: 'Draft', value: 'draft'},
    {label: 'Active', value: 'active'},
    {label: 'Drawn', value: 'drawn'},
    {label: 'Cancelled', value: 'cancelled'},
];

export const RAFFLE_DEFAULT_VALUES: RaffleReqBody = {
    name: '',
    description: '',
    status: 'draft',
    startDate: '',
    endDate: '',
    drawDate: '',
    ticketPrice: 0,
    maxTicketsPerUser: 1,
    totalTicketLimit: null,
    prizes: [
        {name: '', type: 'coins', amount: 0, quantity: 1, imageUrl: ''},
    ],
};