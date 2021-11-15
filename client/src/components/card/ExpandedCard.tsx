import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateAndDequeCardById, useUpdateCardById } from 'src/api/card'
import theme from 'src/app/theme'
import useIsMobile from 'src/hooks/useIsMobile'
import useIsSpacedRep from 'src/hooks/useIsSpacedRep'
import useKeypress from 'src/hooks/useKeyPress'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { ICard, ICardStatus } from 'src/types/card.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import CodableTextarea from '../form-elements/CodableTextarea'
import { FlexRow } from '../layout/Flex'
import OutsideClickListener from '../util/OutsideClickListener'
import CardActionButtons from './CardActionButtons'
import CardToolBar from './CardToolbar'

interface ExpandedCardProps {
  card: ICard
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
}

const ExpandedCard = ({ card, status, setStatus }: ExpandedCardProps) => {
  const dispatch = useDispatch()
  const { updateAndDequeCard } = useUpdateAndDequeCardById(card?._id)
  const { updateCard } = useUpdateCardById(card?._id)
  const isMobile = useIsMobile()
  const isSpacedRep = useIsSpacedRep()

  const handleOutsideClick = () => {
    if (!isSpacedRep) setStatus('COLLAPSED')
  }

  const handleRepeatRep = () => {
    const updateObj = {
      _id: card?._id,
      repAt: new Date().setDate(new Date().getDate() + card?.repSpace),
      repCount: card?.repCount + 1,
    }
    if (isSpacedRep) {
      updateAndDequeCard(updateObj)
    } else {
      updateCard(updateObj)
    }
    dispatch(
      showSnackbar({
        variant: 'info',
        message: `Card rep will repeat in ${card?.repSpace} days.`,
      })
    )
  }

  const handleDoubleRep = () => {
    const updateObj = {
      _id: card?._id,
      repSpace: card?.repSpace * 2,
      repAt: new Date().setDate(new Date().getDate() + card?.repSpace * 2),
      repCount: card?.repCount + 1,
    }
    if (isSpacedRep) {
      updateAndDequeCard(updateObj)
    } else {
      updateCard(updateObj)
    }
    dispatch(
      showSnackbar({
        variant: 'success',
        message: `Card rep has doubled and will repeat in ${
          card?.repSpace * 2
        } days.`,
      })
    )
  }

  const flipCard = () => {
    if (status === 'EXPANDED') {
      setStatus('FLIPPED')
    } else if (status === 'FLIPPED') {
      setStatus('EXPANDED')
    }
  }

  useKeypress('ArrowRight', (event) => {
    if (isSpacedRep) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      handleDoubleRep()
    }
  })

  useKeypress('ArrowLeft', (event) => {
    if (isSpacedRep) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      handleRepeatRep()
    }
  })

  return (
    <OutsideClickListener onOutsideClick={handleOutsideClick}>
      <Container>
        <CardActionButtons card={card} status={status} setStatus={setStatus} />
        <LearnSection justifySpaceBetween alignCenter>
          <RepButtonContainer onClick={handleRepeatRep}>
            <FlexRow alignStart>
              <ArrowBackIcon className='left' />
              <div>
                <Text variant='p' fontWeight={700} color={theme.grey[700]}>
                  Not sure
                </Text>
                <Text variant='h5' color={theme.text.muted}>
                  Repeat rep
                </Text>
              </div>
            </FlexRow>
          </RepButtonContainer>
          <FlipButton onClick={flipCard}>
            <LoopOutlinedIcon />
            {!isMobile && (
              <FlipLabel variant='p' fontWeight={700} color={theme.text.muted}>
                Flip
              </FlipLabel>
            )}
          </FlipButton>
          <RepButtonContainer onClick={handleDoubleRep}>
            <FlexRow alignStart>
              <div>
                <StyledText
                  variant='p'
                  fontWeight={700}
                  color={theme.grey[700]}>
                  Got it!
                </StyledText>
                <Text variant='h5' color={theme.text.muted}>
                  Space rep
                </Text>
              </div>
              <ArrowForwardIcon className='right' />
            </FlexRow>
          </RepButtonContainer>
        </LearnSection>
        <Content>
          <CodableTextarea
            blocks={status === 'EXPANDED' ? card?.question : card?.answer}
          />
        </Content>
        <CardToolBar card={card} status={status} />
      </Container>
    </OutsideClickListener>
  )
}

const Container = styled.div`
  padding: 0.5rem 0.2rem;
`

const LearnSection = styled(FlexRow)``

const Content = styled.div`
  margin: 1rem 0;
`

const StyledText = styled(Text)`
  text-align: right;
`

const RepButtonContainer = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;

  & svg {
    fill: ${(props) => props.theme.grey[700]} !important;
  }

  & svg.left {
    margin-right: 0.5rem;
  }

  & svg.right {
    margin-left: 0.5rem;
  }

  &:hover {
    background: ${(props) => props.theme.grey[50]};
  }
`

const FlipButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.4rem;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => props.theme.grey[100]};

  & svg {
    fill: ${(props) => props.theme.grey[500]};
  }

  &:hover {
    background: ${(props) => props.theme.grey[200]};
  }
`

const FlipLabel = styled(Text)`
  margin-left: 0.5rem;
  margin-right: 0.3rem;
`

export default ExpandedCard
