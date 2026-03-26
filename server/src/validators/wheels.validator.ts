import {z} from 'zod';

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color');

const segmentSchema = z.object({
    label: z.string().min(1, 'Label is required'),
    color: hexColor,
    weight: z.number().positive(),
    prizeType: z.enum(['coins', 'bonus', 'freeSpin', 'nothing']),
    prizeAmount: z.number().min(0),
    imageUrl: z.string().url().optional().or(z.literal('')),
}).refine(
    (s) => s.prizeType === 'nothing' ? s.prizeAmount === 0 : s.prizeAmount > 0,
    {message: 'prizeAmount must be 0 for nothing, and > 0 otherwise'}
);

const wheelFields = {
    name: z.string().min(3).max(80),
    description: z.string().optional(),
    status: z.enum(['draft', 'active', 'inactive']),
    segments: z.array(segmentSchema).min(2).max(12),
    maxSpinsPerUser: z.number().int().min(1),
    spinCost: z.number().min(0),
    backgroundColor: hexColor,
    borderColor: hexColor,
};

export const createWheelSchema = z.object(wheelFields).refine(
    (w) => w.segments.reduce((sum, s) => sum + s.weight, 0) === 100,
    {message: 'Segment weights must sum to exactly 100', path: ['segments']}
);

export const updateWheelSchema = z.object(
    Object.fromEntries(
        Object.entries(wheelFields).map(([key, val]) => [key, val.optional()])
    ) as { [K in keyof typeof wheelFields]: z.ZodOptional<typeof wheelFields[K]> }
).refine(
    (w) => !w.segments || w.segments.reduce((sum, s) => sum + s.weight, 0) === 100,
    {message: 'Segment weights must sum to exactly 100', path: ['segments']}
);

export type WheelReqBody = z.infer<typeof createWheelSchema>;
export type WheelUpdateBody = z.infer<typeof updateWheelSchema>;