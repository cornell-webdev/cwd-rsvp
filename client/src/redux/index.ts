import { combineReducers, Reducer } from 'redux'
import { IRootState } from 'src/types/redux.type'

import authReducer from './authSlice'
import snackbarReducer from './snackbarSlice'
import appReducer from './appSlice'

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  authState: authReducer,
  snackbarState: snackbarReducer,
  appState: appReducer,
})

export default rootReducer
