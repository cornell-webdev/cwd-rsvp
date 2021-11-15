import React, { useState } from 'react'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import styled from 'styled-components'
import Text from '../fonts/Text'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'

const Container = styled.div`
  margin-bottom: 1rem;
`

interface ExpandableSectionProps {
  heading: string
  children: React.ReactNode
  expandedDefault?: boolean
}

const ExpandableSection = ({ heading, expandedDefault, children }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(expandedDefault || false)

  return (
    <Container>
      <FlexRow
        alignCenter
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        {isExpanded
          ? (
            <IconButton size='small'>
              <ExpandLessIcon />
            </IconButton>
            )
          : (
            <IconButton size='small'>
              <ExpandMoreIcon />
            </IconButton>
            )
        }
        <Space margin='0 .2rem' />
        <Text
          variant='p'
          fontWeight={500}
        >{heading}
        </Text>
      </FlexRow>
      {isExpanded && children}
    </Container>
  )
}

export default ExpandableSection
