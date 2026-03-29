import {Box, Button, Divider, Typography} from '@mui/material';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Add} from '@mui/icons-material';
import type {WheelReqBody} from '@/features/wheel/validators/wheel.validator.ts';
import {WheelSegmentItem} from './WheelSegmentItem.tsx';
import {getSegmentColor} from "@/features/wheel/constants/wheel.colors.ts";

const COLUMNS = ['Label', 'Color', 'Weight', 'Prize Type', 'Amount', 'Image URL', ''];

export const WheelSegmentList = () => {
    const {control, formState: {errors}} = useFormContext<WheelReqBody>();
    const {fields, append, remove} = useFieldArray({control, name: 'segments'});

    const handleAdd = () => {
        if (fields.length >= 12) return;
        append({
            label: '',
            color: getSegmentColor(fields.length),
            weight: 0,
            prizeType: 'nothing',
            prizeAmount: 0,
            imageUrl: '',
        });
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary">
                    Segments ({fields.length}/12)
                </Typography>
                <Button size="small" startIcon={<Add/>} onClick={handleAdd} disabled={fields.length >= 12}
                        variant="outlined">
                    Add Segment
                </Button>
            </Box>
            <Divider/>

            {errors.segments?.root?.message && (
                <Typography variant="caption" color="error">{errors.segments.root.message}</Typography>
            )}

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 44px 70px 120px 90px 1fr 36px',
                gap: 1,
                alignItems: 'center',
            }}>
                {COLUMNS.map((col) => (
                    <Typography key={col} variant="caption" color="text.secondary" fontWeight={600}>
                        {col}
                    </Typography>
                ))}
            </Box>

            {fields.map((field, index) => (
                <WheelSegmentItem
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    canRemove={fields.length > 2}
                />
            ))}
        </Box>
    );
};