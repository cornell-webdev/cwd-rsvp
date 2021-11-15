import { useEffect, useRef } from 'react'

type KeyboardEventHandler = (event: KeyboardEvent) => void

const useKeypress = (keys: (string | string[]), handler: KeyboardEventHandler) => {
  const eventListenerRef = useRef<KeyboardEventHandler>(handler)

  // assign event handler to ref.current
  useEffect(() => {
    // @ts-ignore
    eventListenerRef.current = (event: KeyboardEvent) => {
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler(event)
      }
    }
  }, [keys, handler])

  // handle event with handler
  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      eventListenerRef.current(event)
    }

    window.addEventListener('keydown', eventListener)

    return () => {
      window.removeEventListener('keydown', eventListener)
    }
  }, [])
}

export default useKeypress
