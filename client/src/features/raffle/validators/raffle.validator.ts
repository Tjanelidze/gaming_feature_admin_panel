import {z} from 'zod';

const prizeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    type: z.enum(['coins', 'freeSpin', 'bonus']),
    amount: z.number().min(0),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    imageUrl: z.url().optional().or(z.literal('')),
});

const raffleFields = {
    name: z.string().min(3).max(80),
    description: z.string().optional(),
    status: z.enum(['draft', 'active', 'drawn', 'cancelled']),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime(),
    drawDate: z.iso.datetime(),
    ticketPrice: z.number().positive(),
    maxTicketsPerUser: z.number().int().min(1),
    totalTicketLimit: z.number().int().positive().nullable(),
    prizes: z.array(prizeSchema).min(1),
};

export const createRaffleSchema = z.object(raffleFields)
    .refine((r) => r.endDate > r.startDate, {
        message: 'endDate must be after startDate',
        path: ['endDate'],
    })
    .refine((r) => r.drawDate > r.endDate, {
        message: 'drawDate must be after endDate',
        path: ['drawDate'],
    });

export const updateRaffleSchema = z.object(
    Object.fromEntries(
        Object.entries(raffleFields).map(([key, val]) => [key, val.optional()])
    ) as { [K in keyof typeof raffleFields]: z.ZodOptional<typeof raffleFields[K]> }
)
    .refine((r) => !r.endDate || !r.startDate || r.endDate > r.startDate, {
        message: 'endDate must be after startDate',
        path: ['endDate'],
    })
    .refine((r) => !r.drawDate || !r.endDate || r.drawDate > r.endDate, {
        message: 'drawDate must be after endDate',
        path: ['drawDate'],
    });

export type RaffleReqBody = z.infer<typeof createRaffleSchema>;
export type RaffleUpdateBody = z.infer<typeof updateRaffleSchema>;