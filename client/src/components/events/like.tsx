import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import { IEvent } from 'src/types/event.type'

// interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
//   name: string
//   avatarColor?: string
// }

interface LikeProps {
  event: IEvent, 
}

const LikeContainer:React.FC<LikeProps> = ({event}) => {
  const [likeCount, setLikeCount] = useState(event.views)
  const [liked, setLiked] = useState(false)

  if (!liked) {
    return (
      <div className="button-container">
        {likeCount}
        <button className='heart' style={{ backgroundColor: 'transparent', cursor: 'pointer' }} onClick={()=> {setLikeCount(likeCount + 1); setLiked(true)}}>
          <HeartOutlined style={{ color: '#D05F5F', 'cursor': 'pointer' }} />
        </button>
      </div>
    )
  } else {
    return (
    <div className="button-container">
      {likeCount}
      <button className="heart" style={{ backgroundColor: 'transparent', cursor: 'pointer' }} onClick={()=> {setLikeCount(likeCount - 1); setLiked(false)}}>
        <HeartFilled style={{ color: '#D05F5F', 'cursor': 'pointer' }} />
      </button>
    </div>
    )
  }
}


export default LikeContainer
