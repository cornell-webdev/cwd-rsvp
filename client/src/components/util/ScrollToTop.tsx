import { useEffect } from 'react'
import useRouter from 'src/hooks/useRouter'

const ScrollToTop = () => {
  // scroll to top on route change
  const router = useRouter()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.location])

  return null
}

export default ScrollToTop
