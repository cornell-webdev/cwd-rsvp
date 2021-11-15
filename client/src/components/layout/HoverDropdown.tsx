import React from 'react'
import styled from 'styled-components'
import Space from './Space'

const TriggerContainer = styled.div`
  cursor: pointer;
`

const HoverDropdownContainer = styled.div`
`

const DropdownWrapper = styled.div`
  position: relative;
  display: none;

  ${HoverDropdownContainer}:hover & {
    display: block;
  }
`

const DropdownContainer = styled.div`
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background: white;
  position: absolute;
  top: 0;
  left: 0;
`

interface HoverDropdownProps {
  triggerComponent: React.ReactNode
  children: React.ReactNode
}

const HoverDropdown = (props: HoverDropdownProps) => {
  return (
    <HoverDropdownContainer>
      <TriggerContainer>
        {props.triggerComponent}
      </TriggerContainer>
      <Space margin='.5rem 0' />
      <DropdownWrapper>
        <DropdownContainer>
          {props.children}
        </DropdownContainer>
      </DropdownWrapper>
    </HoverDropdownContainer>
  )
}

export default HoverDropdown
