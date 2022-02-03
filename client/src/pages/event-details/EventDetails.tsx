import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined'
import LocationIcon from '@material-ui/icons/LocationOnOutlined'
import { Avatar, Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useEffect, useState } from 'react'
import { useEventById, useIncrementEventViews } from 'src/api/event'
import BackButton from 'src/components/BackButton'
import LikeButton from 'src/components/events/LikeButton'
import PageContainer from 'src/components/layout/PageContainer'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import { getEventDateTime } from 'src/util/date'
import styled from 'styled-components'

const EventDetails = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)

  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(false)
  const [isHostExpanded, setIsHostExpanded] = useState<boolean>(false)
  const { incrementEventViews } = useIncrementEventViews()

  useEffect(() => {
    if (eventId) {
      incrementEventViews({
        _id: eventId,
      })
    }
  }, [])

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
          <LikesContainer>
            <LikeButton event={event} variant='event-detail' />
          </LikesContainer>
          <SectionHeading variant='h5' fontWeight={700}>
            Event details
          </SectionHeading>
          <Text maxLines={!isMobile || isDetailsExpanded ? undefined : 3}>{event?.details}</Text>
          {isMobile && (
            <>
              <Spacer y={0.5} />
              <Button
                variant='text'
                size='small'
                color={theme.text.default}
                background={theme.grey[50]}
                hoverBackground={theme.grey[100]}
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}>
                {isDetailsExpanded ? 'Show less' : 'Show more'}
              </Button>
            </>
          )}
          <Spacer y={2} />
          <SectionHeading variant='h5' fontWeight={700}>
            Host
          </SectionHeading>
          <FlexContainer alignCenter justifySpaceBetween>
            <Avatar name={event?.org?.name} underline={event?.org?.email} />
            {/* TODO: claim org feature */}
            {/* <Button variant='text'>Claim organization</Button> */}
          </FlexContainer>
          <Spacer y={0.75} />
          {event?.org?.desc?.length > 0 && (
            <div>
              <Text maxLines={!isMobile || isHostExpanded ? undefined : 3}>{event?.org?.desc}</Text>
              {isMobile && (
                <>
                  <Spacer y={0.5} />
                  <Button
                    variant='text'
                    size='small'
                    color={theme.text.default}
                    background={theme.grey[50]}
                    hoverBackground={theme.grey[100]}
                    onClick={() => setIsHostExpanded(!isHostExpanded)}>
                    {isHostExpanded ? 'Show less' : 'Show more'}
                  </Button>
                </>
              )}
            </div>
          )}
        </HoriPadding>
      </Container>
    </PageContainer>
  )
}

const Container = styled.div`
  padding: 2rem 0 8rem 0;
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

const SectionHeading = styled(Text)`
  margin-bottom: 0.75rem;
`

const EventImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top: 1px solid ${(props) => props.theme.border.default};
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  @media (min-width: ${(props) => props.theme.small}) {
    border-radius: 10px;
    height: 300px;
    border: 1px solid ${(props) => props.theme.border.default};
  }
`

const IconRow = styled(FlexContainer)`
  margin: 1rem 0;

  & svg {
    margin-right: 0.5rem;
    fill: ${(props) => props.theme.text.default} !important;
  }
`

const LikesContainer = styled.div`
  margin: 2rem 0;
`

export default EventDetails
