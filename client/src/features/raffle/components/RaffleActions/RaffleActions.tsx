import {useState} from 'react';
import {IconButton, Tooltip} from '@mui/material';
import {Delete, Edit, Visibility} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {useDeleteRaffle} from '../../hooks/useDeleteRaffle.ts';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import RoutesPaths from '@/routes/routesPaths.ts';
import type {IRaffle} from '../../types/raffle.types.ts';

export const RaffleActions = ({raffle}: { raffle: IRaffle }) => {
    const navigate = useNavigate();
    const {mutate: deleteRaffle, isPending} = useDeleteRaffle();
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <Tooltip title="View">
                <IconButton size="small" onClick={() => navigate(`${RoutesPaths.RAFFLE}/${raffle.id}`)}>
                    <Visibility fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
                <IconButton size="small" onClick={() => navigate(`${RoutesPaths.RAFFLE}/${raffle.id}/edit`)}>
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
                title="Delete Raffle"
                description={`Are you sure you want to delete "${raffle.name}"? This action cannot be undone.`}
                onConfirm={() => {
                    deleteRaffle(raffle.id);
                    setConfirmOpen(false);
                }}
                onCancel={() => setConfirmOpen(false)}
                isLoading={isPending}
            />
        </>
    );
};