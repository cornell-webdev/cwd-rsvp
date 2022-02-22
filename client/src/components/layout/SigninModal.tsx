import React from 'react'
import useRouter from 'src/hooks/useRouter'
import ConfirmationModal from './ConfirmationModal'

interface ISigninModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const SigninModal = ({ isOpen, onRequestClose }: ISigninModalProps) => {
  const router = useRouter()

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onConfirm={() => router.push('/login')}
      heading='Sign in'
      body='Sign in to access this feature.'
      confirmationText='Sign in'
    />
  )
}

export default SigninModal
