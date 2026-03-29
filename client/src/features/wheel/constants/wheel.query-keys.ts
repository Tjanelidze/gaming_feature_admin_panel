export const WHEEL_QUERY_KEYS = {
    all: ['wheel'] as const,
    detail: (id: string) => ['wheel', id] as const,
};