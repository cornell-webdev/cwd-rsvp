import { Button, theme } from 'cornell-glue-ui'
import React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

export interface IBackButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const BackButton = ({ onClick }: IBackButtonProps) => {
  return (
    <Button
      variant='text'
      startIcon={<ChevronLeftIcon />}
      color={theme.text.default}
      background={theme.grey[100]}
      hoverBackground={theme.grey[200]}
      onClick={onClick}>
      Back
    </Button>
  )
}

export default BackButton
