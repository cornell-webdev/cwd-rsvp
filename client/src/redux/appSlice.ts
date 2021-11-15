import { createSlice } from '@reduxjs/toolkit'

import { IAppState } from 'src/types/redux.type'

const initialState: IAppState = {
  isHide: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleHide: (state) => {
      state.isHide = !state.isHide
    },
    setHide: (state, { payload }) => {
      state.isHide = payload
    },
  },
})

export const { toggleHide, setHide } = appSlice.actions

export default appSlice.reducer
