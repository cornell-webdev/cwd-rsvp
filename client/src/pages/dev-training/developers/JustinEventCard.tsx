import React from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import { useIncrementEventViews } from 'src/api/event'
import { Button } from 'cornell-glue-ui'
import { QueryObserverResult, RefetchOptions } from 'react-query'
import { AxiosError } from 'axios'
import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined'

interface IJustinEventCardProps {
  event: IEvent
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IEvent[], AxiosError<any>>>
}

const JustinEventCard = ({ event, refetch }: IJustinEventCardProps) => {
  const title = event.title
  const views = event.views
  const img = event.imgs
  const { incrementEventViewsAsync } = useIncrementEventViews()

  const handleClick = async () => {
    await incrementEventViewsAsync({
      _id: event?._id,
    })
    refetch()
  }

  return (
    <Container>
      <p>Title: {title}</p>
      <Button startIcon={<PlusOneOutlinedIcon></PlusOneOutlinedIcon>} onClick={handleClick}>
        Increment Count
      </Button>
      <p>Views: {views}</p>
      <img src={img[0]}></img>
    </Container>
  )
}

const Container = styled.div``

export default JustinEventCard
