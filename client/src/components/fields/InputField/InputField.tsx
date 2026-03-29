import {TextField} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import type {InputFieldProps} from "@/components/fields/InputField/InputField.style.ts";


export const InputField = ({
                               name,
                               label,
                               placeholder,
                               type = 'text',
                               multiline,
                               rows,
                               fullWidth = true,
                               width,
                               size, disabled
                           }: InputFieldProps) => {
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <TextField
                    label={label}
                    placeholder={placeholder}
                    type={type}
                    size={size ?? 'medium'}
                    disabled={disabled}
                    value={field.value ?? ''}
                    onChange={(e) => {
                        field.onChange(type === 'number' ? Number(e.target.value) : e.target.value);
                    }}
                    onBlur={field.onBlur}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                    fullWidth={fullWidth}
                    multiline={multiline}
                    rows={rows}
                    sx={width ? {width} : undefined}
                />
            )}
        />
    );
};