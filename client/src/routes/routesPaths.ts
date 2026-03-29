export const RoutesPaths = {
    LEADERBOARD: '/leaderboard',
    LEADERBOARD_CREATE: '/leaderboard/create',
    LEADERBOARD_EDIT: '/leaderboard/:id/edit',
    LEADERBOARD_DETAIL: '/leaderboard/:id',
    RAFFLE: '/raffle',
    RAFFLE_CREATE: '/raffle/create',
    RAFFLE_EDIT: '/raffle/:id/edit',
    RAFFLE_DETAIL: '/raffle/:id',
    WHEEL: '/wheel',
    WHEEL_CREATE: '/wheel/create',
    WHEEL_EDIT: '/wheel/:id/edit',
    WHEEL_DETAIL: '/wheel/:id',
} as const;

export default RoutesPaths;