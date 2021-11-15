import React from 'react'
import styled from 'styled-components'

interface DropdownProps {
  children: React.ReactNode
}

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownContainer = styled.div`
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  width: 100%;
`

const Dropdown = ({ children }: DropdownProps) => {
  return (
    <DropdownWrapper>
      <DropdownContainer>
        {children}
      </DropdownContainer>
    </DropdownWrapper>
  )
}

export default Dropdown
