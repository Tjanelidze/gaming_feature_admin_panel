import type {WheelStatus} from "@/features/wheel/types/wheel.types.ts";
import {getSegmentColor} from "@/features/wheel/constants/wheel.colors.ts";
import type {WheelReqBody} from "@/features/wheel/validators/wheel.validator.ts";

export const STATUS_OPTIONS: { label: string; value: WheelStatus | '' }[] = [
    {label: 'All', value: ''},
    {label: 'Draft', value: 'draft'},
    {label: 'Active', value: 'active'},
    {label: 'Inactive', value: 'inactive'},
];

export const DEFAULT_VALUES: WheelReqBody = {
    name: '',
    description: '',
    status: 'draft',
    segments: [
        {label: 'Segment 1', color: getSegmentColor(0), weight: 50, prizeType: 'nothing', prizeAmount: 0, imageUrl: ''},
        {label: 'Segment 2', color: getSegmentColor(1), weight: 50, prizeType: 'nothing', prizeAmount: 0, imageUrl: ''},
    ],
    maxSpinsPerUser: 1,
    spinCost: 0,
    backgroundColor: '#1A1A2E',
    borderColor: '#00E676',
};

export const SIZE = 280;
export const CX = SIZE / 2;
export const CY = SIZE / 2;
export const WHEEL_RADIUS = SIZE / 2 - 8;