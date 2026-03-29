import {Box, Divider, Typography} from '@mui/material';
import {InputField} from '@/components/fields/InputField/InputField.tsx';
import {SelectField} from '@/components/fields/SelectField/SelectField.tsx';
import {DateField} from "@/components/DateField/DateField.tsx";

const STATUS_OPTIONS = [
    {label: 'Draft', value: 'draft'},
    {label: 'Active', value: 'active'},
    {label: 'Completed', value: 'completed'},
];

const SCORING_OPTIONS = [
    {label: 'Points', value: 'points'},
    {label: 'Wins', value: 'wins'},
    {label: 'Wagered', value: 'wagered'},
];

export const LeaderboardBasicFields = () => (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary">
            Basic Info
        </Typography>
        <Divider/>

        <InputField name="title" label="Title *" placeholder="e.g. April Points Championship"/>
        <InputField name="description" label="Description" placeholder="Optional description..." multiline rows={2}/>

        <Box sx={{display: 'flex', gap: 2}}>
            <SelectField name="status" label="Status" options={STATUS_OPTIONS}/>
            <SelectField name="scoringType" label="Scoring Type" options={SCORING_OPTIONS}/>
        </Box>

        <InputField name="maxParticipants" label="Max Participants" type="number" width="50%" fullWidth={false}/>

        <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary" sx={{mt: 1}}>
            Dates
        </Typography>
        <Divider/>

        <Box sx={{display: 'flex', gap: 2}}>
            <DateField name="startDate" label="Start Date"/>
            <DateField name="endDate" label="End Date"/>
        </Box>
    </Box>
);