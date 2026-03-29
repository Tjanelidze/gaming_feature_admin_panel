import {Box, Breadcrumbs, Button, Link, Typography} from "@mui/material";
import {Add, NavigateNext} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {pageHeaderStyles} from "@/components/PageHeader/PageHeader.styles.ts";
import type {ReactNode} from "react";

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface PageHeaderProps {
    title: string;
    onCreateClick?: () => void;
    createLabel?: string,
    createIcon?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export const PageHeader = ({
                               title,
                               onCreateClick,
                               createLabel = 'Create',
                               createIcon,
                               breadcrumbs,
                           }: PageHeaderProps) => {
    const navigate = useNavigate();

    return (
        <Box sx={{mb: 3}}>
            {breadcrumbs && (
                <Breadcrumbs
                    separator={<NavigateNext fontSize="small" sx={{color: 'primary.main'}}/>}
                    sx={{mb: 1}}
                >
                    {breadcrumbs.map((crumb, i) => {
                        const isLast = i === breadcrumbs.length - 1;

                        return isLast ? (
                            <Typography key={crumb.label} variant="caption" sx={pageHeaderStyles.breadcrumbActive()}>
                                {crumb.label}
                            </Typography>
                        ) : (
                            <Link
                                key={crumb.label}
                                variant="caption"
                                sx={pageHeaderStyles.breadcrumbLink()}
                                onClick={() => crumb.path && navigate(crumb.path)}
                            >
                                {crumb.label}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            )}

            <Box sx={pageHeaderStyles.headerRow()}>
                <Box sx={pageHeaderStyles.titleWrapper()}>
                    <Box sx={pageHeaderStyles.titleAccent()}/>
                    <Typography variant="h5" fontWeight={700}>{title}</Typography>
                </Box>
                {onCreateClick && (
                    <Button variant="contained" startIcon={createIcon ?? <Add/>} onClick={onCreateClick}
                            sx={pageHeaderStyles.createButton()}>
                        {createLabel}
                    </Button>
                )}
            </Box>
        </Box>
    );
};