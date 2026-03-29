import {Box} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import {colorSwatchFieldStyles} from "@/components/fields/ColorField/ColorSwatchField.style.ts";

interface ColorSwatchFieldProps {
    name: string;
}

export const ColorSwatchField = ({name}: ColorSwatchFieldProps) => {
    const {control} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <Box sx={colorSwatchFieldStyles.wrapper()}>
                    <Box sx={colorSwatchFieldStyles.swatch(field.value)}/>
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
            )}
        />
    );
};