export interface IWheel {
    id: string;
    name: string;
    description?: string;
    status: WheelStatus;
    segments: WheelSegment[];
    maxSpinsPerUser: number;
    spinCost: number;
    backgroundColor: string;
    borderColor: string;
    createdAt: string;
    updatedAt: string;
}

interface WheelSegment {
    id: string;
    label: string;
    color: string;
    prizeType: 'coins' | 'freeSpin' | 'bonus' | 'nothing';
    prizeAmount: number;
    imageUrl?: string;
}

export type WheelStatus = 'active' | 'inactive' | 'draft';
export type SortOrder = 'asc' | 'desc';
export type WheelSortBy = keyof Pick<IWheel, 'name' | 'createdAt' | 'updatedAt'>;

export type WheelQueryParams = {
    id?: string;
    page?: string;
    limit?: string;
    sortBy?: WheelSortBy;
    order?: SortOrder;
    status?: WheelStatus;
};

export type WheelParams = {
    id: string;
}