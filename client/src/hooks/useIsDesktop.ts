import { useEffect, useState } from 'react'
import { theme } from 'cornell-glue-ui'
import useWindowSize from './useWindowSize'

const useIsDesktop = () => {
  const [width] = useWindowSize()
  const [isDesktop, setIsDesktop] = useState(width >= Number(theme.large.split('p')[0]))

  useEffect(() => {
    setIsDesktop(width >= Number(theme.large.split('p')[0]))
  }, [width])

  return isDesktop
}

export default useIsDesktop
