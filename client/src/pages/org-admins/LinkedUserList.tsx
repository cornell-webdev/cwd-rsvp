import React from 'react'
import { useOrgLinkedUsers } from 'src/api/org'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import LinkedUserItem from './LinkedUserItem'

const LinkedUserList = () => {
  const router = useRouter()
  const { orgLinkedUsers } = useOrgLinkedUsers(router.match.params.orgId)

  return (
    <Container>
      {orgLinkedUsers?.linkedUsers?.map((user) => (
        <LinkedUserItem key={user?._id} user={user} />
      ))}
    </Container>
  )
}

const Container = styled.div``

export default LinkedUserList
