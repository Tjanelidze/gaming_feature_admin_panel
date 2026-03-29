import {Box} from '@mui/material';
import type {ReactNode} from 'react';
import {detailLayoutStyles} from "./DetailLayout.styles";

interface DetailLayoutProps {
    main: ReactNode;
    aside: ReactNode;
}

export const DetailLayout = ({main, aside}: DetailLayoutProps) => (
    <Box sx={detailLayoutStyles.container()}>
        <Box sx={detailLayoutStyles.main()}>
            {main}
        </Box>
        <Box sx={detailLayoutStyles.aside()}>
            {aside}
        </Box>
    </Box>
);