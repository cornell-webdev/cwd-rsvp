import { Text, theme } from 'cornell-glue-ui'
import React from 'react'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import InfoIcon from '@mui/icons-material/Info'

interface PageContainerProps {
  children: React.ReactNode
  height?: string
  isMobileOnly?: boolean
  isShowWarning?: boolean
  isNoPadding?: boolean
}

const PageContainer = ({
  children,
  height,
  isMobileOnly,
  isShowWarning = true,
  isNoPadding,
}: PageContainerProps) => {
  const isMobile = useIsMobile()

  return (
    <Container height={height}>
      <InnerContainer isMobileOnly={isMobileOnly} isNoPadding={isNoPadding}>
        {/* {isMobileOnly && !isMobile && isShowWarning && (
          <WarningContainer>
            <StyledInfoIcon />
            <Text variant='meta1' color={theme.warning[600]}>
              The desktop version of this page is currently under development
            </Text>
          </WarningContainer>
        )} */}
        {children}
      </InnerContainer>
    </Container>
  )
}

interface ContainerProps {
  height?: PageContainerProps['height']
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  // height
  height: ${(props) => props.height && props.height};
`

interface InnerContainerProps {
  isMobileOnly?: PageContainerProps['isMobileOnly']
  isNoPadding?: PageContainerProps['isNoPadding']
}

const InnerContainer = styled.div<InnerContainerProps>`
  width: 100%;
  padding: 0.75rem;

  /* isNoPadding */
  padding: ${(props) => props.isNoPadding && '0'};

  @media (min-width: ${(props) => props.theme.tablet}) {
    /* isMobileOnly */
    width: ${(props) => !props.isMobileOnly && props.theme.tablet};
  }

  @media (min-width: ${(props) => props.theme.small}) {
    /* isMobileOnly */
    width: ${(props) => props.isMobileOnly && props.theme.small};
  }
`

const WarningContainer = styled.div`
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 1rem 0 2rem 0;
  background: ${(props) => props.theme.warning[50]};
  display: flex;
  align-items: center;
`

const StyledInfoIcon = styled(InfoIcon)`
  fill: ${(props) => props.theme.warning[600]} !important;
  margin-right: 0.5rem;
`

export default PageContainer
