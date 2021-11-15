import { createSlice } from '@reduxjs/toolkit'

import { IAuthState } from 'src/types/redux.type'

const initialState: IAuthState = {
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload
    },
    resetAccessToken: (state) => {
      state.accessToken = null
    },
    logout: (state) => {
      state.accessToken = null
    },
  },
})

export const { setAccessToken, resetAccessToken, logout } = authSlice.actions

export default authSlice.reducer
