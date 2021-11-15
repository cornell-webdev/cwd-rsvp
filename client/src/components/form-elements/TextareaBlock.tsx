import React, { memo, useRef } from 'react'
import useKeypress from 'src/hooks/useKeyPress'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import BlockWrapper from '../BlockWrapper'
import Textarea from './Textarea'

interface TextareaBlockProps {
  idx: number
  value: string
  setBlocks?: React.Dispatch<
    React.SetStateAction<ICodableTextareaBlock[] | undefined>
  >
}

const TextareaBlock = ({ idx, value, setBlocks }: TextareaBlockProps) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setBlocks) {
      setBlocks((blocks) =>
        blocks?.map((block, i) =>
          idx === i ? { type: 'TEXT', value: event.target.value } : block
        )
      )
    }
  }

  useKeypress('Enter', (event) => {
    const isFocused = document.activeElement === ref.current

    if (setBlocks && isFocused) {
      if (event.ctrlKey) {
        event.stopPropagation()
        event.stopImmediatePropagation()
        event.preventDefault()
        setBlocks((blocks) => [
          ...(blocks || []),
          {
            type: 'CODE',
            value: '',
          },
        ])
      } else if (event.metaKey) {
        event.stopPropagation()
        event.stopImmediatePropagation()
        event.preventDefault()
        setBlocks((blocks) => [
          ...(blocks || []),
          {
            type: 'TEXT',
            value: '',
          },
        ])
      }
    }
  })

  return (
    <div>
      <BlockWrapper idx={idx} setBlocks={setBlocks} isCodeBlock={false}>
        <StyledTextarea
          ref={ref}
          value={value}
          onChange={handleChange}
          readOnly={!setBlocks}
        />
      </BlockWrapper>
    </div>
  )
}

const StyledTextarea = styled(Textarea)`
  border: none;
  padding: 0;
  padding-left: 1px;
  resize: none;
  cursor: normal;
`

export default memo(TextareaBlock)
