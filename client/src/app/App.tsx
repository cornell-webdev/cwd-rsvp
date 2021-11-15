import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Footer from 'src/components/footer/Footer'
import GlobalSnackbar from 'src/components/GlobalSnackbar'
import ToastWrapper from 'src/components/toast/ToastWrapper'
import ToggledBlur from 'src/components/ToggledBlur'
import ScrollToTop from 'src/components/util/ScrollToTop'
import store from 'src/redux/store'
import history from 'src/util/history'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../components/header/Header'
import './normalise.less'
import Routes from './Routes'
import theme from './theme'
import 'react-perfect-scrollbar/dist/css/styles.css'

const persistor = persistStore(store)

export const queryCache = new QueryCache()

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <ToggledBlur>
                <Container>
                  <PerfectScrollbar>
                    <Header />
                    <Routes />
                    <Footer />
                  </PerfectScrollbar>
                </Container>
              </ToggledBlur>
              <ToastWrapper />
              <ScrollToTop />
              <GlobalSnackbar />
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.bg.default};

  @media (min-width: ${(props) => props.theme.tablet}) {
    width: initial;
  }
`

export default App
