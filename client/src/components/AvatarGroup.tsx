import React from 'react'
import styled from 'styled-components'

interface IAvatarGroupProps {
  avatarUrls: string[]
}

const AvatarGroup = ({ avatarUrls }: IAvatarGroupProps) => {
  if (avatarUrls?.length === 0) return null

  return (
    <Container>
      <ImgContainer>
        {avatarUrls?.slice(0, 3)?.map((url) => (
          <Img key={url} src={url} />
        ))}
      </ImgContainer>
    </Container>
  )
}

const Container = styled.div``

const ImgContainer = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: -0.5rem;
  }
`

const Img = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`

export default AvatarGroup
