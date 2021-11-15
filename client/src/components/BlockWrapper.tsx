import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'

interface BlockWrapperProps {
  idx: number
  isCodeBlock: boolean
  setBlocks?: React.Dispatch<
    React.SetStateAction<ICodableTextareaBlock[] | undefined>
  >
  children: React.ReactNode
}

const BlockWrapper = ({
  idx,
  isCodeBlock,
  setBlocks,
  children,
}: BlockWrapperProps) => {
  const handleClose = () => {
    if (setBlocks) {
      setBlocks((blocks) => blocks?.filter((block, i) => i !== idx))
    }
  }

  return (
    <Container>
      {children}
      {idx !== 0 && setBlocks && (
        <IconContainer isCodeBlock={isCodeBlock}>
          <IconButton size='small' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </IconContainer>
      )}
    </Container>
  )
}

interface IconContainerProps {
  isCodeBlock: boolean
}

const IconContainer = styled.div<IconContainerProps>`
  display: none;
  position: absolute;
  right: 5px;
  top: 2px;
  bottom: auto;

  & svg {
    fill: ${(props) => props.isCodeBlock && 'white'};
  }
`

const Container = styled.div`
  position: relative;

  &:hover ${IconContainer} {
    display: block;
  }
`

export default BlockWrapper
