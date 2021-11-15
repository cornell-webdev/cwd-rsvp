import { useEffect, useRef } from 'react'

const usePreviousValue = (variable: any) => {
  const ref = useRef<any>()

  useEffect(() => {
    ref.current = variable
  })

  return ref.current
}

export default usePreviousValue
