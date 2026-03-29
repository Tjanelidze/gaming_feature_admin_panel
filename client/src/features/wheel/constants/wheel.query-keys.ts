export const WHEEL_QUERY_KEYS = {
    all: ['wheels'] as const,
    detail: (id: string) => ['wheels', id] as const,
};