import {TextField} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import {useState} from 'react';

interface DateFieldProps {
    name: string;
    label: string;
    fullWidth?: boolean;
    width?: number | string;
    size?: 'small' | 'medium';
    disabled?: boolean;
    min?: string;
    max?: string;
}

export const DateField = ({
                              name,
                              label,
                              fullWidth = true,
                              width,
                              size,
                              disabled,
                              min,
                              max,
                          }: DateFieldProps) => {
    const {control, formState: {errors}} = useFormContext();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => {
                const hasValue = field.value !== '' && field.value != null;
                const showAsDate = isFocused || hasValue;

                return (
                    <TextField
                        label={label}
                        type={showAsDate ? 'date' : 'text'}
                        size={size ?? 'medium'}
                        disabled={disabled}
                        value={field.value ? field.value.slice(0, 10) : ''}
                        inputProps={{min, max}}
                        onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val ? new Date(val).toISOString() : '');
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            field.onBlur();
                            if (!e.target.value) setIsFocused(false);
                        }}
                        error={!!errors[name]}
                        helperText={errors[name]?.message as string}
                        fullWidth={fullWidth}
                        sx={{
                            ...(width ? {width} : undefined),
                            '& input[type=date]::-webkit-calendar-picker-indicator': {
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                            },
                        }}
                        InputLabelProps={{shrink: showAsDate || hasValue}}
                    />
                );
            }}
        />
    );
};