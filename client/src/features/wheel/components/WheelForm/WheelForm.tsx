import {Box, Button, Paper} from '@mui/material';
import {WheelBasicFields} from "@/features/wheel/components/WheelForm/components/WheelBasicFields/WheelBasicFields.tsx";
import {WheelSegmentList} from "@/features/wheel/components/WheelForm/components/WheelSegment/WheelSegmentList.tsx";


interface WheelFormProps {
    isPending: boolean;
    submitLabel?: string;
}

export const WheelForm = ({isPending, submitLabel}: WheelFormProps) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2.5}}>
            <Paper sx={{p: 1.5}}>
                <WheelBasicFields/>
            </Paper>

            <Paper sx={{p: 1.5}}>
                <WheelSegmentList/>
            </Paper>

            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isPending}
                fullWidth
            >
                {isPending ? 'Saving...' : (submitLabel ?? 'Create Wheel')}
            </Button>
        </Box>
    );
};