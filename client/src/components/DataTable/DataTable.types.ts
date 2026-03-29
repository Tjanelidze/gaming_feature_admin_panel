import type {ReactNode} from 'react';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    render?: (row: T) => ReactNode;
}