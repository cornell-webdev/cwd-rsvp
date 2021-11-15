import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useUpdateCardById } from 'src/api/card'
import { useTags } from 'src/api/tag'
import theme from 'src/app/theme'
import { ICard, ICardStatus } from 'src/types/card.type'
import { isDateTodayOrBefore } from 'src/util/date'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TagList from '../tag/TagList'

interface CardToolBarProps {
  card: ICard
  status: ICardStatus
}

const CardToolBar = ({ card, status }: CardToolBarProps) => {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>()
  const { tags } = useTags()
  const { updateCard } = useUpdateCardById(card?._id, {
    isNotUpdateLocal: true,
  })

  useEffect(() => {
    if (card?.tags) {
      setSelectedTagIds(card?.tags?.map((tag) => tag?._id))
    }
  }, [card])

  useEffect(() => {
    if (selectedTagIds && status === 'EDITING') {
      updateCard({
        _id: card?._id,
        tags: selectedTagIds,
      })
    }
  }, [selectedTagIds])

  return (
    <Container>
      {selectedTagIds && (
        <TagList
          isCreate={status === 'EDITING'}
          isFiltered={status !== 'EDITING'}
          tags={tags || []}
          selectedTagIds={selectedTagIds}
          setSelectedTagIds={
            status === 'EDITING' ? setSelectedTagIds : undefined
          }
        />
      )}
      <Space padding='.3rem 0' />
      <InfoTextContainer>
        {card?.repAt &&
          (card?.isLearning ? (
            <Text variant='h5' color={theme.text.muted}>
              {isDateTodayOrBefore(new Date(card.repAt))
                ? 'Qued'
                : `Next rep ${moment(card?.repAt).fromNow()}`}{' '}
              • {card?.repSpace} days rep space • {card?.repCount} total reps
            </Text>
          ) : (
            <Text variant='h5' color={theme.text.muted}>
              Archived • {card?.repCount} total reps
            </Text>
          ))}
      </InfoTextContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 0.5rem;
`

const InfoTextContainer = styled(FlexRow)`
  padding-left: 0.2rem;
  width: 100%;
`

export default CardToolBar
