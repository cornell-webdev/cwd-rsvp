import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIsSpacedRep from 'src/hooks/useIsSpacedRep'
import useIsWiki from 'src/hooks/useIsWiki'
import { setHide } from 'src/redux/appSlice'
import { IRootState } from 'src/types/redux.type'
import styled from 'styled-components'

interface ToggleBlurProps {
  children: React.ReactNode
}

const ToggledBlur = ({ children }: ToggleBlurProps) => {
  const { isHide } = useSelector((state: IRootState) => state.appState)
  const dispatch = useDispatch()

  const handleBlur = () => {
    dispatch(setHide(true))
  }

  useEffect(() => {
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('blur', handleBlur)
    }
  })

  const isSpacedRep = useIsSpacedRep()
  const isWiki = useIsWiki()

  return (
    <Container
      isHide={import.meta.env.VITE_NODE_ENV !== 'development' && !isSpacedRep && !isWiki && isHide}>
      {children}
    </Container>
  )
}

interface ContainerProps {
  isHide: boolean
}

const Container = styled.div<ContainerProps>`
  @media (min-width: ${(props) => props.theme.tablet}) {
    // isHide
    /* disabled temporarily */
    /* filter: ${(props) => props.isHide && 'blur(4px)'}; */
  }
`

export default ToggledBlur
