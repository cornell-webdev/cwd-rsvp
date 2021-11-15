import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from 'src/redux'

const loggerMiddleware = import.meta.env.VITE_NODE_ENV === 'development' ? [logger] : []
const persistBlacklist =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? ['snackbarState', 'appState']
    : ['snackbarState']

const persistConfig = {
  key: 'root',
  storage,
  blacklist: persistBlacklist,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    ...loggerMiddleware,
  ],
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
})

export default store
