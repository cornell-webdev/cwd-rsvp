import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Menu from '../layout/Menu'
import useRouter from 'src/hooks/useRouter'
import { FlexContainer, Spacer } from 'cornell-glue-ui'

interface AuthedProps {
  userPhotoSrc: string
}

const AuthedAvatar = ({ userPhotoSrc }: AuthedProps) => {
  const router = useRouter()
  const menuOptions = [
    {
      label: 'My likes',
      onClick: () => router.push('/my-likes'),
    },
    {
      label: 'My events',
      onClick: () => router.push('/profile/my-events'),
    },
    {
      label: 'My orgs',
      onClick: () => router.push('/profile/my-orgs'),
    },
    {
      label: 'My tickets',
      onClick: () => router.push('/profile/my-tickets'),
    },
    {
      label: 'Logout',
      onClick: () => router.push('/logout'),
    },
  ]

  return (
    <MenuStyleContainer>
      <Menu options={menuOptions} offset={10} placement='bottom-end'>
        <Container>
          <Avatar src={userPhotoSrc} />
          <Spacer x={0.05} />
          <ExpandMoreIcon />
        </Container>
      </Menu>
    </MenuStyleContainer>
  )
}

const Container = styled(FlexContainer)`
  align-items: center;
  cursor: pointer;
`

const MenuStyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .MuiMenuItem-root {
    min-height: 30px;
  }
`

export default AuthedAvatar
