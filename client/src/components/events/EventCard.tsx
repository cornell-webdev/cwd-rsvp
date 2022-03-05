import { FlexContainer, Spacer, Tag, Text, theme } from 'cornell-glue-ui'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { IEvent } from 'src/types/event.type'
import { getEventDate, getEventTime } from 'src/util/date'
import getEventThumbnail from 'src/util/getEventThumbnail'
import { capitalizeFirstChar } from 'src/util/string'
import styled from 'styled-components'
import LikeButton from './LikeButton'
import TicketIcon from '@mui/icons-material/ConfirmationNumber'
import GradientAnimation from '../GradientAnimation'
import useIsMobile from 'src/hooks/useIsMobile'

interface IEventProps {
  event: IEvent
  startTime: string
  endTime: string
  date?: Date
}

const EventCard: React.FC<IEventProps> = ({ event, startTime, endTime, date }: IEventProps) => {
  const isMobile = useIsMobile()

  return (
    <StyledLink to={`/event/${event?._id}`}>
      <EventContainer alignStart>
        <Thumbnail src={getEventThumbnail(event)} />
        <TextContainer>
          <Text variant={isMobile ? 'meta2' : 'meta1'} maxLines={1}>
            {event.org.name}
          </Text>
          <Text fontWeight='700' variant={isMobile ? 'meta1' : 'h6'} maxLines={2}>
            {event.title}
          </Text>
          {event?.isTicketed && (
            <TicketSaleContainer>
              <StyledTicketIcon />
              <Text variant='meta1' color={theme.background.default}>
                Buy tickets
              </Text>
            </TicketSaleContainer>
          )}
          {event?.tag && !event?.isTicketed && (
            <TagContainer>
              <Tag
                variant='contained'
                color={event.tag?.color}
                background={event.tag?.backgroundColor}>
                {capitalizeFirstChar(event?.tag?.name)}
              </Tag>
            </TagContainer>
          )}
          <Spacer y={0.2} />
          <FlexContainer justifySpaceBetween alignCenter>
            {date !== undefined ? (
              <Text variant='meta2' color='#d05f5f' fontWeight='700'>
                {getEventTime(startTime)} - {getEventTime(endTime)}, {getEventDate(date)}
              </Text>
            ) : (
              <Text variant='meta2' color='#d05f5f' fontWeight='700'>
                {getEventTime(startTime)} - {getEventTime(endTime)}
              </Text>
            )}
            <div>
              <LikeButton event={event} />
            </div>
          </FlexContainer>
        </TextContainer>
      </EventContainer>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  margin: 0.25rem 0;
  width: 100%;
`

const EventContainer = styled(FlexContainer)`
  position: relative;
  padding: 0.5rem 0.375rem;
  cursor: pointer;
  border-radius: 8px;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.grey[50]};
    }
  }
`

const Thumbnail = styled.img`
  border-radius: 6px;
  min-width: 87px;
  width: 45%;
  margin-right: 10px;
  /* object-fit: contain; */
  object-fit: cover;
  border: 1px solid ${(props) => props.theme.border.default};
  height: 76px;

  @media (min-width: ${(props) => props.theme.small}) {
    height: 120px;
  }
`

const TagContainer = styled.div`
  margin: 0.3rem 0;
`

const TextContainer = styled.div`
  width: 55%;
`

const TicketSaleContainer = styled.div`
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;

  background: linear-gradient(45deg, #ff3683, #ef903c);
  background-size: 200% auto;
  animation: ${GradientAnimation} 4s linear infinite;
`

const StyledTicketIcon = styled(TicketIcon)`
  margin-right: 0.5rem;
  height: 20px;
  width: 20px;
  fill: ${(props) => props.theme.background.default};
`

export default memo(EventCard)
