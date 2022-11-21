import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const ConfirmDialog = ({
  title,
  open,
  onClose,
  onConfirm,
  onReject,
  canConfirm = true,
  labels = { confirm: 'Confirm', reject: 'Cancel' },
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onReject || onClose}>
          {labels.reject}
        </Button>
        <Button
          disabled={!canConfirm}
          onClick={onConfirm}
          variant="contained"
          color="error"
        >
          {labels.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
