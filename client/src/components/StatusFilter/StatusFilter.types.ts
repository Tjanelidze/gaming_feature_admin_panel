export interface StatusFilterProps<T extends string> {
    value: T | '';
    onChange: (value: T | '') => void;
    options: { label: string; value: T | '' }[];
    label?: string;
}