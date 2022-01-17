import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Link to='/'>
      <LogoText>RSVP</LogoText>
    </Link>
  )
}

const LogoText = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.brand[500]};
  font-weight: 700;
`

export default Logo
