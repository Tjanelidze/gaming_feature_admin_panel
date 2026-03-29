import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from '@mui/material';
import type {ConfirmDialogProps} from "@/components/ConfirmDialog/ConfirmDialog.types.ts";


export const ConfirmDialog = ({
                                  open,
                                  title,
                                  description,
                                  onConfirm,
                                  onCancel,
                                  isLoading,
                                  confirmLabel = 'Confirm',
                                  cancelLabel = 'Cancel',
                                  confirmColor = 'error',
                              }: ConfirmDialogProps) => (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} disabled={isLoading}>
                {cancelLabel}
            </Button>
            <Button
                onClick={onConfirm}
                color={confirmColor}
                variant="contained"
                disabled={isLoading}
            >
                {confirmLabel}
            </Button>
        </DialogActions>
    </Dialog>
);