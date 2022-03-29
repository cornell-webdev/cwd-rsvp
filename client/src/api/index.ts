import axios from 'axios'
import history from 'src/util/history'
import { objectToQueryString } from 'src/util/url'
import store from 'src/redux/store'
import { logout } from 'src/redux/authSlice'

const BASE_URL = '/api'

const api = (method: 'get' | 'post' | 'put' | 'delete', url: string, variables: any) =>
  new Promise((resolve, reject) => {
    const { accessToken } = store.getState().authState
    const headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    }

    axios({
      url: `${BASE_URL}${url}`,
      method,
      headers,
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      (response) => {
        resolve(response.data)
      },
      (error) => {
        console.log('error?.response?.data', error?.response?.data)
        if (error.response) {
          if (error?.response?.data === 'Google OAuth error') {
            // TODO: update toast
            // showToast({
            //   id: 'google-session-expired',
            //   variant: 'error',
            //   msg: 'Google auth session expired',
            // })
            history.push('/logout')
          }
          const { code, message } = error.response.data
          if (code === 404) {
            if (message === 'Access token has expired') {
              history.push('/refresh-token')
            } else {
              // TODO: update toast
              // showToast({
              //   id: 'session-expired',
              //   variant: 'error',
              //   msg: 'Session expired',
              // })
              store.dispatch(logout())
              history.push({
                pathname: '/login',
                state: {
                  prevPath: location.pathname + location.search,
                },
              })
            }
          } else {
            reject(error)
          }
        } else {
          reject(error)
        }
      }
    )
  })

export default api
