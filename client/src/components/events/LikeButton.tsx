import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useCurrentUser } from 'src/api/user'
import useRouter from 'src/hooks/useRouter'
import { IEvent } from 'src/types/event.type'
import getBumpedCount from 'src/util/getBumpedCount'
import styled from 'styled-components'
import { useToggleEventLike } from '../../api/event'
import AvatarGroup from '../AvatarGroup'

interface ILikeProps {
  event: IEvent
  variant?: 'default' | 'event-detail'
}

const LikeButton: React.FC<ILikeProps> = ({ event, variant = 'default' }: ILikeProps) => {
  const [likeCount, setLikeCount] = useState(getBumpedCount(event, 'LIKES'))
  const { currentUser } = useCurrentUser()
  const [liked, setLiked] = useState(
    currentUser && !!event.likedUserIds?.find((id) => id === currentUser?._id)
  )
  const currentUserAvatarUrl = currentUser?.providerData?.photos[0]?.value
  const [avatarUrls, setAvatarUrls] = useState<string[]>(
    event?.likedUsers?.map((user) => user.providerData?.photos[0]?.value)
  )
  const router = useRouter()

  const { toggleEventLikeAsync } = useToggleEventLike()

  const toggleLike = async () => {
    const eventId = event._id
    await toggleEventLikeAsync({
      _id: eventId,
    })
  }

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (!currentUser) {
      router.push('/login')
    } else {
      setLikeCount(likeCount + 1)
      setLiked(true)
      toggleLike()
      setAvatarUrls([currentUserAvatarUrl, ...avatarUrls])
    }
  }

  const handleUnlike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (!currentUser) {
      router.push('/login')
    } else {
      setLikeCount(likeCount - 1)
      setLiked(false)
      toggleLike()
      const newAvatarUrls = avatarUrls?.filter((url) => url !== currentUserAvatarUrl)
      setAvatarUrls(newAvatarUrls)
    }
  }

  if (variant === 'event-detail') {
    return (
      <FlexContainer alignCenter justifySpaceBetween>
        <Button
          variant={liked ? 'contained' : 'outlined'}
          size='small'
          startIcon={
            liked ? <HeartFilledIcon variant={variant} /> : <HeartOutlinedIcon variant={variant} />
          }
          onClick={liked ? handleUnlike : handleLike}>
          Like event
        </Button>
        {likeCount > 0 && (
          <FlexContainer alignCenter>
            <AvatarGroup
              avatarUrls={avatarUrls}
              spoofCount={likeCount >= 3 ? 3 - avatarUrls?.length : likeCount - avatarUrls?.length}
              spoofOffset={event.title?.length % 20}
            />
            <Spacer x={0.7} />
            <Text variant='meta1'>{likeCount} likes</Text>
          </FlexContainer>
        )}
      </FlexContainer>
    )
  }

  return (
    <>
      <HeartButton onClick={liked ? handleUnlike : handleLike}>
        <FlexContainer alignCenter>
          <Text variant='meta2' fontWeight={700} color={theme.text.light}>
            {likeCount}
          </Text>
          {liked ? <HeartFilledIcon /> : <HeartOutlinedIcon />}
        </FlexContainer>
      </HeartButton>
    </>
  )
}

interface IHeartOutlinedIconProps {
  variant?: ILikeProps['variant']
}

const HeartOutlinedIcon = styled(FavoriteBorderIcon)<IHeartOutlinedIconProps>`
  width: 20px !important;
  fill: ${(props) => props.theme.brand[500]} !important;
  margin-left: 0.3rem;

  /* variant */
  margin-left: ${(props) => props.variant === 'event-detail' && 'unset'};
`

interface IHeartFilledIconProps {
  variant?: ILikeProps['variant']
}

const HeartFilledIcon = styled(FavoriteIcon)<IHeartFilledIconProps>`
  width: 20px !important;
  fill: ${(props) => props.theme.brand[500]} !important;
  margin-left: 0.3rem;

  /* variant */
  margin-left: ${(props) => props.variant === 'event-detail' && 'unset'};
  fill: ${(props) => props.variant === 'event-detail' && props.theme.brand[900]} !important;
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
