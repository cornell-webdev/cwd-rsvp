import { useEffect, useState } from 'react'
import { theme } from 'cornell-glue-ui'
import useWindowSize from './useWindowSize'

const useIsMobile = () => {
  const [width] = useWindowSize()
  const [isMobile, setIsMobile] = useState(width <= Number(theme.small.split('p')[0]))

  useEffect(() => {
    setIsMobile(width <= Number(theme.small.split('p')[0]))
  }, [width])

  return isMobile
}

export default useIsMobile
