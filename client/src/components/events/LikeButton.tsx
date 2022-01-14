import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { FlexContainer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import { useToggleEventLike } from '../../api/event'
import { useCurrentUser } from 'src/api/user'

interface ILikeProps {
  event: IEvent
}

const LikeButton: React.FC<ILikeProps> = ({ event }: ILikeProps) => {
  const [likeCount, setLikeCount] = useState(event.likedUserIds.length)
  const { currentUser } = useCurrentUser()
  const [liked, setLiked] = useState(
    currentUser && !!event.likedUserIds?.find((id) => id === currentUser?._id)
  )

  const { toggleEventLikeAsync } = useToggleEventLike()

  const onLike = async () => {
    const eventId = event._id
    await toggleEventLikeAsync({
      _id: eventId,
    })
  }

  if (!liked) {
    return (
      <HeartButton
        onClick={() => {
          setLikeCount(likeCount + 1)
          setLiked(true)
          onLike()
        }}>
        <FlexContainer alignCenter>
          <Text variant='meta2' fontWeight={700} color={theme.text.light}>
            {likeCount}
          </Text>
          <HeartOutlinedIcon />
        </FlexContainer>
      </HeartButton>
    )
  }

  return (
    <HeartButton
      onClick={() => {
        setLikeCount(likeCount - 1)
        setLiked(false)
        onLike()
      }}>
      <FlexContainer alignCenter>
        <Text variant='meta2' fontWeight={700} color={theme.text.light}>
          {likeCount}
        </Text>
        <HeartFilledIcon />
      </FlexContainer>
    </HeartButton>
  )
}

const HeartOutlinedIcon = styled(FavoriteBorderIcon)`
  width: 20px !important;
  fill: #d05f5f !important;
  margin-left: 0.3rem;
`

const HeartFilledIcon = styled(FavoriteIcon)`
  width: 20px !important;
  fill: #d05f5f !important;
  margin-left: 0.3rem;
`

const HeartButton = styled.button`
  float: right;
  margin-left: 4px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  background: ${(props) => props.theme.grey[50]};

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.grey[100]};
    }
  }
`

export default LikeButton
