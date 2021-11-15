import { IconButton } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import React from 'react'
import { useDispatch } from 'react-redux'
import theme from 'src/app/theme'
import ContainedButton from 'src/components/buttons/ContainedButton'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { ICard, ICardStatus, ICodableTextareaBlock } from 'src/types/card.type'
import { isBlocksEmpty } from 'src/util/card'
import styled from 'styled-components'
import { FlexRow } from '../layout/Flex'
import CardIsLearning from './CardIsLearning'
import CardMenu from './CardMenu'

interface CardActionButtonsProps {
  card: ICard
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
  questionBlocks?: ICodableTextareaBlock[]
  refetchCards?: () => void
}

const CardActionButtons = ({
  card,
  status,
  setStatus,
  questionBlocks,
  refetchCards,
}: CardActionButtonsProps) => {
  const dispatch = useDispatch()

  const toggleStatus = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (status === 'EDITING') {
      if (questionBlocks && isBlocksEmpty(questionBlocks)) {
        dispatch(
          showSnackbar({
            variant: 'error',
            message: 'Question cannot be empty',
          })
        )
      } else if (!refetchCards) {
        dispatch(
          showSnackbar({
            variant: 'error',
            message: 'No refetch function defined',
          })
        )
      } else {
        setStatus('EXPANDED')
        refetchCards()
        dispatch(
          showSnackbar({
            variant: 'success',
            message: 'Card has been saved',
          })
        )
      }
    } else {
      setStatus('EDITING')
    }
  }

  return (
    <ButtonsContainer alignCenter justifyEnd>
      <CardIsLearning isLearning={card?.isLearning} cid={card?._id} />
      <IconButton size='small' color='inherit' onClick={toggleStatus}>
        {status === 'EDITING' ? (
          <ContainedButton background={theme.success[500]}>
            Save
          </ContainedButton>
        ) : (
          <StyledEditIcon />
        )}
      </IconButton>
      <CardMenu status={status} setStatus={setStatus} card={card} />
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled(FlexRow)`
  width: 100%;
  padding: 0 0 1rem 0;

  & > * {
    margin-left: 0.5rem !important;
  }
`

const StyledEditIcon = styled(EditOutlinedIcon)`
  fill: ${(props) => props.theme.grey[700]} !important;
`

export default CardActionButtons
