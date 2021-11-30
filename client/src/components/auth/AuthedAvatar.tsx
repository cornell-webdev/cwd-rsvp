import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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
      label: 'Logout',
      onClick: () => router.push('/logout'),
    },
  ]
  return (
    <Menu options={menuOptions} offset={10}>
      <Container>
        <Avatar src={userPhotoSrc} />
        <Spacer x='.1rem' />
        <ExpandMoreIcon />
      </Container>
    </Menu>
  )
}

const Container = styled(FlexContainer)`
  align-items: center;
  cursor: pointer;
`

export default AuthedAvatar
