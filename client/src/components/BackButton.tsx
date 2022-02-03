import { Button, theme } from 'cornell-glue-ui'
import React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import useRouter from 'src/hooks/useRouter'

export interface IBackButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const BackButton = ({ onClick }: IBackButtonProps) => {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event)
    } else {
      router.history.goBack()
    }
  }

  return (
    <Button
      variant='text'
      startIcon={<ChevronLeftIcon />}
      color={theme.text.default}
      background={theme.grey[100]}
      hoverBackground={theme.grey[200]}
      onClick={handleClick}>
      Back
    </Button>
  )
}

export default BackButton
