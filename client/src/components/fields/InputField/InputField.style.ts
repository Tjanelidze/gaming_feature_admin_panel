export interface InputFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    multiline?: boolean;
    rows?: number;
    fullWidth?: boolean;
    width?: string | number;
    size?: 'small' | 'medium';
    disabled?: boolean;
}