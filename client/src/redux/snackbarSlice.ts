import { createSlice } from '@reduxjs/toolkit'

import { ISnackbarState } from 'src/types/redux.type'

const initialState: ISnackbarState = {
  isOpen: false,
  snackPack: [],
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, { payload }) => {
      // add new snack to snackPack
      state.snackPack.push({
        key: payload.key || new Date().getTime(),
        variant: payload.variant,
        message: payload.message,
      })
    },
    handleShowSnackbar: (state) => {
      // display snack from snackPack
      state.currentSnack = state.snackPack[0]
      state.snackPack = state.snackPack.slice(1)
      state.isOpen = true
    },
    popSnack: (state) => {
      state.snackPack = state.snackPack.slice(1)
    },
    exitSnackbar: (state) => {
      state.currentSnack = undefined
    },
    hideSnackbar: (state) => {
      state.isOpen = false
    },
  },
})

export const { showSnackbar, handleShowSnackbar, popSnack, hideSnackbar, exitSnackbar } =
  snackbarSlice.actions

export default snackbarSlice.reducer
