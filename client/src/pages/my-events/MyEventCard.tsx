import { Button, FlexContainer, IconButton, Spacer, Text } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmationModal from 'src/components/layout/ConfirmationModal'
import { useDeleteEvent } from 'src/api/event'

interface IMyEventCardProps {
  event: IEvent
}

const MyEventCard = ({ event }: IMyEventCardProps) => {
  const [isDeleteModoalOpen, setIsDeleteModoalOpen] = useState<boolean>(false)
  const { deleteEventAsync } = useDeleteEvent()

  const handleDelete = async () => {
    await deleteEventAsync({ _id: event?._id })
    setIsDeleteModoalOpen(false)
  }

  return (
    <>
      <Container>
        {event?.imgs?.length >= 1 ? <Thumbnail src={event?.imgs[0]} /> : <ImgPlaceholder />}
        <RightSection>
          <TextSection>
            <Text variant='meta2'>30 likes • 88 views</Text>
            <Text variant='meta1' fontWeight={700}>
              {event?.title}
            </Text>
          </TextSection>
          <FlexContainer alignCenter justifySpaceBetween fullWidth>
            <FlexContainer>
              {/* TODO: link buttons */}
              <Button>Edit</Button>
              <Spacer x={2} />
              <Button variant='text'>View event</Button>
            </FlexContainer>
            <IconButton icon={<DeleteIcon />} onClick={() => setIsDeleteModoalOpen(true)} />
          </FlexContainer>
        </RightSection>
      </Container>
      <ConfirmationModal
        isOpen={isDeleteModoalOpen}
        onRequestClose={() => setIsDeleteModoalOpen(false)}
        onConfirm={handleDelete}
        heading='Delete published event'
        body='The event will no longer exist on RSVP'
        confirmationText='Delete'
      />
    </>
  )
}

const Container = styled.div`
  padding: 0.33rem 0;
  display: flex;
  align-items: stretch;
`

const Thumbnail = styled.img`
  border-radius: 6px;
  height: 87px;
  width: 87px;
  object-fit: cover;
`

const ImgPlaceholder = styled.div`
  height: 87px;
  width: 87px;
  background: ${(props) => props.theme.grey[200]};
  border-radius: 6px;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 87px;
  flex-grow: 1;
  margin-left: 0.625rem;
`

const TextSection = styled.div`
  margin-bottom: 12px;
`

export default MyEventCard
