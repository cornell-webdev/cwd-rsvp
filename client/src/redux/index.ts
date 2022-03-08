import { combineReducers, Reducer } from 'redux'
import { IRootState } from 'src/types/redux.type'

import authReducer from './authSlice'

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  authState: authReducer,
})

export default rootReducer
