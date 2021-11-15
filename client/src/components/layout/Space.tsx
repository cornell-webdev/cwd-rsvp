import styled from 'styled-components'

interface SpaceProps {
  margin?: string
  padding?: string
}

const Space = styled.div<SpaceProps>`
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
`

export default Space
