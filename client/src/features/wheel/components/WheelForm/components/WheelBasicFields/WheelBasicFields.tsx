import {Box, Divider, Typography} from '@mui/material';
import {ColorField} from "@/components/fields/ColorField/ColorField.tsx";
import {SelectField} from "@/components/fields/SelectField/SelectField.tsx";
import {InputField} from "@/components/fields/InputField/InputField.tsx";

const STATUS_OPTIONS = [
    {label: 'Draft', value: 'draft'},
    {label: 'Active', value: 'active'},
    {label: 'Inactive', value: 'inactive'},
];

export const WheelBasicFields = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
            <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary">
                Basic Info
            </Typography>
            <Divider/>

            <InputField
                name="name"
                label="Name *"
                placeholder="e.g. Lucky Spinner"
            />

            <InputField
                name="description"
                label="Description"
                placeholder="Optional description..."
                multiline
                rows={3}
            />

            <Box sx={{display: 'flex', gap: 2}}>
                <SelectField
                    name="status"
                    label="Status"
                    options={STATUS_OPTIONS}
                />

                <InputField
                    name="spinCost"
                    label="Spin Cost"
                    type="number"
                    placeholder="0"
                />
            </Box>

            <InputField
                name="maxSpinsPerUser"
                label="Max Spins / User"
                type="number"
                width="50%"
                fullWidth={false}
            />

            <Box sx={{display: 'flex', gap: 2}}>
                <ColorField label="Background Color" name="backgroundColor"/>
                <ColorField label="Border Color" name="borderColor"/>
            </Box>
        </Box>
    );
};
