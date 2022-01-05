import React from 'react'
import { IUser } from 'src/types/user.type'
import styled from 'styled-components'

interface ILinkedUserItemProps {
  user: IUser
}

const LinkedUserItem = ({ user }: ILinkedUserItemProps) => {
  return <Container>{user?.email}</Container>
}

const Container = styled.div``

export default LinkedUserItem
