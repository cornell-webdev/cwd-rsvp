import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { FlexContainer } from 'cornell-glue-ui'

import { IEvent } from 'src/types/event.type'

// interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
//   name: string
//   avatarColor?: string
// }

interface LikeProps {
  event: IEvent, 
}

const LikeButton:React.FC<LikeProps> = ({event}) => {
  const [likeCount, setLikeCount] = useState(event.views)
  const [liked, setLiked] = useState(false)

  if (!liked) {
    return (
      <HeartContainer alignCenter={true}>
        {likeCount}
        <HeartButton onClick={()=> {setLikeCount(likeCount + 1); setLiked(true)}}>
          <HeartOutlined/>
        </HeartButton>
      </HeartContainer>
    )
  } else {
    return (
    <HeartContainer alignCenter={true}>
      {likeCount}
      <HeartButton onClick={()=> {setLikeCount(likeCount - 1); setLiked(false)}}>
        <HeartFilled/>
      </HeartButton>
    </HeartContainer>
    )
  }
}

const HeartContainer = styled(FlexContainer)`
  font-size:12px;
  font-weight: medium;
  text-align: right;
  float:right;
`
const HeartButton = styled.button`
  float: right;
  width:15px;
  height:13.76px;
  color:#D05F5F;
  margin-left:4px;
  padding: 1px;
  background: transparent;
  cursor: pointer;
`

export default LikeButton
