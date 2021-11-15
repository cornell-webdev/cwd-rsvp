import React, { memo, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import ResizedTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize'
import styled from 'styled-components'

interface DebouncedTextareaProps extends TextareaAutosizeProps {
  onDebouncedChange: (value: string) => void
  initValue?: string
}

const DebouncedTextarea = ({
  initValue,
  onDebouncedChange,
  ...rest
}: DebouncedTextareaProps) => {
  const [value, setValue] = useState<string>(initValue || '')
  const [debouncedValue] = useDebounce(value, 1000)

  useEffect(() => {
    onDebouncedChange(debouncedValue)
  }, [debouncedValue])

  return (
    <StyleResetTextarea
      {...rest}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

const StyleResetTextarea = styled(ResizedTextarea)`
  font-size: 1rem;
  width: 100%;
  border: none;
  font-family: inherit;
  background: inherit;
  line-height: 1.5;
`

export default memo(DebouncedTextarea)
