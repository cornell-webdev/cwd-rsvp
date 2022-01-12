import React, { memo, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import Input from './Input'

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onDebouncedChange: (value: string) => void
  initValue?: string
}

const DebouncedInput = ({ initValue, onDebouncedChange, ...rest }: DebouncedInputProps) => {
  const [value, setValue] = useState<string>(initValue || '')
  const [debouncedValue] = useDebounce(value, 1000)

  useEffect(() => {
    onDebouncedChange(debouncedValue)

    return () => {
      onDebouncedChange(debouncedValue)
    }
  }, [debouncedValue])

  return <Input {...rest} value={value} onChange={(event) => setValue(event.currentTarget.value)} />
}

export default memo(DebouncedInput)
