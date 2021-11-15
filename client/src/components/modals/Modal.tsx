import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import theme from 'src/app/theme'
import { hexToRGBA } from 'src/util/colors'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  children: React.ReactNode
  heading?: string
  onAfterOpen?: () => void
  isShowHeader?: boolean
}

const Modal = (props: ModalProps) => {
  useEffect(() => {
    ReactModal.setAppElement('#root')
  }, [])

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [props.isOpen])

  if (!props.isOpen) return null

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      onAfterOpen={props.onAfterOpen}
      style={customStyles}
      ariaHideApp={false}
    >
      <TopRow
        justifySpaceBetween
        alignCenter
        heading={props.heading}
      >
        <Text variant='h4'>{props.heading}</Text>
        <StyledCloseButton
          size='small'
          onClick={props.onRequestClose}
        >
          <CloseIcon fontSize='inherit' />
        </StyledCloseButton>
      </TopRow>
      <ContentContainer>
        {props.children}
      </ContentContainer>
    </ReactModal>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: `1px solid ${theme.border.default}`,
    maxWidth: '95vw',
  },
  overlay: {
    background: hexToRGBA('#000000', 0.3),
    zIndex: 9999,
  },
}

interface TopRowProps {
  heading?: string
}

const TopRow = styled(FlexRow)<TopRowProps>`
  padding: .5rem .6rem .5rem .5rem;

  // heading
  border-bottom: ${props => props?.heading && `1px solid ${props.theme.border.default}`};

  & > *:first-child {
    margin-right: 1rem;
  }
`

const ContentContainer = styled.div`
  padding: 1rem;
  min-width: 250px;
  max-width: 700px;
`

const StyledCloseButton = styled(IconButton)`
  font-size: 1.2rem !important;
`

export default Modal
