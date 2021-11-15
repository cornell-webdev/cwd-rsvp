import { Slide, Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { Alert } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exitSnackbar, handleShowSnackbar, hideSnackbar, popSnack } from 'src/redux/snackbarSlice'
import { IRootState } from 'src/types/redux.type'

const TransitionUp = (props: TransitionProps) => <Slide {...props} direction='up' />

const GlobalSnackbar = () => {
  const dispatch = useDispatch()
  const { isOpen, currentSnack, snackPack } = useSelector(
    (state: IRootState) => state.snackbarState
  )

  useEffect(() => {
    if (snackPack?.length && !currentSnack) {
      // set a new snack when we don't have an active one
      dispatch(handleShowSnackbar())
    } else if (snackPack?.length && currentSnack && open) {
      // new snack is added

      if (snackPack[0].key === currentSnack.key) {
        // remove new snack from snackPack as the snack is already being shown
        dispatch(popSnack())
      } else {
        // close current snack when a new snack with a different key is added
        dispatch(hideSnackbar())
      }
    }
  }, [snackPack, currentSnack, open])

  const handleSnackbarClose = (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(hideSnackbar())
  }

  const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
    dispatch(hideSnackbar())
  }

  const handleExit = () => {
    dispatch(exitSnackbar())
  }

  return (
    <>
      {currentSnack && (
        <Snackbar
          key={currentSnack?.key}
          open={isOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          onExit={handleExit}
          TransitionComponent={TransitionUp}>
          <Alert onClose={handleAlertClose} severity={currentSnack?.variant}>
            {currentSnack?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default GlobalSnackbar
