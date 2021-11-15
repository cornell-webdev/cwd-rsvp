import IconButton from '@material-ui/core/IconButton'
import { default as MuiSnackbar } from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

interface SnackbarProps {
  isOpen: boolean
  handleClose: () => void
  message: string
}

const Snackbar = ({ message, isOpen, handleClose }: SnackbarProps) => {
  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <>
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      }
    />
  )
}

export default Snackbar
