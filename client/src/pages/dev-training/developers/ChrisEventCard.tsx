import React from 'react'
import { Text, Button } from 'cornell-glue-ui'
import styled from 'styled-components'
import { IEvent } from 'src/types/event.type'
import { useIncrementEventViews } from 'src/api/event'
import { QueryObserverResult, RefetchOptions } from 'react-query'
import { AxiosError } from 'axios'
import AddIcon from '@mui/icons-material/Add'

interface IChrisEventCardProps {
  event: IEvent
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IEvent[], AxiosError<any>>>
}

const ChrisEventCard = ({ event, refetch }: IChrisEventCardProps) => {
  const { incrementEventViewsAsync } = useIncrementEventViews()

  const handleClick = async () => {
    await incrementEventViewsAsync({ _id: event?._id })
    refetch()
  }

  return (
    <Container>
      <Text>{event?.title}</Text>
      <Text>{event?.views}</Text>
      <Img src={event?.imgs[0]} />
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Increment
      </Button>
    </Container>
  )
}

const Container = styled.div``

const Img = styled.img`
  height: 100px;
  width: 200px;
  border-radius: 8px;
`

export default ChrisEventCard
