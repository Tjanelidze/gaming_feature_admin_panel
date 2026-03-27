import {PAGINATION_DEFAULTS} from "@/constants/pagination.constants";

export const parsePagination = (rawPage?: string, rawLimit?: string): {
    page: number,
    limit: number,
    startIndex: number
} => {
    const page = Math.max(1, parseInt(rawPage as string) || PAGINATION_DEFAULTS.DEFAULT_PAGE);
    const limit = Math.min(
        Math.max(1, parseInt(rawLimit as string) || PAGINATION_DEFAULTS.DEFAULT_LIMIT),
        PAGINATION_DEFAULTS.MAX_LIMIT
    );
    const startIndex = (page - 1) * limit;

    return {page, limit, startIndex};
};

export const sortItems = <T>(items: T[], sortBy: keyof T, order: 'asc' | 'desc'): T[] => {
    return [...items].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;

        return 0;
    });
};