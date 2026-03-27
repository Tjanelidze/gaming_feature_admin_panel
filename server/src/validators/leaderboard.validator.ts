import {z} from 'zod';

const prizeSchema = z.object({
    id: z.string().optional(),
    rank: z.number().int().positive(),
    name: z.string().min(1, 'Name is required'),
    type: z.enum(['coins', 'freeSpin', 'bonus']),
    amount: z.number().positive(),
    imageUrl: z.url().optional().or(z.literal('')),
});

const leaderboardFields = {
    title: z.string().min(3).max(100),
    description: z.string().optional(),
    status: z.enum(['draft', 'active', 'completed']),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime(),
    scoringType: z.enum(['points', 'wins', 'wagered']),
    maxParticipants: z.number().int().min(2),
    prizes: z.array(prizeSchema).min(1, 'At least 1 prize required'),
};

export const createLeaderboardSchema = z.object(leaderboardFields)
    .refine(
        (l) => l.endDate > l.startDate,
        {message: 'endDate must be after startDate', path: ['endDate']}
    )
    .refine(
        (l) => {
            const ranks = l.prizes.map((p) => p.rank).sort((a, b) => a - b);

            return ranks.every((rank, i) => rank === i + 1);
        },
        {message: 'Prize ranks must be unique and sequential starting from 1', path: ['prizes']}
    );

export const updateLeaderboardSchema = z.object(
    Object.fromEntries(
        Object.entries(leaderboardFields).map(([key, val]) => [key, val.optional()])
    ) as { [K in keyof typeof leaderboardFields]: z.ZodOptional<typeof leaderboardFields[K]> }
)
    .refine(
        (l) => !l.endDate || !l.startDate || l.endDate > l.startDate,
        {message: 'endDate must be after startDate', path: ['endDate']}
    )
    .refine(
        (l) => {
            if (!l.prizes) return true;
            const ranks = l.prizes.map((p) => p.rank).sort((a, b) => a - b);

            return ranks.every((rank, i) => rank === i + 1);
        },
        {message: 'Prize ranks must be unique and sequential starting from 1', path: ['prizes']}
    );

export const bulkUpdateStatusSchema = z.object({
    ids: z.array(z.string()).min(1, 'At least one id required'),
    status: z.enum(['draft', 'active', 'completed']),
});

export type LeaderboardReqBody = z.infer<typeof createLeaderboardSchema>;
export type LeaderboardUpdateBody = z.infer<typeof updateLeaderboardSchema>;
export type BulkUpdateStatusBody = z.infer<typeof bulkUpdateStatusSchema>;