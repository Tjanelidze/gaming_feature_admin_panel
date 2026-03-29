export const LEADERBOARD_QUERY_KEYS = {
    all: ['leaderboard'] as const,
    detail: (id: string) => ['leaderboard', id] as const,
};