import {Box, Button, Divider, Typography} from '@mui/material';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Add} from '@mui/icons-material';
import {
    LeaderboardPrizeItem
} from "@/features/leaderboard/components/LeaderboardForm/components/LeaderboardPrizeItem/LeaderboardPrizeItem.tsx";
import type {LeaderboardReqBody} from "@/features/leaderboard/validators/leaderboard.validator.ts";


const COLUMNS = ['Rank', 'Name', 'Type', 'Amount', 'Image URL', ''];

export const LeaderboardPrizeList = () => {
    const {control, formState: {errors}} = useFormContext<LeaderboardReqBody>();
    const {fields, append, remove} = useFieldArray({control, name: 'prizes'});

    const handleAdd = () => {
        append({rank: fields.length + 1, name: '', type: 'coins', amount: 0, imageUrl: ''});
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

            <Box sx={{display: 'grid', gridTemplateColumns: '60px 2fr 120px 100px 1fr 36px', gap: 0.5, px: 0.5}}>
                {COLUMNS.map((col) => (
                    <Typography key={col} variant="caption" color="text.secondary" fontWeight={600}>{col}</Typography>
                ))}
            </Box>

            {fields.map((field, index) => (
                <LeaderboardPrizeItem
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    canRemove={fields.length > 1}
                />
            ))}
        </Box>
    );
};