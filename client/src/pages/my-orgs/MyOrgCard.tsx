import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { IOrg } from 'src/types/org.type'
import styled from 'styled-components'
import GroupIcon from '@material-ui/icons/Group'
import { Link } from 'react-router-dom'

interface IMyOrgCardProps {
  org: IOrg
}

const MyOrgCard = ({ org }: IMyOrgCardProps) => {
  return (
    <Container>
      <FlexContainer>
        <Avatar src={org?.avatar} />
        <Spacer x={1} />
        <div>
          <Text variant='meta2'>{org?.linkedUserIds?.length} administrators</Text>
          <Text variant='meta1' fontWeight={700}>
            {org?.name}
          </Text>
          <Spacer y={2} />
          <FlexContainer>
            <Link to={`/profile/org-admins/${org?._id}`}>
              <Button startIcon={<GroupIcon />}>Manage</Button>
            </Link>
            <Spacer x={1} />
            <Button color={theme.text.default} background={theme.grey[100]}>
              Edit profile
            </Button>
          </FlexContainer>
          <Spacer y={1.75} />
          <Text variant='meta1' maxLines={2}>
            {org?.desc}
          </Text>
        </div>
      </FlexContainer>
    </Container>
  )
}

const Container = styled.div``

const Avatar = styled.img`
  height: 87px;
  width: 87px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.border.default};
`

export default MyOrgCard
