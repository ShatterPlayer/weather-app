'use client'
import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useEffect, useState } from 'react'

interface Props {
  dismissTime: number
  message: string
  positionVertical?: 'top' | 'bottom'
  positionHorizontal?: 'left' | 'center' | 'right'
  severity?: 'error' | 'warning' | 'info' | 'success'
}

export default function Notification({
  dismissTime,
  message,
  positionHorizontal,
  positionVertical,
  severity,
}: Props) {
  const [open, setOpen] = useState(dismissTime !== 0)

  useEffect(() => {
    setOpen(dismissTime !== 0)
  }, [dismissTime])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={dismissTime}
      onClose={handleClose}
      anchorOrigin={{
        vertical: positionVertical || 'bottom',
        horizontal: positionHorizontal || 'center',
      }}
    >
      <Alert severity={severity || 'info'}>{message}</Alert>
    </Snackbar>
  )
}
