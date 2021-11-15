import { Ref, useEffect, useRef } from 'react'

const useForwardedRef = <T>(forwardedRef: Ref<T>) => {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!forwardedRef) {
      return
    }
    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current)
    } else {
      // @ts-ignore
      forwardedRef.current = innerRef.current
    }
  })

  return innerRef
}

export default useForwardedRef
