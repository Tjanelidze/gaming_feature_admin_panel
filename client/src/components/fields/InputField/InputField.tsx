import {TextField} from '@mui/material';
import {Controller, get, useFormContext} from 'react-hook-form';
import type {InputFieldProps} from "@/components/fields/InputField/InputField.style.ts";
import {useState} from "react";


export const InputField = ({
                               name,
                               label,
                               placeholder,
                               type = 'text',
                               multiline,
                               rows,
                               fullWidth = true,
                               width,
                               size,
                               disabled
                           }: InputFieldProps) => {
    const {control, formState: {errors}} = useFormContext();
    const [inputType, setInputType] = useState(type);

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <TextField
                    label={label}
                    placeholder={inputType === 'text' || inputType ? placeholder : undefined}
                    onFocus={() => type === 'date' && setInputType('date')}
                    type={inputType}
                    size={size ?? 'medium'}
                    disabled={disabled}
                    value={field.value ?? ''}
                    onChange={(e) => {
                        field.onChange(type === 'number' ? Number(e.target.value) : e.target.value);
                    }}
                    onBlur={(e) => {
                        field.onBlur();
                        if (type === 'date' && !e.target.value) setInputType('text');
                    }}
                    error={!!get(errors, name)}
                    helperText={get(errors, name)?.message as string}
                    fullWidth={fullWidth}
                    multiline={multiline}
                    rows={rows}
                    sx={{
                        ...(width ? {width} : undefined),
                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                        },
                    }}
                    InputLabelProps={{
                        shrink: inputType === 'date' || (field.value !== '' && field.value != null)
                    }}
                />
            )}
        />
    );
};