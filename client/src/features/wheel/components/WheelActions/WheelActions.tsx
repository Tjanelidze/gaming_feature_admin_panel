import {IconButton, Tooltip} from '@mui/material';
import {Delete, Edit, Visibility} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {RoutesPaths} from '@/routes/routesPaths.ts';
import type {IWheel} from "@/features/wheel/types/wheel.types.ts";
import {useDeleteWheel} from "@/features/wheel/hooks/useDeleteWheel.ts";


interface WheelActionsProps {
    wheel: IWheel;
}

export const WheelActions = ({wheel}: WheelActionsProps) => {
    const navigate = useNavigate();
    const {mutate: deleteWheel, isPending} = useDeleteWheel();

    return (
        <>
            <Tooltip title="View">
                <IconButton size="small" onClick={() => navigate(`${RoutesPaths.WHEEL}/${wheel.id}`)}>
                    <Visibility fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
                <IconButton size="small" onClick={() => navigate(`${RoutesPaths.WHEEL}/${wheel.id}/edit`)}>
                    <Edit fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton
                    size="small"
                    color="error"
                    disabled={isPending}
                    onClick={() => deleteWheel(wheel.id)}
                >
                    <Delete fontSize="small"/>
                </IconButton>
            </Tooltip>
        </>
    );
};