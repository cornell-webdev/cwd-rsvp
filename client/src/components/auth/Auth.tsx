import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCurrentUser } from 'src/api/user'
import googleSignin from 'src/assets/services/google-signin@2x.png'
import { IRootState } from 'src/types/redux.type'
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
      <img srcSet={`${googleSignin} 2x`} />
    </Link>
  )
}

export default Auth
