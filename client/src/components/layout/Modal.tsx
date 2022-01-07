import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { FlexContainer, Text, theme } from 'cornell-glue-ui'
import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import { hexToRGBA } from 'src/util/colors'
import styled from 'styled-components'

export interface IModalProps {
  isOpen: boolean
  onRequestClose: () => void
  children: React.ReactNode
  heading?: string
  onAfterOpen?: () => void
  isShowHeader?: boolean
}

const Modal = ({
  isOpen,
  onRequestClose,
  children,
  heading,
  onAfterOpen,
  isShowHeader = true,
}: IModalProps) => {
  useEffect(() => {
    ReactModal.setAppElement('#root')
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      style={customStyles}
      ariaHideApp={false}>
      {isShowHeader && (
        <TopRow justifySpaceBetween alignCenter heading={heading}>
          <Text variant='h4'>{heading}</Text>
          <StyledCloseButton size='small' onClick={onRequestClose}>
            <CloseIcon fontSize='inherit' />
          </StyledCloseButton>
        </TopRow>
      )}
      <ContentContainer>{children}</ContentContainer>
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
    borderRadius: '8px',
  },
  overlay: {
    background: hexToRGBA('#000000', 0.3),
    zIndex: 9999,
  },
}

interface TopRowProps {
  heading?: string
}

const TopRow = styled(FlexContainer)<TopRowProps>`
  padding: 0.5rem 0.6rem 0.5rem 0.5rem;

  // heading
  border-bottom: ${(props) => props?.heading && `1px solid ${props.theme.border.default}`};

  & > *:first-child {
    margin-right: 1rem;
  }
`

const ContentContainer = styled.div`
  min-width: 250px;
  max-width: 700px;
`

const StyledCloseButton = styled(IconButton)`
  font-size: 1.2rem !important;
`

export default Modal
