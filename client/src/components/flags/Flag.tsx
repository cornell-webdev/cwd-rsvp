import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

type ISize = 'small'

interface FlagProps {
  label: string
  color: string
  background: string
  borderColor?: string
  size?: ISize
  onClick?: React.MouseEventHandler
}

const Flag = ({
  size,
  label,
  color,
  background,
  onClick,
  borderColor,
}: FlagProps) => {
  return (
    <Container
      background={background}
      onClick={onClick}
      borderColor={borderColor}
      size={size}>
      <Tag
        variant={size === 'small' ? 'caption' : 'body2'}
        overridecolor={color}
        noWrap>
        {label}
      </Tag>
    </Container>
  )
}

interface ContainerProps {
  background: string
  size?: ISize
  borderColor?: string
}

const Container = styled.div<ContainerProps>`
  padding: 0.2rem 0.7rem;
  border-radius: 12px;
  display: inline-block;
  border: 2px solid transparent;

  // background
  background-color: ${(props) => props.background && props.background};

  // size
  padding: ${(props) => props.size === 'small' && '.1rem .4rem'};

  // onClick
  cursor: ${(props) => props.onClick && 'pointer'};

  // borderColor
  border-color: ${(props) => props.borderColor && props.borderColor};
`

interface TagProps {
  overridecolor: string
}

const Tag = styled(Typography)<TagProps>`
  // overridecolor
  color: ${(props) =>
    props.overridecolor && `${props.overridecolor} !important`};
`

export default Flag
