export const RAFFLE_QUERY_KEYS = {
    all: ['raffles'] as const,
    detail: (id: string) => ['raffles', id] as const,
};