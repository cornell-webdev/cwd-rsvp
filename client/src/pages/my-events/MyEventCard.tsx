import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteEvent } from 'src/api/event'
import GradientAnimation from 'src/components/GradientAnimation'
import ConfirmationModal from 'src/components/layout/ConfirmationModal'
import { IEvent } from 'src/types/event.type'
import getBumpedCount from 'src/util/getBumpedCount'
import getEventThumbnail from 'src/util/getEventThumbnail'
import styled from 'styled-components'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined'

interface IMyEventCardProps {
  event: IEvent
}

const MyEventCard = ({ event }: IMyEventCardProps) => {
  const [isDeleteModoalOpen, setIsDeleteModoalOpen] = useState<boolean>(false)
  const { deleteEventAsync } = useDeleteEvent()

  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDeleteModoalOpen(true)
  }

  const handleDelete = async () => {
    await deleteEventAsync({ _id: event?._id })
    setIsDeleteModoalOpen(false)
  }

  return (
    <div>
      <StyledLink to={`/event/${event?._id}`}>
        <Container>
          <Thumbnail src={getEventThumbnail(event)} />
          <RightSection>
            <TextSection>
              <Text variant='meta2'>
                {getBumpedCount(event, 'LIKES')} likes • {getBumpedCount(event, 'VIEWS')} views
              </Text>
              <Text variant='meta1' fontWeight={700}>
                {event?.title}
              </Text>
            </TextSection>
            <FlexContainer alignCenter justifySpaceBetween fullWidth>
              <FlexContainer alignCenter>
                <Link to={`/edit-event/${event?._id}`}>
                  <Button startIcon={<EditOutlinedIcon />}>Edit</Button>
                </Link>
                <Spacer x={1} />
                {event?.isTicketed ? (
                  <Link to={`/dashboard/${event?._id}`}>
                    <TicketingButton startIcon={<LocalActivityOutlinedIcon />}>
                      Ticketing
                    </TicketingButton>
                  </Link>
                ) : (
                  <Button
                    variant='text'
                    background={theme.grey[100]}
                    hoverBackground={theme.grey[200]}
                    color={theme.text.default}
                    onClick={handleDeleteButtonClick}>
                    Delete
                  </Button>
                )}
              </FlexContainer>
            </FlexContainer>
          </RightSection>
        </Container>
      </StyledLink>
      <ConfirmationModal
        isOpen={isDeleteModoalOpen}
        onRequestClose={() => setIsDeleteModoalOpen(false)}
        onConfirm={handleDelete}
        heading='Delete published event'
        body='The event will no longer exist on RSVP'
        confirmationText='Delete'
      />
    </div>
  )
}

const StyledLink = styled(Link)`
  width: 100%;
`

const Container = styled.div`
  padding: 0.33rem 0;
  display: flex;
  align-items: stretch;
  border-radius: 10px;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.grey[50]};
    }
  }
`

const Thumbnail = styled.img`
  height: 87px;
  width: 87px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.border.default};

  @media (min-width: ${(props) => props.theme.small}) {
    width: 45%;
    height: 120px;
  }
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

const TicketingButton = styled(Button)`
  border: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: linear-gradient(45deg, #ff3683, #ef903c);
  background-size: 200% auto;
  animation: ${GradientAnimation} 4s linear infinite;
`

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  fill: ${(props) => props.theme.background.default} !important;
`

export default MyEventCard
