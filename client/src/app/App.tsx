import { GlueProvider, Footer } from 'cornell-glue-ui'
import React from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from 'src/redux/store'
import styled from 'styled-components'
import history from 'src/util/history'
import Header from '../components/header/Header'
import Routes from './Routes'
import { SnackbarProvider } from 'notistack'

const persistor = persistStore(store)

export const queryCache = new QueryCache()

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              <GlueProvider>
                <Header />
                <InnerContents>
                  <Routes />
                </InnerContents>
                <Footer
                  navs={[
                    {
                      heading: 'Policies',
                      routes: [
                        {
                          label: 'Terms and Conditions',
                          url: '/terms-and-conditions',
                        },
                        {
                          label: 'Privacy Policy',
                          url: '/privacy-policy',
                        },
                      ],
                    },
                  ]}
                />
              </GlueProvider>
            </SnackbarProvider>
          </QueryClientProvider>
        </Router>
      </PersistGate>
    </Provider>
  )
}

const InnerContents = styled.div`
  min-height: 90vh;
`

export default App
