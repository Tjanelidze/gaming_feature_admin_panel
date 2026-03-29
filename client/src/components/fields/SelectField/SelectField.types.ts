export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectFieldProps {
    name: string;
    label: string;
    options: SelectOption[];
    fullWidth?: boolean;
    size?: 'small' | 'medium';
}
