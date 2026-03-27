export interface ILeaderboard {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    status: LeaderboardStatus;
    scoringType: LeaderboardScoringType;
    prizes: LeaderboardPrize[];
    maxParticipants: number;
    createdAt: string;
    updatedAt: string;
}


interface LeaderboardPrize {
    id: string;
    rank: number;
    name: string;
    type: 'coins' | 'freeSpin' | 'bonus';
    amount: number;
    imageUrl?: string;
}

export type LeaderboardStatus = 'draft' | 'active' | 'completed';
export type LeaderboardScoringType = 'points' | 'wins' | 'wagered';
export type SortOrder = 'asc' | 'desc';
export type LeaderboardSortBy = keyof Pick<ILeaderboard, 'title' | 'startDate' | 'endDate' | 'createdAt'>;

export type LeaderboardQueryParams = {
    page?: string;
    limit?: string;
    sortBy?: LeaderboardSortBy;
    order?: SortOrder;
    status?: LeaderboardStatus;
};

export type LeaderboardParams = {
    id: string;
}