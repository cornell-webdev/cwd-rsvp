import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import styled from 'styled-components'
import Modal, { IModalProps } from './Modal'

interface IConfirmationModalProps extends Omit<IModalProps, 'children'> {
  onConfirm: () => void
  heading: string
  confirmationText?: string
  body?: string
}

const ConfirmationModal = ({
  onConfirm,
  heading,
  confirmationText = 'Confirm',
  body,
  onRequestClose,
  ...rest
}: IConfirmationModalProps) => {
  return (
    <Modal {...rest} onRequestClose={onRequestClose} isShowHeader={false}>
      <Container>
        <FlexContainer flexDirection='column' alignCenter>
          <Text fontWeight={700}>{heading}</Text>
          <Spacer y={1} />
          {body && <BodyText>{body}</BodyText>}
          <ButtonsRow>
            <Button onClick={onConfirm}>{confirmationText}</Button>
            <Spacer x={3} />
            <Button
              color={theme.text.default}
              background={theme.grey[100]}
              onClick={onRequestClose}>
              Cancel
            </Button>
          </ButtonsRow>
        </FlexContainer>
      </Container>
    </Modal>
  )
}

const Container = styled.div`
  padding: 1rem 1rem 0 1rem;
  max-width: 370px;
`

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`

const BodyText = styled(Text)`
  text-align: center;
`

export default ConfirmationModal
