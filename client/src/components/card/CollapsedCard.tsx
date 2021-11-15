import React from 'react'
import useIsTablet from 'src/hooks/useIsTablet'
import { ICard, ICardStatus } from 'src/types/card.type'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import CardIsLearning from './CardIsLearning'
import CardMenu from './CardMenu'

interface CollapsedCardProps {
  card: ICard
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
}

const CollapsedCard = ({ card, setStatus }: CollapsedCardProps) => {
  const handleClick = () => {
    setStatus('EXPANDED')
  }

  const isTablet = useIsTablet()

  return (
    <Container onClick={handleClick}>
      <FlexRow justifySpaceBetween alignStart>
        <Text variant='p' maxLines={2}>
          {card?.question[0]?.value}
        </Text>
        <RightSide alignCenter>
          {!isTablet && (
            <CardIsLearning isLearning={card?.isLearning} cid={card?._id} />
          )}
          <CardMenu card={card} setStatus={setStatus} status='COLLAPSED' />
        </RightSide>
      </FlexRow>
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 0 0.5rem 0.8rem;
  cursor: pointer;
`

const RightSide = styled(FlexRow)`
  & > * {
    margin-left: 0.5rem;
  }
`

export default CollapsedCard
