import {useState} from 'react';
import {IconButton, Tooltip} from '@mui/material';
import {Delete, Edit, Visibility} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import {useDeleteLeaderboard} from "@/features/leaderboard/hooks/useDeleteLeaderboard.ts";
import type {ILeaderboard} from "@/features/leaderboard/types/leaderboard.types.ts";


export const LeaderboardActions = ({leaderboard}: { leaderboard: ILeaderboard }) => {
    const navigate = useNavigate();
    const {mutate: deleteLeaderboard, isPending} = useDeleteLeaderboard();
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <Tooltip title="View">
                <IconButton size="small" onClick={() => navigate(`${RoutesPaths.LEADERBOARD}/${leaderboard.id}`)}>
                    <Visibility fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
                <IconButton size="small" onClick={() => navigate(`${RoutesPaths.LEADERBOARD}/${leaderboard.id}/edit`)}>
                    <Edit fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton size="small" color="error" disabled={isPending} onClick={() => setConfirmOpen(true)}>
                    <Delete fontSize="small"/>
                </IconButton>
            </Tooltip>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Leaderboard"
                description={`Are you sure you want to delete "${leaderboard.title}"?`}
                onConfirm={() => {
                    deleteLeaderboard(leaderboard.id);
                    setConfirmOpen(false);
                }}
                onCancel={() => setConfirmOpen(false)}
                isLoading={isPending}
            />
        </>
    );
};