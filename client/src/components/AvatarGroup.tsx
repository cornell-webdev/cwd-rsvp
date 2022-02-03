import React from 'react'
import styled from 'styled-components'

interface IAvatarGroupProps {
  avatarUrls: string[]
  spoofCount?: number
  spoofOffset?: number // stable but random offset
}

const AvatarGroup = ({ avatarUrls, spoofCount = 0, spoofOffset = 0 }: IAvatarGroupProps) => {
  const chars = [
    'G',
    'A',
    'E',
    'Y',
    'M',
    'D',
    'F',
    'J',
    'H',
    'I',
    'C',
    'Q',
    'L',
    'O',
    'B',
    'N',
    'Z',
    'K',
    'S',
    'P',
    'T',
    'U',
    'W',
    'X',
    'R',
    'V',
  ]
  const hexesCore = ['#1C3F6E', '#40916c', '#f27059', '#4D189D', '#778da9', '#493548']
  const hexes = [...hexesCore, ...hexesCore, ...hexesCore, ...hexesCore]

  if (avatarUrls?.length === 0 && spoofCount === 0) return null

  return (
    <Container>
      <ImgContainer>
        {avatarUrls?.slice(0, 3)?.map((url) => (
          <Img key={url} src={url} />
        ))}
        {[...Array(spoofCount)]?.map((_, i) => (
          <SpoofedAvatar key={i} background={hexes[i + spoofOffset]}>
            <AvatarText>{chars[i + spoofOffset]}</AvatarText>
          </SpoofedAvatar>
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
  border: 2px solid ${(props) => props.theme.background.default};
`

export interface ISpoofedAvatarProps {
  background: string
}

const SpoofedAvatar = styled.div<ISpoofedAvatarProps>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.background.default};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;

  /* background */
  background: ${(props) => props.background && props.background};
`

const AvatarText = styled.p`
  font-weight: 400;
  font-size: 11px;
  line-height: 1;
  text-align: center;
  margin-left: 1.3px;
`

export default AvatarGroup
