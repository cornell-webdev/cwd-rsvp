import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined'
import LocationIcon from '@material-ui/icons/LocationOnOutlined'
import { Avatar, Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { useEventById } from 'src/api/event'
import BackButton from 'src/components/BackButton'
import LikeButton from 'src/components/events/LikeButton'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import { getEventDateTime } from 'src/util/date'
import styled from 'styled-components'

const EventDetails = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId

  const { event } = useEventById(eventId)

  console.log('event', event)

  if (!event) {
    return (
      <PageContainer>
        <Text>Invalid event</Text>
      </PageContainer>
    )
  }

  return (
    <PageContainer isMobileOnly isShowWarning={false} isNoPadding>
      <Container>
        <HoriPadding>
          <BackButton onClick={() => router.history.goBack()} />
        </HoriPadding>
        <ImgContainer>
          <EventImg src={event?.imgs?.length > 0 ? event?.imgs[0] : ''} />
        </ImgContainer>
        <HoriPadding>
          <Text variant='h5' fontWeight={700}>
            {event?.title}
          </Text>
          <IconRow>
            <CalendarIcon />
            <div>
              {event?.dates?.map((date) => (
                <Text key={`${date?.date}${date?.startTime}${date?.endTime}`}>
                  {getEventDateTime(new Date(date?.date), date?.startTime, date?.endTime)}
                </Text>
              ))}
            </div>
          </IconRow>
          <IconRow>
            <LocationIcon />
            <Text>{event?.location}</Text>
          </IconRow>
          <LikesRow alignCenter justifySpaceBetween>
            {event?.likedUserIds?.length > 0 ? (
              <Text>{event?.likedUserIds?.length} likes</Text>
            ) : (
              <div />
            )}
            <LikeButton event={event} variant='text' />
          </LikesRow>
          <Text variant='h5' fontWeight={700}>
            Event details
          </Text>
          <Text maxLines={2}>{event?.details}</Text>
          <Spacer y={0.5} />
          <Button
            variant='text'
            size='small'
            color={theme.text.default}
            background={theme.grey[50]}
            hoverBackground={theme.grey[100]}>
            Show more
          </Button>
          <Spacer y={2} />
          <Text variant='h5' fontWeight={700}>
            Host
          </Text>
          <FlexContainer alignCenter justifySpaceBetween>
            <Avatar name={event?.org?.name} />
            <Button variant='text'>Claim organization</Button>
          </FlexContainer>
          {event?.org?.desc?.length > 0 && (
            <div>
              <Text maxLines={2}>{event?.org?.desc}</Text>
              <Spacer y={0.5} />
              <Button
                variant='text'
                size='small'
                color={theme.text.default}
                background={theme.grey[50]}
                hoverBackground={theme.grey[100]}>
                Show more
              </Button>
            </div>
          )}
        </HoriPadding>
      </Container>
    </PageContainer>
  )
}

const Container = styled.div`
  padding: 1.5rem 0;
  overflow: hidden;
`

const HoriPadding = styled.div`
  padding: 0 0.75rem;
`

const ImgContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  @media (min-width: ${(props) => props.theme.small}) {
    padding: 0 0.75rem;
  }
`

const EventImg = styled.img`
  width: 100%;
  height: 187px;
  object-fit: cover;
  border-top: 1px solid ${(props) => props.theme.border.default};
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  @media (min-width: ${(props) => props.theme.small}) {
    border-radius: 10px;
    height: 25vw;
  }
`

const IconRow = styled(FlexContainer)`
  margin: 1rem 0;

  & svg {
    margin-right: 0.5rem;
    fill: ${(props) => props.theme.text.default} !important;
  }
`

const LikesRow = styled(FlexContainer)`
  margin: 2rem 0;
`

export default EventDetails
