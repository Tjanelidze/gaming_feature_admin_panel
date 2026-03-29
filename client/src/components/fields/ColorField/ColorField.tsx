import {Box, TextField} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import {colorFieldStyles} from "@/components/fields/ColorField/ColorField.styles.ts";

interface ColorFieldProps {
    name: string;
    label: string;
    size?: 'small' | 'medium';
}

export const ColorField = ({name, label, size}: ColorFieldProps) => {
    const {control, formState: {errors}} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <TextField
                    label={label}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    size={size ?? 'medium'}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <Box sx={colorFieldStyles.swatchWrapper()}>
                                <Box
                                    sx={colorFieldStyles.swatch(field.value)}
                                />
                                <input
                                    type="color"
                                    value={field.value ?? '#000000'}
                                    onChange={field.onChange}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: 0,
                                        cursor: 'pointer',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                        ),
                    }}
                />
            )}
        />
    );
};