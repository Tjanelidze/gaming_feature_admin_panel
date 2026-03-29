import type {SelectChangeEvent} from '@mui/material';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import type {StatusFilterProps} from "@/components/StatusFilter/StatusFilter.types.ts";

export const StatusFilter = <T extends string>({value, onChange, options, label = 'Status',}: StatusFilterProps<T>) => {
    const handleChange = (e: SelectChangeEvent) => {
        onChange(e.target.value as T | '');
    };

    return (
        <FormControl size="small" sx={{minWidth: 160}}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={handleChange}>
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};