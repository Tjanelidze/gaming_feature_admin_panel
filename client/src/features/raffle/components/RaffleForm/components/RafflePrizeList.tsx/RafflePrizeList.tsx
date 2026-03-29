import {Box, Button, Divider, Typography} from '@mui/material';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Add} from '@mui/icons-material';
import type {RaffleReqBody} from "@/features/raffle/validators/raffle.validator.ts";
import {RafflePrizeItem} from "@/features/raffle/components/RaffleForm/components/RafflePrizeItem/RafflePrizeItem.tsx";


const COLUMNS = ['Name', 'Type', 'Amount', 'Quantity', 'Image URL', ''];

export const RafflePrizeList = () => {
    const {control, formState: {errors}} = useFormContext<RaffleReqBody>();
    const {fields, append, remove} = useFieldArray({control, name: 'prizes'});

    const handleAdd = () => {
        append({name: '', type: 'coins', amount: 0, quantity: 1, imageUrl: ''});
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary">
                    Prizes ({fields.length})
                </Typography>
                <Button size="small" startIcon={<Add/>} onClick={handleAdd} variant="outlined">
                    Add Prize
                </Button>
            </Box>
            <Divider/>

            {errors.prizes?.root?.message && (
                <Typography variant="caption" color="error">{errors.prizes.root.message}</Typography>
            )}

            <Box sx={{display: 'grid', gridTemplateColumns: '2fr 120px 100px 100px 1fr 36px', gap: 0.5, px: 0.5}}>
                {COLUMNS.map((col) => (
                    <Typography key={col} variant="caption" color="text.secondary" fontWeight={600}>{col}</Typography>
                ))}
            </Box>

            {fields.map((field, index) => (
                <RafflePrizeItem
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    canRemove={fields.length > 1}
                />
            ))}
        </Box>
    );
};