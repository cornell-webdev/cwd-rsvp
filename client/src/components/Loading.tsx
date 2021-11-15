import styled from 'styled-components'

interface LoadingProps {
  isHidden?: boolean
}

const Loading = styled.div<LoadingProps>`
  border-top: 3px solid ${(props) => props.theme.border.dark};
  border-right: 3px solid ${(props) => props.theme.border.dark};
  border-bottom: 3px solid ${(props) => props.theme.border.dark};
  border-left: 3px solid ${(props) => props.theme.brand[500]};

  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  border-radius: 50%;
  height: 1rem;
  width: 1rem;

  &:after {
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  // isHidden
  opacity: ${(props) => props.isHidden && 0};

`

export default Loading
