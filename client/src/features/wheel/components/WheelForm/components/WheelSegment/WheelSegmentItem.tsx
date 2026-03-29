import {Box, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useFormContext} from 'react-hook-form';
import type {WheelReqBody} from '@/features/wheel/validators/wheel.validator.ts';
import {InputField} from '@/components/fields/InputField/InputField.tsx';
import {SelectField} from '@/components/fields/SelectField/SelectField.tsx';
import {ColorSwatchField} from "@/components/fields/ColorField/ColorSwatchField.tsx";

const PRIZE_TYPES = [
    {label: 'Nothing', value: 'nothing'},
    {label: 'Coins', value: 'coins'},
    {label: 'Free Spin', value: 'freeSpin'},
    {label: 'Bonus', value: 'bonus'},
];

interface Props {
    index: number;
    onRemove: () => void;
    canRemove: boolean;
}

export const WheelSegmentItem = ({index, onRemove, canRemove}: Props) => {
    const {watch} = useFormContext<WheelReqBody>();
    const prizeType = watch(`segments.${index}.prizeType`);

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 44px 70px 120px 90px 1fr 36px',
            gap: 1,
            alignItems: 'center',
        }}>
            <InputField
                name={`segments.${index}.label`}
                label=""
                placeholder="Label"
                size="small"
            />

            <ColorSwatchField name={`segments.${index}.color`}/>

            <InputField
                name={`segments.${index}.weight`}
                label=""
                placeholder="0"
                type="number"
                size="small"
            />

            <SelectField
                name={`segments.${index}.prizeType`}
                label=""
                options={PRIZE_TYPES}
                size="small"
            />

            <InputField
                name={`segments.${index}.prizeAmount`}
                label=""
                placeholder="0"
                type="number"
                size="small"
                disabled={prizeType === 'nothing'}
            />

            <InputField
                name={`segments.${index}.imageUrl`}
                label=""
                placeholder="https://..."
                size="small"
            />

            <IconButton
                size="small"
                color="error"
                onClick={onRemove}
                disabled={!canRemove}
                sx={{mt: 0.5}}
            >
                <Delete fontSize="small"/>
            </IconButton>
        </Box>
    );
};