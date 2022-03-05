import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { setAccessToken } from 'src/redux/authSlice'
import { IRootState } from 'src/types/redux.type'

const AuthCallback = () => {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useDispatch()
  const { accessToken, redirectUrl } = useSelector((state: IRootState) => state.authState)

  // set access token
  useEffect(() => {
    ;(async () => {
      if (token) {
        dispatch(setAccessToken(token))
      } else {
        router.push('/')
      }
    })()
  }, [router, token])

  useEffect(() => {
    ;(async () => {
      if (accessToken) {
        router.push(redirectUrl || '/')
      }
    })()
  }, [accessToken])

  return null
}

export default AuthCallback
