import React from 'react'
import Text from '../fonts/Text'
import styled from 'styled-components'
import OutsideClickListener from '../util/OutsideClickListener'
import { FlexRow } from '../layout/Flex'
import useNavs from 'src/hooks/useNavs'
import { Link } from 'react-router-dom'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

interface SlideInMenuProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

const SlideInMenu = ({ isOpen, setIsOpen }: SlideInMenuProps) => {
  const navs = useNavs()

  return (
    <OutsideClickListener onOutsideClick={() => setIsOpen(false)} isListening={true}>
      <Container isOpen={isOpen}>
        <TopRow justifySpaceBetween>
          <div />
          <Tooltip title='Close'>
            <IconButton onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          </Tooltip>
        </TopRow>
        <List>
          {navs.map((nav) => (
            <div key={nav.path}>
              <Link to={nav.path} onClick={() => setIsOpen(false)}>
                <Text variant='h4' fontWeight={500}>
                  {nav.label}
                </Text>
              </Link>
            </div>
          ))}
        </List>
      </Container>
    </OutsideClickListener>
  )
}

interface ContainerProps {
  isOpen: boolean
}

const Container = styled.div<ContainerProps>`
  width: 240px;
  right: -250px;
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 100;
  background: white;
  box-shadow: ${(props) => props.theme.shadow};
  transition: 0.3s ease-in-out;

  // isOpen
  transform: ${(props) => props.isOpen && 'translate3d(-250px, 0, 0)'};
`

const TopRow = styled(FlexRow)`
  padding: 1rem;
`

const List = styled.div`
  padding: 0 2rem;

  & > * {
    margin-bottom: 1rem;
  }
`

export default SlideInMenu
