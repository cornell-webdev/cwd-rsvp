import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
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
      <ArrowButton disabled={disabled} onClick={() => scrollPrev()} isLeft>
        <LeftIcon />
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
        <RightIcon />
      </ArrowButton>
    </ArrowContainer>
  )
}

const ArrowContainer = styled.div`
  position: relative;
  background: transparent;
`

export interface IArrowButtonProps {
  isLeft?: boolean
}

const ArrowButton = styled.button<IArrowButtonProps>`
  position: absolute;
  top: 15px;
  bottom: 15px;
  left: 8px;
  text-align: center;
  margin: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  z-index: 2;
  width: 2.5rem;
  background: ${(props) => props.theme.grey[50]};
  border-radius: 6px;

  /* disabled */
  display: ${(props) => props.disabled && 'none'};

  /* isLeft */
  left: ${(props) => props.isLeft && 'unset'};
  right: ${(props) => props.isLeft && 0};

  &:hover {
    background: ${(props) => props.theme.grey[100]};
  }
`

const RightIcon = styled(ChevronRightIcon)`
  width: 2.8rem !important;
  height: 5rem !important;
  fill: ${(props) => props.theme.text.default} !important;
`

const LeftIcon = styled(ChevronLeftIcon)`
  width: 2.8rem !important;
  height: 5rem !important;
  fill: ${(props) => props.theme.text.default} !important;
`
