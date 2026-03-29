import {Box, Divider, Typography} from '@mui/material';
import {InputField} from '@/components/fields/InputField/InputField.tsx';
import {SelectField} from '@/components/fields/SelectField/SelectField.tsx';
import {DateField} from "@/components/DateField/DateField.tsx";

const STATUS_OPTIONS = [
    {label: 'Draft', value: 'draft'},
    {label: 'Active', value: 'active'},
    {label: 'Cancelled', value: 'cancelled'},
];

export const RaffleBasicFields = () => (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary">
            Basic Info
        </Typography>
        <Divider/>

        <InputField name="name" label="Name *" placeholder="e.g. Summer Mega Raffle"/>
        <InputField name="description" label="Description" placeholder="Optional description..." multiline rows={2}/>

        <Box sx={{display: 'flex', gap: 2}}>
            <SelectField name="status" label="Status" options={STATUS_OPTIONS}/>
            <InputField name="ticketPrice" label="Ticket Price" type="number"/>
        </Box>

        <Box sx={{display: 'flex', gap: 2}}>
            <InputField name="maxTicketsPerUser" label="Max Tickets / User" type="number"/>
            <InputField name="totalTicketLimit" label="Total Ticket Limit (empty = unlimited)" type="number"/>
        </Box>

        <Typography variant="overline" fontWeight={700} letterSpacing={2} color="text.secondary" sx={{mt: 1}}>
            Dates
        </Typography>
        <Divider/>

        <Box sx={{display: 'flex', gap: 2}}>
            <DateField name="startDate" label="Start Date"/>
            <DateField name="endDate" label="End Date"/>
            <DateField name="drawDate" label="Draw Date" min="2024-01-01"/>
        </Box>
    </Box>
);