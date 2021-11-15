import React from 'react'
import styled from 'styled-components'

interface TextProps extends CoreTextProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p'
  children: React.ReactNode
  style?: any
  maxLines?: number
}

const Text = ({ variant, children, ...rest }: TextProps) => {
  switch (variant) {
    case 'h1':
      return <H1 {...rest}>{children}</H1>
    case 'h2':
      return <H2 {...rest}>{children}</H2>
    case 'h3':
      return <H3 {...rest}>{children}</H3>
    case 'h4':
      return <H4 {...rest}>{children}</H4>
    case 'h5':
      return <H5 {...rest}>{children}</H5>
    case 'h6':
      return <H6 {...rest}>{children}</H6>
    case 'h7':
      return <H7 {...rest}>{children}</H7>
    case 'p':
      return <P {...rest}>{children}</P>
  }
}

export interface CoreTextProps {
  ellipsis?: boolean
  nowrap?: boolean
  color?: string
  fontWeight?: number
  maxWidth?: number
  margin?: string
  uppercase?: boolean
  maxLines?: number
}

const CoreText = styled.p<CoreTextProps>`
  color: ${(props) => props.theme.text.default};
  white-space: pre-line;
  word-break: break-word;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;

  // ellipsis
  text-overflow: ${(props) => (props.ellipsis ? 'ellipsis' : '')};
  overflow: ${(props) => (props.ellipsis ? 'hidden' : '')};
  white-space: ${(props) => (props.ellipsis ? 'nowrap' : '')};

  // nowrap
  white-space: ${(props) => (props.nowrap ? 'nowrap' : '')};

  // color
  color: ${(props) => props.color && props.color};

  // fontWeight
  font-weight: ${(props) =>
    props.fontWeight && `${props.fontWeight} !important`};

  // maxWidth
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '')};

  // margin
  margin: ${(props) => (props.margin ? props.margin : '')};

  // uppercase
  text-transform: ${(props) => props.uppercase && 'uppercase'};

  // maxLines
  overflow: ${(props) => props.maxLines && 'hidden'};
  text-overflow: ${(props) => props.maxLines && 'ellipsis'};
  display: ${(props) => props.maxLines && '-webkit-box'};
  -webkit-line-clamp: ${(props) => props.maxLines && props.maxLines};
  -webkit-box-orient: ${(props) => props.maxLines && 'vertical'};
`

export const H1 = styled(CoreText)`
  font-size: 42px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.tablet}) {
    font-size: 48px;
  }
`

export const H2 = styled(CoreText)`
  font-size: 30px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.tablet}) {
    font-size: 36px;
  }
`

export const H3 = styled(CoreText)`
  font-size: 20px;
  font-weight: 500;
`

export const H4 = styled(CoreText)`
  font-size: 18px;
  font-weight: 500;
`

export const P = styled(CoreText)`
  font-size: 16px;
`

export const H5 = styled(CoreText)`
  font-size: 14px;
`

export const H6 = styled(CoreText)`
  font-size: 12px;
`

export const H7 = styled(CoreText)`
  font-size: 11px;
`

export default Text
