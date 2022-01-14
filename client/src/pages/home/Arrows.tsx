import React from 'react'

import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
    React.useContext(VisibilityContext)

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  )
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators])

  const isMobile = useIsMobile()

  if (isMobile) return null

  return (
    <ArrowContainer>
      <ArrowButton disabled={disabled} onClick={() => scrollPrev()}>
        Left
      </ArrowButton>
    </ArrowContainer>
  )
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext)

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  )
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators])

  const isMobile = useIsMobile()

  if (isMobile) return null

  return (
    <ArrowContainer>
      <ArrowButton disabled={disabled} onClick={() => scrollNext()}>
        Right
      </ArrowButton>
    </ArrowContainer>
  )
}

const ArrowContainer = styled.div`
  position: relative;
`

const ArrowButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  z-index: 2;
  width: 30px;

  /* disabled */
  opacity: ${(props) => props.disabled && 0};
`
