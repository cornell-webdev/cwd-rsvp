import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from 'src/types/redux.type'

const initialState: IAuthState = {
  accessToken: null,
  redirectUrl: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRedirectUrl: (state, { payload }) => {
      state.redirectUrl = payload
    },
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

export const { setRedirectUrl, setAccessToken, resetAccessToken, logout } = authSlice.actions

export default authSlice.reducer
