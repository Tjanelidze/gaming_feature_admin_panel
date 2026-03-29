import {MenuItem, TextField} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import type {SelectFieldProps} from "@/components/fields/SelectField/SelectField.types.ts";

export const SelectField = ({name, label, options, size, fullWidth = true}: SelectFieldProps) => {
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <TextField
                    select
                    label={label}
                    size={size ?? 'medium'}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                    fullWidth={fullWidth}
                >
                    {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};