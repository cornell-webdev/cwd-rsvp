import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { queryCache } from 'src/app/App'
import useRouter from 'src/hooks/useRouter'
import { logout } from 'src/redux/authSlice'

const Logout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
    queryCache.clear()
    router.push('/')
  }, [dispatch, router])

  return null
}

export default Logout
