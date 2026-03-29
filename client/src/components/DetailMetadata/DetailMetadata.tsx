import {Box} from '@mui/material';
import {ReadOnlyField} from "@/components/ReadOnlyField/ReadOnlyField.tsx";
import {SectionCard} from "@/components/SectionCard/SectionCard.tsx";


interface DetailMetadataProps {
    createdAt: string;
    updatedAt: string;
}

export const DetailMetadata = ({createdAt, updatedAt}: DetailMetadataProps) => (
    <SectionCard title="Metadata">
        <Box sx={{display: 'flex', gap: 4, mt: 1.5}}>
            <ReadOnlyField label="Created At" value={new Date(createdAt).toLocaleString()}/>
            <ReadOnlyField label="Updated At" value={new Date(updatedAt).toLocaleString()}/>
        </Box>
    </SectionCard>
);