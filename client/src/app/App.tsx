import { GlueProvider } from 'cornell-glue-ui'
import React from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Footer from 'src/components/footer/Footer'
import store from 'src/redux/store'
// TODO: custom history definition
// import history from 'src/util/history'
import Header from '../components/header/Header'
import Routes from './Routes'

const persistor = persistStore(store)

export const queryCache = new QueryCache()

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GlueProvider>
              <Header />
              <Routes />
              <Footer />
            </GlueProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
