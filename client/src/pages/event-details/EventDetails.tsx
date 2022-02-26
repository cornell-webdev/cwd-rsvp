import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import LocationIcon from '@mui/icons-material/LocationOnOutlined'
import { Avatar, Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEventById, useIncrementEventViews } from 'src/api/event'
import BackButton from 'src/components/BackButton'
import LikeButton from 'src/components/events/LikeButton'
import GradientAnimation from 'src/components/GradientAnimation'
import PageContainer from 'src/components/layout/PageContainer'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import { getEventDateTime } from 'src/util/date'
import getEventThumbnail from 'src/util/getEventThumbnail'
import styled from 'styled-components'

const EventDetails = () => {
  const isMobile = useIsMobile()
  const router = useRouter()
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
          <EventImg src={getEventThumbnail(event)} />
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
          {event?.isTicketed && (
            <>
              {/* <SectionHeading variant='h5' fontWeight={700}>
                Tickets
              </SectionHeading> */}
              <TicketSection>
                <BuyticketSection>
                  <FlexContainer flexDirection='column' alignStart>
                    {/* TODO: conditionally display early price */}
                    <Text variant='h3' color={theme.background.default}>
                      ${event?.price}
                    </Text>
                    <Spacer y={0.5} />
                    <Text variant='meta2' color={theme.background.default}>
                      Early bird pricing
                    </Text>
                    <Text variant='meta2' color={theme.background.default}>
                      until Feb. 28
                    </Text>
                  </FlexContainer>
                  <FlexContainer flexDirection='column' alignEnd>
                    <Text variant='meta2' color={theme.background.default}>
                      21 / 300 sold
                    </Text>
                    {/* TODO: conditionally render this based on if seller is in request query */}
                    <Text variant='meta2' color={theme.background.default}>
                      Buying from Jay Joo
                    </Text>
                    <Spacer y={0.3} />
                    <Link to={`/buy-ticket/${event?._id}`}>
                      <Button
                        background={theme.background.default}
                        color={theme.brand[500]}
                        hoverBackground={theme.brand[50]}>
                        Buy ticket
                      </Button>
                    </Link>
                  </FlexContainer>
                </BuyticketSection>
                {/* <Button>Buy ticket</Button> */}
              </TicketSection>
            </>
          )}
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
            <Avatar name={event?.org?.name} underline={event?.org?.website} />
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

const TicketSection = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const BuyticketSection = styled.div`
  width: 100%;
  background: ${(props) => props.theme.brand[500]};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;

  background: linear-gradient(45deg, #ff3683, #ef903c);
  background-size: 200% auto;
  animation: ${GradientAnimation} 4s linear infinite;
`

export default EventDetails
