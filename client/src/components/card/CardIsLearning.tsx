import React from 'react'
import { useUpdateAndDequeCardById, useUpdateCardById } from 'src/api/card'
import styled from 'styled-components'
import useIsSpacedRep from 'src/hooks/useIsSpacedRep'
import { useDispatch } from 'react-redux'
import { showSnackbar } from 'src/redux/snackbarSlice'

interface CardIsLearningProps {
  cid: string
  isLearning: boolean
}

const CardIsLearning = ({ cid, isLearning }: CardIsLearningProps) => {
  const { updateCard } = useUpdateCardById(cid)
  const { updateAndDequeCard } = useUpdateAndDequeCardById(cid)
  const isSpacedRep = useIsSpacedRep()
  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (isSpacedRep) {
      updateAndDequeCard({
        _id: cid,
        isLearning: false,
      })

      dispatch(
        showSnackbar({
          type: 'success',
          message: 'Archived card.',
        })
      )
    } else {
      updateCard({
        _id: cid,
        isLearning: !isLearning,
      })
    }
  }

  return (
    <Container isLearning={isLearning} onClick={handleClick}>
      {isLearning ? 'Learning' : 'Archived'}
    </Container>
  )
}

interface ContainerProps {
  isLearning: boolean
}

const Container = styled.div<ContainerProps>`
  font-size: 0.8rem;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.danger[400]};
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  color: ${(props) => props.theme.danger[400]};
  cursor: pointer;

  // isLearning
  color: ${(props) => props.isLearning && props.theme.success[400]};
  border-color: ${(props) => props.isLearning && props.theme.success[400]};
`

export default CardIsLearning
