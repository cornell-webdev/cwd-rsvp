import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, theme } from 'cornell-glue-ui'
import React from 'react'
import useRouter from 'src/hooks/useRouter'

const BackButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.history.goBack()
  }

  return (
    <Button
      variant='text'
      size='small'
      startIcon={<ChevronLeftIcon />}
      color={theme.text.default}
      background={theme.grey[100]}
      hoverBackground={theme.grey[200]}
      onClick={handleGoBack}>
      Back
    </Button>
  )
}

export default BackButton
