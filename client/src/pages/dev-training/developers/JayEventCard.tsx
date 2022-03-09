import { AxiosError } from 'axios'
import { Button, Text } from 'cornell-glue-ui'
import React from 'react'
import { QueryObserverResult, RefetchOptions } from 'react-query'
import { useIncrementEventViews } from 'src/api/event'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'

interface IJayEventCardProps {
  event: IEvent
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IEvent[], AxiosError<any>>>
}

const JayEventCard = ({ event, refetch }: IJayEventCardProps) => {
  const { incrementEventViewsAsync } = useIncrementEventViews()

  const handleClick = async () => {
    await incrementEventViewsAsync({
      _id: event?._id,
    })
    refetch()
  }

  return (
    <Container>
      {/* <img src={event?.imgs[0]} /> */}
      <StyledImg src={event?.imgs[0]} />
      <Text>{event?.title}</Text>
      <Text>{event?.views}</Text>
      <Button onClick={handleClick} endIcon={<ArrowUpwardOutlinedIcon />}>
        Increment
      </Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem 0;
`

const StyledImg = styled.img`
  height: 100px;
  width: 200px;
  border-radius: 8px;
`

export default JayEventCard
