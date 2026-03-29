export interface IRaffle {
    id: string;
    name: string;
    description?: string;
    startDate: string,
    endDate: string;
    drawDate: string;
    status: RaffleStatus;
    ticketPrice: number;
    maxTicketsPerUser: number;
    prizes: RafflePrize[];
    totalTicketLimit: number | null;
    createdAt: string;
    updatedAt: string;
}


export interface RafflePrize {
    id: string;
    name: string;
    type: 'coins' | 'freeSpin' | 'bonus';
    amount: number;
    quantity: number;
    imageUrl?: string;
}

export type RaffleStatus = 'draft' | 'active' | 'drawn' | 'cancelled';
export type SortOrder = 'asc' | 'desc';
export type RaffleSortBy = keyof Pick<IRaffle, 'name' | 'startDate' | 'endDate' | 'drawDate' | 'createdAt'>;

export type RaffleQueryParams = {
    page?: number;
    limit?: number;
    sortBy?: RaffleSortBy;
    order?: SortOrder;
    status?: RaffleStatus;
    startDateFrom?: string;
    endDateTo?: string;
};

export interface RaffleListResponse {
    status: string;
    total: number;
    totalPages: number;
    page: number;
    limit: number;
    data: {
        raffles: IRaffle[];
    };
}
