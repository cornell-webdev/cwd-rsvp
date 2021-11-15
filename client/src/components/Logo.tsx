import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as LogoSVG } from 'src/assets/prosys-logo.svg'
import Space from './layout/Space'

const Logo = () => {
  return (
    <Link to='/'>
      <Space padding='.2rem 0' />
      <LogoSVG />
    </Link>
  )
}

export default Logo
