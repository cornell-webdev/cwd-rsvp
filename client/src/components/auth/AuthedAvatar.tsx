import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import Menu from '../Menu'
import useRouter from 'src/hooks/useRouter'

interface AuthedProps {
  userPhotoSrc: string
}

const AuthedAvatar = ({ userPhotoSrc }: AuthedProps) => {
  const router = useRouter()
  const menuOptions = [
    {
      label: 'Logout',
      onClick: () => router.push('/logout'),
    },
  ]
  return (
    <Menu options={menuOptions} offset={10}>
      <Container>
        <Avatar src={userPhotoSrc} />
        <Space margin='0 .1rem' />
        <ExpandMoreIcon />
      </Container>
    </Menu>
  )
}

const Container = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
`

export default AuthedAvatar
