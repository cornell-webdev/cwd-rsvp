import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import React from 'react'
import styled from 'styled-components'
import OutsideClickListener from '../util/OutsideClickListener'

export interface IOption {
  label: string
  onClick: () => void
}

type TPopperProps = React.ComponentProps<typeof Popper>

interface MenuProps {
  options: IOption[]
  children: React.ReactNode
  offset?: number
  placement?: TPopperProps['placement']
}

const Menu = ({ options, children, offset, placement }: MenuProps) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen((prevOpen) => !prevOpen)
  }

  const handleOutsideClick = (event: Event) => {
    event.stopPropagation()
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Anchor ref={anchorRef} onClick={handleToggle}>
        {children}
      </Anchor>
      <StyledPopper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        modifiers={{
          offset: {
            enabled: true,
            offset: `0, ${offset || 0}`,
          },
        }}
        placement={placement}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: ['bottom', 'bottom-start', 'bottom-end'].includes(placement)
                ? 'center top'
                : 'center bottom',
            }}>
            <Paper>
              <OutsideClickListener onOutsideClick={handleOutsideClick} isListening>
                <MenuList>
                  {options.map((option) => (
                    <MenuItem
                      key={option.label}
                      onClick={(event) => {
                        event.stopPropagation()
                        option.onClick()
                        handleClose()
                      }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </OutsideClickListener>
            </Paper>
          </Grow>
        )}
      </StyledPopper>
    </>
  )
}

const Anchor = styled.div`
  display: inline-block;
`

const StyledPopper = styled(Popper)`
  z-index: 99;
`

export default Menu
