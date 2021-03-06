import { Button, FlexContainer, Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { useOrgAddLinkedUser } from 'src/api/org'
import { useCurrentUser } from 'src/api/user'
import { ReactComponent as FallbackAvatarIllust } from 'src/assets/svgs/org-fallback.svg'
import { IOrg } from 'src/types/org.type'
import styled from 'styled-components'

interface IClaimOrgCardProps {
  org: IOrg
}

const ClaimOrgCard = ({ org }: IClaimOrgCardProps) => {
  const { addLinkedUserAsync } = useOrgAddLinkedUser(org._id)
  const { currentUser } = useCurrentUser()

  const addLinkedUser = async () => {
    let email
    if (currentUser !== undefined && currentUser !== null) {
      email = currentUser.email
    }
    await addLinkedUserAsync({
      email: email,
    })
  }

  return (
    <Container>
      <FlexContainer alignCenter fullWidth justifySpaceBetween>
        <FlexContainer alignCenter>
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
          </RightSection>
        </FlexContainer>
        <Link to={`/profile/my-orgs`}>
          <Button size='small' onClick={() => addLinkedUser()}>
            Claim
          </Button>
        </Link>
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
  height: 55px;
  width: 55px;
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

const ClaimButton = styled(Button)`
  height: 28px;
  width: 57px;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
  float: right;
`

const Avatar = styled.img`
  height: 55px;
  width: 55px;
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
  width: 90%;
`

export default ClaimOrgCard
