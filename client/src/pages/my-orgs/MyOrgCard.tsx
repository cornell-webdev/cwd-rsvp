import React from 'react'
import { IOrg } from 'src/types/org.type'
import styled from 'styled-components'

interface IMyOrgCardProps {
  org: IOrg
}

const MyOrgCard = ({ org }: IMyOrgCardProps) => {
  return <Container>{org.name}</Container>
}

const Container = styled.div``

export default MyOrgCard
