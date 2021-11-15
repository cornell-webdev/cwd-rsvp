import React, { useState } from 'react'
import { ICard, ICardStatus } from 'src/types/card.type'
import { isBlocksEmpty } from 'src/util/card'
import styled from 'styled-components'
import CollapsedCard from './CollapsedCard'
import EditingCard from './EditingCard'
import ExpandedCard from './ExpandedCard'

interface CardItemProps {
  card: ICard
  initStatus: ICardStatus
  refetchCards: () => void
}

const CardItem = ({ card, initStatus, refetchCards }: CardItemProps) => {
  const canSave = !isBlocksEmpty(card?.question)
  const [status, setStatus] = useState<ICardStatus>(
    canSave ? initStatus || 'COLLAPSED' : 'EDITING'
  )

  const getComponent = () => {
    switch (status) {
      case 'COLLAPSED':
        return <CollapsedCard card={card} setStatus={setStatus} />
      case 'EDITING':
        return (
          <EditingCard
            card={card}
            status={status}
            setStatus={setStatus}
            refetchCards={refetchCards}
          />
        )
      case 'EXPANDED':
        return (
          <ExpandedCard card={card} status={status} setStatus={setStatus} />
        )
      case 'FLIPPED':
        return (
          <ExpandedCard card={card} status={status} setStatus={setStatus} />
        )
    }
  }

  return <Container>{getComponent()}</Container>
}

const Container = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.grey[300]};
  margin-bottom: 1rem;
`

export default CardItem
