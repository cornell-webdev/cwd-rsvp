import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Button, FlexContainer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import { useToggleEventLike } from '../../api/event'
import { useCurrentUser } from 'src/api/user'

interface ILikeProps {
  event: IEvent
  variant?: 'default' | 'text'
}

const LikeButton: React.FC<ILikeProps> = ({ event, variant = 'default' }: ILikeProps) => {
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

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setLikeCount(likeCount + 1)
    setLiked(true)
    onLike()
  }

  const handleUnlike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setLikeCount(likeCount - 1)
    setLiked(false)
    onLike()
  }

  if (variant === 'text') {
    return (
      <Button
        variant={liked ? 'contained' : 'outlined'}
        size='small'
        startIcon={
          liked ? <HeartFilledIcon variant={variant} /> : <HeartOutlinedIcon variant={variant} />
        }
        onClick={liked ? handleUnlike : handleLike}>
        Like this event
      </Button>
    )
  }

  return (
    <HeartButton onClick={liked ? handleUnlike : handleLike}>
      <FlexContainer alignCenter>
        <Text variant='meta2' fontWeight={700} color={theme.text.light}>
          {likeCount}
        </Text>
        {liked ? <HeartFilledIcon /> : <HeartOutlinedIcon />}
      </FlexContainer>
    </HeartButton>
  )
}

export interface IHeartOutlinedIconProps {
  variant?: ILikeProps['variant']
}

const HeartOutlinedIcon = styled(FavoriteBorderIcon)<IHeartOutlinedIconProps>`
  width: 20px !important;
  fill: ${(props) => props.theme.brand[500]} !important;
  margin-left: 0.3rem;

  /* variant */
  margin-left: ${(props) => props.variant === 'text' && 'unset'};
`

interface IHeartFilledIconProps {
  variant?: ILikeProps['variant']
}

const HeartFilledIcon = styled(FavoriteIcon)<IHeartFilledIconProps>`
  width: 20px !important;
  fill: ${(props) => props.theme.brand[500]} !important;
  margin-left: 0.3rem;

  /* variant */
  margin-left: ${(props) => props.variant === 'text' && 'unset'};
  fill: ${(props) => props.variant === 'text' && props.theme.brand[900]} !important;
`

const HeartButton = styled.button`
  float: right;
  margin-left: 4px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  background: ${(props) => props.theme.grey[50]};
  z-index: 2;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.grey[100]};
    }
  }
`

export default LikeButton
