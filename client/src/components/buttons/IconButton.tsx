import { IconButton as MuiIconButton } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  buttonSize?: 'small'
  fill?: string
}

const IconButton = ({ icon, buttonSize = 'small', fill, ...rest }: IconButtonProps) => {
  return (
    <StyledIconButton {...rest} size={buttonSize} color='inherit' fill={fill}>
      {icon}
    </StyledIconButton>
  )
}

interface StyledIconButtonProps {
  fill?: string
}

const StyledIconButton = styled(MuiIconButton)<StyledIconButtonProps>`
  background: ${(props) => props.theme.grey[100]} !important;

  & svg {
    fill: ${(props) => props.theme.grey[700]} !important;

    // fill
    fill: ${(props) => props.fill && `${props.fill} !important`};
  }
`

export default IconButton
