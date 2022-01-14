import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { FlexContainer } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import { useToggleEventLike } from '../../api/event'

interface ILikeProps {
  event: IEvent
}

const LikeButton: React.FC<ILikeProps> = ({ event }) => {
  const [likeCount, setLikeCount] = useState(event.likedUserIds.length)
  const [liked, setLiked] = useState(false)

  const { toggleEventLikeAsync } = useToggleEventLike()

  const onLike = async () => {
    const eventId = event._id
    await toggleEventLikeAsync({
      _id: eventId,
    })
  }

  if (!liked) {
    return (
      <HeartContainer alignCenter={true}>
        {likeCount}
        <HeartButton
          onClick={() => {
            setLikeCount(likeCount + 1)
            setLiked(true)
            onLike()
          }}>
          <HeartOutlined />
        </HeartButton>
      </HeartContainer>
    )
  } else {
    return (
      <HeartContainer alignCenter={true}>
        {likeCount}
        <HeartButton
          onClick={() => {
            setLikeCount(likeCount - 1)
            setLiked(false)
            onLike()
          }}>
          <HeartFilled />
        </HeartButton>
      </HeartContainer>
    )
  }
}

const HeartContainer = styled(FlexContainer)`
  font-size: 12px;
  font-weight: medium;
  text-align: right;
  float: right;
`
const HeartButton = styled.button`
  float: right;
  width: 15px;
  height: 13.76px;
  color: #d05f5f;
  margin-left: 4px;
  padding: 1px;
  background: transparent;
  cursor: pointer;
`

export default LikeButton
