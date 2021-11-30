import { useEffect, useState } from 'react'
import { theme } from 'cornell-glue-ui'
import useWindowSize from './useWindowSize'

const useIsTablet = () => {
  const [width] = useWindowSize()
  const [isTablet, setIsTablet] = useState(width <= Number(theme.tablet.split('p')[0]))

  useEffect(() => {
    setIsTablet(width <= Number(theme.tablet.split('p')[0]))
  }, [width])

  return isTablet
}

export default useIsTablet
