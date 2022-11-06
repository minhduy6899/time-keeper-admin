import * as React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export default function BasicAlerts({ severity, message, setOpenAlert }) {
  return (
    <Stack
      sx={{ width: '400px', position: 'fixed', bottom: 10, right: 10, zIndex: 30 }}
      spacing={2}
    >
      <Alert
        severity={severity}
        autoHideDuration={3000}
        onClose={() => {
          setOpenAlert(false)
        }}
      >
        {message}
      </Alert>
    </Stack>
  )
}
