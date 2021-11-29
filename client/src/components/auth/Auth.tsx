import { Button, theme } from 'cornell-glue-ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCurrentUser } from 'src/api/user'
import { IRootState } from 'src/types/redux.type'
import styled from 'styled-components'
import AuthedAvatar from './AuthedAvatar'

const Auth = () => {
  const { accessToken } = useSelector((state: IRootState) => state.authState)
  const { currentUser } = useCurrentUser()
  const userPhotoSrc = currentUser?.providerData?.photos[0]?.value

  if (accessToken && userPhotoSrc) {
    return <AuthedAvatar userPhotoSrc={userPhotoSrc} />
  }

  return (
    <Link to='/login'>
      <StyledButton
        variant='text'
        color={theme.text.default}
        defaultBackground={theme.grey[100]}
        background={theme.grey[200]}>
        Sign in
      </StyledButton>
      {/* <img srcSet={`${googleSignin} 2x`} /> */}
    </Link>
  )
}

const StyledButton = styled(Button)``

export default Auth
