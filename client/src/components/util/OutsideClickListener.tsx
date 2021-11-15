import React, { useEffect, useRef } from 'react'

const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement>,
  onOutsideClick: (event: Event) => void,
  isListening: boolean
) => {
  const handleClickOutside = (event: Event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      (event.target as HTMLElement).tagName.toLowerCase() !== 'button'
    ) {
      event.stopPropagation()
      onOutsideClick(event)
    } else {
      return false
    }
  }

  useEffect(() => {
    if (isListening) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutsideClick, isListening])
}

interface OutsideClickListenerProps {
  onOutsideClick: (event: Event) => void
  children: React.ReactNode
  isListening?: boolean
}

const OutsideClickListener = ({
  onOutsideClick,
  children,
  isListening = true,
}: OutsideClickListenerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideAlerter(ref, onOutsideClick, isListening)

  return <div ref={ref}>{children}</div>
}

export default OutsideClickListener
