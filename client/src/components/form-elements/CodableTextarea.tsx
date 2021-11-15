import React, { useEffect } from 'react'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import CodeBlock from './CodeBlock'
import TextareaBlock from './TextareaBlock'

interface CodableTextareaProps {
  blocks: ICodableTextareaBlock[]
  setBlocks?: React.Dispatch<
    React.SetStateAction<ICodableTextareaBlock[] | undefined>
  >
}

const CodableTextarea = ({ blocks, setBlocks }: CodableTextareaProps) => {
  useEffect(() => {
    if (setBlocks && blocks?.length === 0) {
      setBlocks([
        {
          type: 'TEXT',
          value: '',
        },
      ])
    }
  }, [blocks, setBlocks])

  return (
    <Container isReadOnly={!setBlocks}>
      {blocks?.map((block, idx) => {
        if (block.type === 'TEXT') {
          return (
            <TextareaBlock
              key={`${idx}${block.type}`}
              value={block.value}
              setBlocks={setBlocks}
              idx={idx}
            />
          )
        } else {
          return (
            <CodeBlock
              key={`${idx}${block.type}`}
              value={block.value}
              setBlocks={setBlocks}
              idx={idx}
            />
          )
        }
      })}
    </Container>
  )
}

interface ContainerProps {
  isReadOnly: boolean
}

const Container = styled.div<ContainerProps>`
  padding: 0.5rem 0.5rem 0 0.5rem;
  border: 2px solid ${(props) => props.theme.border.default};
  border-radius: 6px;

  & > * {
    margin-bottom: 0.5rem;
  }

  // isReadOnly
  border-color: ${(props) => props.isReadOnly && 'transparent'};
`

export default CodableTextarea
