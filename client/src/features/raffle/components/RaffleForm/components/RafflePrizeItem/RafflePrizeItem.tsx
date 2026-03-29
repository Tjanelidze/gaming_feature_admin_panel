import {Box, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {InputField} from '@/components/fields/InputField/InputField.tsx';
import {SelectField} from '@/components/fields/SelectField/SelectField.tsx';

const PRIZE_TYPES = [
    {label: 'Coins', value: 'coins'},
    {label: 'Free Spin', value: 'freeSpin'},
    {label: 'Bonus', value: 'bonus'},
];

interface Props {
    index: number;
    onRemove: () => void;
    canRemove: boolean;
}

export const RafflePrizeItem = ({index, onRemove, canRemove}: Props) => (
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 120px 100px 100px 1fr 36px',
        gap: 0.5,
        alignItems: 'flex-start',
    }}>
        <InputField name={`prizes.${index}.name`} label="" placeholder="Prize name" size="small"/>
        <SelectField name={`prizes.${index}.type`} label="" options={PRIZE_TYPES} size="small"/>
        <InputField name={`prizes.${index}.amount`} label="" placeholder="Amount" type="number" size="small"/>
        <InputField name={`prizes.${index}.quantity`} label="" placeholder="Qty" type="number" size="small"/>
        <InputField name={`prizes.${index}.imageUrl`} label="" placeholder="https://..." size="small"/>
        <IconButton size="small" color="error" onClick={onRemove} disabled={!canRemove} sx={{mt: 0.5}}>
            <Delete fontSize="small"/>
        </IconButton>
    </Box>
);