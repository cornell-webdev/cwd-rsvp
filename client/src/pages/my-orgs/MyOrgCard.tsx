import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { IOrg } from 'src/types/org.type'
import styled from 'styled-components'
import GroupIcon from '@material-ui/icons/Group'
import { Link } from 'react-router-dom'
import { ReactComponent as FallbackAvatarIllust } from 'src/assets/svgs/org-fallback.svg'

interface IMyOrgCardProps {
  org: IOrg
}

const MyOrgCard = ({ org }: IMyOrgCardProps) => {
  return (
    <Container>
      <FlexContainer>
        {org?.avatar ? (
          <Avatar src={org?.avatar} />
        ) : (
          <FallbackContainer>
            <FallbackAvatar />
          </FallbackContainer>
        )}
        <Spacer x={0.5} />
        <RightSection>
          <Text variant='meta2'>{org?.linkedUserIds?.length} administrators</Text>
          <Text variant='meta1' fontWeight={700}>
            {org?.name}
          </Text>
          <Spacer y={1} />
          <FlexContainer>
            <Link to={`/profile/org-admins/${org?._id}`}>
              <Button startIcon={<GroupIcon />}>Manage</Button>
            </Link>
            <Spacer x={0.5} />
            <Link to={`/edit-org/${org?._id}`}>
              <Button color={theme.text.default} background={theme.grey[100]}>
                Edit profile
              </Button>
            </Link>
          </FlexContainer>
          <Spacer y={0.875} />
          <TextContainer>
            <Text variant='meta1' maxLines={2}>
              {org?.desc}
            </Text>
          </TextContainer>
        </RightSection>
      </FlexContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 0.33rem;
  padding-bottom: 0.33rem;
  margin-top: 0.5rem;
`

const FallbackContainer = styled.div`
  height: 87px;
  width: 87px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.border.default};
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  background: ${(props) => props.theme.brand[100]};
`

const FallbackAvatar = styled(FallbackAvatarIllust)`
  height: 100%;
  width: 100%;
`

const Avatar = styled.img`
  height: 87px;
  width: 87px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.border.default};
  flex-shrink: 0;
  flex-grow: 0;
  object-fit: cover;
`

const RightSection = styled.div`
  flex-shrink: 99;
`

const TextContainer = styled.div`
  max-width: 80%;
`

export default MyOrgCard
