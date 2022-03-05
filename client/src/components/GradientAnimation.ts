import { keyframes } from 'styled-components'

const GradientAnimation = keyframes`
  0% {
    background-position: 0% center;
  }

  50% {
    background-position: 70% center;
  }

  100% {
    background-position: 0% center;
  }
`

export default GradientAnimation
